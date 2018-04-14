<template>
  <ul class="app-navigation">
    <li
      class="app-navigation__item"
      v-for="item in items"
      :key="item.title"
    >
      <router-link
        class="app-navigation__link"
        :to="item.location"
      >{{ item.title }}</router-link>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'AppNavigation',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
  .app-navigation {
    display: block;
    text-align: center;
  }

  .app-navigation__item {
    display: inline-block;
    vertical-align: middle;
  }

  .app-navigation__item + .app-navigation__item::before {
    content: '|';
    padding-right: 10px;
    padding-left: 10px;
  }

  .router-link-exact-active {
    color: rgb(var(--color-active));
  }

</style>
