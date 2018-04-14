<template>
  <div class="app-bracket">
    <button
      class="app-bracket__item"
      @click="toggle"
    >{{ value }}</button>
  </div>
</template>

<script>
export default {
  name: 'AppBracket',

  props: {
    value: {
      type: String,
      default: '',
    },

    variants: {
      type: Array,
      default: () => ['', '(', ')'],
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
  .app-bracket {}

  .app-bracket__item {
    display: inline-block;
    vertical-align: middle;
    font-size: 2em;
    line-height: 1;
  }
</style>
