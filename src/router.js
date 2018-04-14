import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/calculator',
      name: 'CalculatorPage',
      component: () => import('@/views/CalculatorPage.vue'),
    },

    {
      path: '/comments',
      name: 'CommentsPage',
      component: () => import('@/views/CommentsPage.vue'),
    },
  ],
});
