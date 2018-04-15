<template>
  <ul class="app-comment-list">
    <li
      class="app-comment-list__item"
      :class="{ 'app-comment-list__item_opaque': item.isDeleting }"
      v-for="item in items"
      :key="item.id"
    >
      {{ item.id }} - {{ item.title }}
      <button
        class="app-comment-list__control"
        v-if="!item.isDeleting"
        @click="emitDelete(item.id)"
      >Удалить</button>

      <span
        class="app-comment-list__message"
        v-else
      >... deleting ...</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppCommentList',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    emitDelete(id) {
      this.$emit('delete', id);
    },
  },
};
</script>

<style>
  .app-comment-list {}

  .app-comment-list__item {}

  .app-comment-list__item_opaque {
    opacity: .3;
  }
</style>
