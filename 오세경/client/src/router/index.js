import { createRouter, createWebHistory } from 'vue-router'
import boardList from '@/views/boardList.vue'
import boardInfo from '@/views/boardInfo.vue'
import boardInsert from '@/views/boardInsert.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name : 'boardList'}
  },
  {
    path: '/boardList',
    name: 'boardList',
    component: boardList
    
  },
  {
    path: '/boardInfo',
    name: 'boardInfo',
    component: boardInfo
  },
  {
    path: '/boardInsert',
    name: 'boardInsert',
    component: boardInsert
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
