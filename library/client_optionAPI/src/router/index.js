import {
  createRouter,
  createWebHistory
} from 'vue-router'
import MainContent from '@/views/MainContent.vue';
import BookList from '../views/book/BookList.vue';
import BookInfo from '../views/book/BookInfo.vue';
import BookForm from '../views/book/BookForm.vue';

import LoginForm from '@/views/user/LoginForm.vue';
import MypageLayout from '@/layouts/user/MypageLayout.vue';
import MyReviewList from '@/views/user/MyReviewList.vue';
import UserUpdateForm from '@/views/user/UserUpdateForm.vue';

const routes = [{
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
  {
    path: '/loginForm',
    name: 'loginForm',
    component: LoginForm
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MypageLayout,
    // Nested Route 방식
    children: [{
        path: 'myReview',
        name: 'myReview',
        component: MyReviewList
      },
      {
        path: 'myInfo',
        name: 'myInfo',
        component: UserUpdateForm
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
