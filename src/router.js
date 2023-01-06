import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/notFoundd/NotFound.vue'
import store from './main.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/registerWork'},
    { path: '/registerWork', component: HelloWorld, meta: { requiresAuth: true } },
    { path: '/login', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      next('/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
      next('/registerWork');
  } else {
      next();
  }
});

export default router
