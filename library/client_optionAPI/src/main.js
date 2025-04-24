import { createApp } from 'vue'
// Root Vue 객체를 구성할 컴포넌트 가져옴
import App from './App.vue'

// Vue Router 
// 1) Vue.js에서 SPA을 구현할 때 사용하는 공식 라우터
// 2) 라우팅을 통해 path와 component를 연결
// 3) Vue Router에 등록된 path를 호출할 경우 해당 component를 가져와 출력

// Vue Router 정보를 가져옴
import router from './router'

import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).mount('#app')