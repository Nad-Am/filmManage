import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Index from '@/views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path:'/home',
      name: 'home',
      component: ()=> import('../views/HomeView.vue'),
      children:[
        {
          path:'',
          name:'ranking',
          component: ()=> import('../views/Ranking.vue')
        },
        {
          path: 'detaile',
          name: 'detaile',
          component: () => import('../views/Detaile.vue'),
        },
        {
          path:'write',
          name:'write',
          component:()=> import('../views/WriteCom.vue')
        },
        {
          path:'search',
          name:'search',
          component:()=> import('../views/Search.vue')
        }
      ]
    },
    {
      path:'/admin',
      name:'admin',
      component:()=>import ('../views/admin/Index.vue'),
      children:[
        {
          path:'',
          name:'userlist',
          component:() => import('../views/admin/UserList.vue')
        },
        {
          path:'filmlist',
          name:'filmlist',
          component:()=>import('../views/admin/FilmList.vue')
        },
        {
          path:'userlog',
          name:'userlog',
          component:()=>import('../views/admin/UserLog.vue')
        },
        {
          path:'newfilm',
          name:'newfilm',
          component:()=> import('../views/admin/NewFilm.vue')
        }
      ]
    }
    
  ],
})

export default router
