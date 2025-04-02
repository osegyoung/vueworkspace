<template>
  <div class="container">
    <div class="row">
      <label>이름</label>
      <input type="text" v-model="info.name">
      <div class="form-text text-danger" :class="{'warning': nameOk}">이름이 입력되지 않았습니다.</div>
      <div class="form-text text-success" :class="{'warning': !nameOk}">사용 가능한 이름입니다.</div>
    </div>
    <div class="row">
      <label>이메일</label>
      <input type="email" v-model="info.email">
    </div>
    <div class="row">
      <label>연락처</label>
      <input type="tel" v-model="info.phone">
    </div>
    <div class="row">
      <label>주소</label>
      <input type="text" v-model="info.address">
    </div>
    <div class="row">
      <button class="btn btn-info"
      v-on:click="addCustomer":disabled="!nameOk"> <!--버튼에 이벤트 처리-->
        등록
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      info: {
        name: null,
        email: null,
        phone: null,
        address : null,
      }
    }
  },
  computed: {
    nameOk() {
      return (this.info.name != null) && (this.info.name != '');
    }
  },
  methods : { //  따로 메소드를 등록해줘야 함.  목록에 등록
    async addCustomer() {
      let ajaxRes = await axios.post(`/api/customers`, this.info) // 넘기고자 하는 정보를 두번째 매개변수에 넣어주면 됨
        .catch(err => console.log(err));
      let sqlRes = ajaxRes.data;
      let custId = sqlRes.insertId; //Auto_increment 사용시
      if (custId > 0) {
        alert('정상적으로 등록되었습니다. ');
        this.$router.push({ name: 'custInfo', query : { id : custId } });
      } else{
        alert('정상적으로 등록되지 않았습니다.');
      }
    }
  }
}
</script>
<style>
.warning{
  display: none;
}
</style>