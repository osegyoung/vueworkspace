<script>
import useDateUtils from '@/utils/useDates.js';
import axios from 'axios';
// pinia 로 관리하는 store(저장소) 중 필요한 저장소를 가져옴
import { useUserStore } from '../../store/index';
// store(저장소) 중 getters 정보를 가져올 함수
import { mapState } from 'pinia';
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    // 저장소가 가지고 있는 getters 중 필요한 함수만 가져옴
    // => store(저장소) 정보를 가지고 있는 변수를 구조분해할당할 경우 반응성이 끊어짐
    ...mapState(useUserStore, ['userId']),
    // 로그인 여부를 체크하는 데이터
    isLoggedIn() {
      return this.userId != undefined;
    }
  },
  created() {
    if (this.isLoggedIn) {
      // 로그인 된 상태일때
      this.getUserInfo();
    } else {
      // 로그인이 안된 상태일때 => 로그인 폰으로 redirect
      alert('회원정보가 존재하지 않습니다.');
      this.$router.push({ name: 'loginForm' });
    }
  },
  methods: {
    async getUserInfo() {
      let result = await axios.get(`/api/myInfo`)
        .catch(err => console.log(err));
      this.userInfo = result.data;
      this.userInfo.join_date = useDateUtils.dateFormat(this.userInfo.join_date,
        'yyyy-MM-dd');
    },
    async userInfoUpdate() {
      let result = await axios.put(`/api/myInfo`, this.userInfo)
        .catch(err => console.log(err));
      let updateRes = result.data;
      if (updateRes.isUpdated) {
        alert('정상적으로 수정되었습니다.');
      } else {
        alert('수정되지 않았습니다.');
      }
    }
  }
}
</script>
<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="id">아이디:</label>
        <input type="text" class="form-control" id="id" v-model="userInfo.user_id" readonly>
      </div>
      <div class="form-group">
        <label for="pwd">비밀번호:</label>
        <input type="password" class="form-control" id="pwd" v-model="userInfo.password">
      </div>
      <div class="form-group">
        <label for="name">이름:</label>
        <input type="text" class="form-control" id="name" v-model="userInfo.user_name">
      </div>
      <div class="form-group">
        <label for="email">이메일:</label>
        <input type="email" class="form-control" id="email" v-model="userInfo.email">
      </div>
      <div class="form-group">
        <label for="joinDate">가입일자:</label>
        <input type="date" class="form-control" id="joinDate" v-model="userInfo.join_date" readonly>
      </div>
      <button type="button" class="btn btn-info" v-on:click="userInfoUpdate">저장</button>
    </form>
  </div>
</template>