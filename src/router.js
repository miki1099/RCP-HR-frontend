import { createRouter, createWebHistory } from 'vue-router'
import LogWork from './components/LogWork.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/notFoundd/NotFound.vue'
import LogCustomWork from './pages/workLog/CustomWorkLog.vue'
import Calendar from './pages/calendar/Calendar.vue'
import DaysOff from './pages/daysOff/DaysOff.vue'
import UserDocuments from './pages/user/UserDocuments.vue'
import Info from './pages/info/Info.vue'
import store from './main.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/registerWork'},
    { path: '/registerWork', component: LogWork, meta: { requiresAuth: true } },
    { path: '/registerCustomWork', component: LogCustomWork, meta: { requiresAuth: true } },
    { path: '/calendar', component: Calendar, meta: { requiresAuth: true } },
    { path: '/addDaysOff', component: DaysOff, meta: { requiresAuth: true } },
    { path: '/info', component: Info, meta: { requiresAuth: true } },
    { path: '/userDocuments', component: UserDocuments, meta: { requiresAuth: true } },
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
