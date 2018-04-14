<template>
  <div class="app-fraction">
    <div
      class="app-fraction__numerator"
      :class="{ 'app-fraction__numerator_underlined' : true }"
    >
      <span
        class="app-fraction__input"
        v-if="isReadOnly"
      >{{ num }}</span>

      <input
        class="app-fraction__input"
        type="number"
        v-else
        ref="numerator"
        :value="num"
        @input="updateNumerator"
        @keydown="validateKey"
      >
    </div>

    <div class="app-fraction__denominator">
      <span
        class="app-fraction__input"
        v-if="isReadOnly"
      >{{ denom }}</span>

      <input
        class="app-fraction__input"
        type="number"
        v-else
        ref="denominator"
        :value="denom"
        @input="updateDenominator"
        @keydown="validateKey"
      >
    </div>
  </div>

</template>

<script>
export default {
  name: 'AppFraction',

  props: {
    isReadOnly: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
      default: '1/2',
    },

    validKeys: {
      type: Array,
      default: () => [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a',
        'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft',
        'Backspace', 'Delete', 'Tab',
      ],
    },
  },

  computed: {
    num() {
      return this.value.split('/')[0];
    },

    denom() {
      return this.value.split('/')[1];
    },
  },

  methods: {
    clearField(field) {
      this.$refs[field].value = 0;
    },

    emitInput(value) {
      this.$emit('input', value);
    },

    validateKey(event) {
      if (!this.validKeys.includes(event.key)) {
        event.preventDefault();
      }
    },

    updateNumerator(event) {
      const value = +event.target.value;
      if (value <= 0) {
        this.clearField('numerator');
        return;
      }

      this.emitInput(`${value}/${this.denom}`);
    },

    updateDenominator(event) {
      const value = +event.target.value;
      if (value <= 0) {
        this.clearField('denominator');
        return;
      }

      this.emitInput(`${this.num}/${value}`);
    },
  },
};
</script>

<style>
  .app-fraction {
    width: 5em;
    text-align: center;
  }

  .app-fraction__numerator {}

  .app-fraction__numerator_underlined {
    border-bottom-width: 2px;
    border-bottom-style: solid;
  }

  .app-fraction__input {
    width: 100%;
  }

</style>
