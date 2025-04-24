import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '@/views/MainContent.vue';
import BookList from '../views/book/BookList.vue';
import BookInfo from '../views/book/BookInfo.vue';
import BookForm from '../views/book/BookForm.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainContent
    
  },
  {
    path: '/list',
    name: 'bookList',
    component: BookList
  },
  {
    path: '/info/:bno',
    name: 'bookInfo',
    component: BookInfo
  },
  {
    path: '/form',
    name: 'bookForm',
    component: BookForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
