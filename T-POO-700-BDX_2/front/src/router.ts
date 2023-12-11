import ClockManager from '@/views/ClockManager.vue'
import CreateWorkingTime from '@/views/CreateWorkingTime.vue'
import NotAuthorized from '@/views/NotAuthorized.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ChartManager from './views/ChartManager.vue'
import ModifyWorkingTime from './views/ModifyWorkingTime.vue'
import SignInView from './views/SignInView.vue'
import SignUpView from './views/SignUpView.vue'
import WorkingTimesView from './views/WorkingTimesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClockManager
    },
    {
      path: '/signin',
      name: 'login',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/clock/:user_name',
      name: 'clock',
      component: ClockManager
    },
    {
      path: '/workingTimes/:userId',
      name: 'WorkingTimesIndex',
      component: WorkingTimesView
    },
    {
      path: '/workingTime/:userId',
      name: 'createWorkingTime',
      component: CreateWorkingTime
    },
    {
      path: '/workingTime/:userId/:workingTimeId',
      name: 'modifyWorkingTime',
      component: ModifyWorkingTime
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: NotAuthorized
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
    {
      path: '/chartManager/:userId',
      name: 'chartManager',
      component: ChartManager,
    }
  ]
})

export default router
