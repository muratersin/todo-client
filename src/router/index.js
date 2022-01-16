import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      layout: 'public',
    },
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import('@/views/AuthPage.vue'),
    meta: {
      layout: 'public',
    },
  },
  {
    path: '/actives',
    name: 'ActivesPage',
    props: {
      status: 'active',
    },
    component: () => import('@/views/TodoPage.vue'),
  },
  {
    path: '/completeds',
    name: 'CompletedsPage',
    props: {
      status: 'completed',
    },
    component: () => import('@/views/TodoPage.vue'),
  },
  {
    path: '/groups',
    name: 'GroupsPage',
    component: () => import('@/views/GroupsPage.vue'),
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: () => import('@/views/NotFoundPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.layout === 'public') {
    return next();
  }

  if (localStorage.getItem('access_token')) {
    if (to.name === 'AuthPage') {
      return next('/actives');
    }
    return next();
  }

  next({ name: 'AuthPage' });
});

export default router;
