<template>
  <span class="app-spinner">
    <svg class="app-spinner__container">
      <circle
        class="app-spinner__path"
        cx="21"
        cy="21"
        fill="none"
        r="19"
        stroke-miterlimit="10"
        stroke-width="3"
        :stroke="color"
      />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'AppSpinner',

  props: {
    color: {
      type: String,
      default: 'blue',
    },
  },
};
</script>

<style>

  .app-spinner {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }

  .app-spinner__container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    animation: rotateForever 2s linear infinite;
  }

  .app-spinner__path {
    animation: dash 1.5s ease-in-out infinite;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
  }

  @keyframes rotateForever {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 99, 200;
      stroke-dashoffset: -20px;
    }

    100% {
      stroke-dasharray: 99, 200;
      stroke-dashoffset: -125px;
    }
  }
</style>
