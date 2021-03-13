import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Configuration',
    component: () => import('../views/Configuration.vue')
  },
  {
    path: '/new_signal',
    name: 'New Signal',
    component: () => import('../views/NewSignal.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
