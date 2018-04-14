<template>
  <div class="calculator-page">
    <AppPageTitle class="calculator-page__title">
      <h1>Calculator page</h1>
    </AppPageTitle>

    <div class="calculator-page__container">
      <div class="calculator-page__controlbar">
        <button
          class="calculator-page__control"
          @click="addFractionWithOperator"
        >Add Fraction</button>

        <button
          class="calculator-page__control"
          @click="reset"
        >Reset</button>
      </div>

      <div class="calculator-page__content">
        <div class="calculator-page__condition">
          <component
            class="calculator-page__element"
            v-for="item in items"
            v-model="item.value"
            :key="item.id"
            :is="item.component"
          />
        </div>

        <div
          class="calculator-page__equal"
        >=</div>

        <div
          class="calculator-page__result"
          :class="{ 'calculator-page__result_error': hasError }"
        >
          <AppFraction
            class="calculator-page__element"
            is-read-only
            :value="resultFraction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBracket from '@/components/AppBracket.vue';
import AppFieldOperator from '@/components/AppFieldOperator.vue';
import AppFraction from '@/components/AppFraction.vue';
import AppPageTitle from '@/components/AppPageTitle.vue';
import math from '@/utils/math';

export default {
  name: 'CalculatorPage',

  components: {
    AppBracket,
    AppFieldOperator,
    AppFraction,
    AppPageTitle,
  },

  data() {
    return {
      blankBracket: {
        component: AppBracket,
        value: '',
      },

      blankFraction: {
        component: AppFraction,
        value: '1/2',
      },

      blankOperator: {
        component: AppFieldOperator,
        value: '+',
      },

      hasError: false,

      items: [],

      lastId: 0,
    };
  },

  computed: {
    expression() {
      return this.items.reduce((sum, item) => {
        const value = item.component === AppFraction
          ? `(${item.value})`
          : item.value;
        return `${sum} ${value}`;
      }, '');
    },

    resultFraction() {
      let evalResult = '1';
      this.removeWarning();

      try {
        evalResult = math.eval(this.expression);
      } catch (e) {
        this.showWarning();
      }

      const fraction = math.fraction(evalResult);
      return math.format(fraction, { fraction: 'ratio' });
    },
  },

  methods: {
    addBracket() {
      this.items.unshift({
        ...this.blankBracket,
        id: this.generateId(),
      });
    },

    addFraction() {
      this.items.unshift({
        ...this.blankFraction,
        id: this.generateId(),
      });

      this.addBracket();
    },

    addOperator() {
      this.items.unshift({
        ...this.blankOperator,
        id: this.generateId(),
      });

      this.addBracket();
    },

    addFractionWithOperator() {
      this.addOperator();
      this.addFraction();
    },

    generateId() {
      this.lastId += 1;
      return this.lastId;
    },

    removeWarning() {
      this.hasError = false;
    },

    reset() {
      this.items = [];
      this.addBracket();
      this.addFraction();
      this.addFractionWithOperator();
    },

    showWarning() {
      this.hasError = true;
    },
  },

  created() {
    this.reset();

    window.math = math;
  },
};
</script>

<style>
  .calculator-page {
    text-align: center;
  }

  .calculator-page__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .calculator-page__element {
    padding: 5px;
  }

  .calculator-page__equal {
    padding: 5px;
    font-size: 2em;
  }

  .calculator-page__condition {
    display: contents;
  }

  .calculator-page__result {}

  .calculator-page__result_error {
    color: rgba(var(--color-warning), .7);
    border-color: rgba(var(--color-warning), .7);
  }
</style>
