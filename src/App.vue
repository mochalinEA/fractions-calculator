<template>
  <div id="app" class="app">
    <header class="app__header">
      <AppNavigation
        class="app__navigation"
        :items="[
          { title: 'calculator', location: { name: 'CalculatorPage' } },
          { title: 'comments', location: { name: 'CommentsPage' } },
        ]"
      />
    </header>

    <router-view class="app__content"/>
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue';

export default {
  name: 'App',

  components: {
    AppNavigation,
  },
};
</script>

<style>
  :root {
    --color-basic: 44, 62, 80;
  }

  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: rgb(var(--color-basic));
  }
</style>
