import { createRouter, createWebHistory } from 'vue-router';
import Categories from '../views/Categories.vue';
import Login from '../views/Login.vue';
import Playing from '../views/Playing.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/playing',
      name: 'Playing',
    //   props: true,
    //   meta: {
    //     requiresAuth: true
    //   },
      component: Playing
    }
  ]
});

export default router;