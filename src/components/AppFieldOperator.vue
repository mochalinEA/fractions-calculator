<template>
  <div class="app-field-operator">
    <button
      class="app-field-operator__button"
      @click="toggle"
    >
      {{ value }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppFieldOperator',

  props: {
    value: {
      type: String,
      default: '+',
    },

    variants: {
      type: Array,
      default: () => ['+', '-', '*', '/'],
    },
  },

  methods: {
    emitInput(value) {
      this.$emit('input', value);
    },

    toggle() {
      let index = this.variants.findIndex(item => item === this.value);
      index += 1;

      if (index === this.variants.length) {
        index = 0;
      }

      this.emitInput(this.variants[index]);
    },
  },
};
</script>

<style>
  .app-field-operator {}

  .app-field-operator__button {
    font-size: 2em;
  }
</style>
