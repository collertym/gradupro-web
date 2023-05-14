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
      path: '/record',
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
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 从哪里跳转来
//   // next 放行
//   //跳转到登录页面直接放行
//   if (to.path === '/login') {
//     next();
//   } 
//   else {
//     // 获取token,看是否有token,有token放行
//     const token = window.sessionStorage.getItem("token")
//     if (!token) {
//       next('/login')
//       return;
//     } else{
//       // 放行
//       next();
//     }
    
//   }
// });

export default router
