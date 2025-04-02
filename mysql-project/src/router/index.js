import {
  createRouter,
  createWebHistory
} from 'vue-router'
import CustomerList from '@/views/CustomerList.vue'
import CustomerInfo from '@/views/CustomerInfo.vue'
import CustomerAdd from '@/views/CustomerAdd.vue'
import CustomerUpdate from '@/views/CustomerUpdate.vue'
const routes = [{ // customerList의 router이다. main.js에 있는 router에 들어가게 된다. 
    path: '/',
    redirect: {
      name: 'custList'
    }
  },
  {
    path: '/customerList',
    name: 'custList',
    component: CustomerList
  },
  {
    path: '/customerInfo',
    name: 'custInfo',
    component: CustomerInfo
  },
  {
    path: '/customerAdd',
    name: 'custAdd',
    component: CustomerAdd
  },
  {
    path: '/customerUpdate/:custId',
    name: 'custUpdate',
    component: CustomerUpdate
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router