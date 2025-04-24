import {
  defineStore
} from 'pinia'
// pinia 를 통해 관리할 store(저장소)를 정의
// : defineStore(store_id, option 객체 | setup function)
export const useUserStore = defineStore('user', {
  // state : store(저장소)를 통해 관리할 대상(데이터) => data 로 작성
  state: () => ({
    user: {}
  }),
  // getters : state 의 값을 필터링하거나 readonly 로 조회하기 위한 함수 정의 => computed 로 작성 
  getters: {
    userId: state => state.user.id,
  }, // 함수로 등록하는 형태 뒤에꺼 자체가 return이다. (화살표 함수)
  // actions : state 를 변경하기 위한 함수
  actions: {
    addLoginId(loginId) {
      this.user.id = loginId;
    },
    removeLoginId() {
      this.user = {};
    },
  },
  persist: true, // 영속성 적용
})
