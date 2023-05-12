import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadImages.vue')
    },
    {
      path: '/',
      name: 'record',
      component: () => import('../views/Record.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/Result.vue')
    },
    {
      path: '/illustration',
      name: 'illustration',
      component: () => import('../views/Illustration.vue')
    },
  ]
})

export default router
