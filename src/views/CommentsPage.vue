<template>
  <div class="comments-page">
    <AppPageTitle class="comments-page__title">
      <h1>Comments page</h1>
    </AppPageTitle>

    <div
      class="comments-page__spinner"
      v-if="isLoading"
    >
      <AppSpinner />
    </div>

    <AppCommentList
      class="comments-page"
      v-else
      :items="comments"
      @delete="deleteComment"
    />
  </div>
</template>

<script>
import AppCommentList from '@/components/AppCommentList.vue';
import AppPageTitle from '@/components/AppPageTitle.vue';
import AppSpinner from '@/components/AppSpinner.vue';

const logger = console;

export default {
  name: 'CommentsPage',

  components: {
    AppCommentList,
    AppPageTitle,
    AppSpinner,
  },

  data() {
    return {
      apiInstance: null,
      apiMaxAddititonalDelay: 2000, // milliseconds
      apiTimeout: 1000, // milliseconds
      apiUrl: 'ws://echo.websocket.org/',

      isLoading: true,

      comments: [
        { id: 0, title: 'Тестовый коммент 1', isDeleting: false },
        { id: 1, title: 'Это шедевр', isDeleting: false },
        { id: 2, title: 'Это прекрасно', isDeleting: false },
        { id: 3, title: 'Лучшее что я видел', isDeleting: false },
        { id: 4, title: 'Два чая этому автору', isDeleting: false },
        { id: 5, title: 'Или два пива', isDeleting: false },
        { id: 6, title: 'Да и вообще почему не на реакте', isDeleting: false },
        { id: 7, title: 'Доступность конечно не на высоте', isDeleting: false },
        { id: 8, title: 'Хоть не на джумле и то счастье', isDeleting: false },
        { id: 9, title: 'Всем пока, я спать', isDeleting: false },
      ],
    };
  },

  created() {
    this.initApiConnection();
  },

  methods: {
    apiActionDeleteComment(id) {
      const message = JSON.stringify({ id });

      setTimeout(() => {
        this.apiInstance.send(message);
      }, this.getDelay());
    },

    apiOnClose() {
      // do something ...
    },

    apiOnError(event) {
      logger.log('apiError:', event);
    },

    apiOnMessage(event) {
      let data = '';

      try {
        data = JSON.parse(event.data);
      } catch (e) {
        logger.log('Cant parse server response:', event);
      }

      const comment = this.comments.find(item => item.id === data.id);

      if (comment !== undefined && comment.isDeleting) {
        this.comments = this.comments.filter(item => item.id !== data.id);
      }
    },

    apiOnOpen() {
      this.isLoading = false;
    },

    preventDeleteComment(id) {
      const comment = this.comments.find(item => item.id === id);

      if (comment !== undefined) {
        comment.isDeleting = false;
      }
    },

    deleteComment(id) {
      const comment = this.comments.find(item => item.id === id);
      comment.isDeleting = true;

      setTimeout(() => {
        this.preventDeleteComment(id);
      }, this.apiTimeout);

      this.apiActionDeleteComment(id);
    },

    getDelay() {
      return Math.random() * this.apiMaxAddititonalDelay;
    },

    initApiConnection() {
      if (this.apiInstance !== null) {
        return;
      }

      this.apiInstance = new WebSocket(this.apiUrl);

      this.apiInstance.onopen = this.apiOnOpen;
      this.apiInstance.onclose = this.apiOnClose;

      this.apiInstance.onmessage = this.apiOnMessage;
      this.apiInstance.onerror = this.apiOnError;
    },
  },
};
</script>

<style>
  .comments-page {}

  .comments-page__spinner {
    text-align: center;
  }
</style>
