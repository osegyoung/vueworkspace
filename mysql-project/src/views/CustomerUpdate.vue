<template> <!-- customerAdd-->
  <div class="container">
    <div class="row">
      <label>아이디</label>
      <input type="text" v-model="info.id" readonly> 
    </div>
    <div class="row">
      <label>이름</label>
      <input type="text" v-model="info.name">
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
      v-on:click="updateCustomer"> 
        수정
      </button>
    </div>
  </div>
</template>

<script> // customerAdd
import axios from 'axios';

export default {
  data() {
    return {
      info: {
        name: null,
        email: null,
        phone: null,
        address: null,
      }
    }
  },
  created() {
     //수정 1) 사용자가 선택한 대상의 원래 데이터 조회 => 단건조회
    const selectId = this.$route.params.custId;
    this.getCustomerInfo(selectId);
  },
  methods: { // customerinfo에서 가져옴.
   async getCustomerInfo(id) {// http://localhost:3000/customers/2
      let ajaxRes = await axios.get(`/api/customers/${id}`) // /api/customers/2
        .catch(err => console.log(err));

      this.info = ajaxRes.data;
    },
    async updateCustomer() { 
      // 수정 2) 사용자가 버튼을 클릭했을 때 서버에 전송 => 등록
      let updateDta = {
        name: this.info.name,
        email: this.info.email,
        phone: this.info.phone,
          address : this.info.address,
        }
        let ajaxRes = await axios.put(`/api/customers/${this.info.id}`,updateDta) // 넘기고자 하는 정보를 두번째 매개변수에 넣어주면 됨
                                 .catch(err => console.log(err));
      let sqlRes = ajaxRes.data;
      let result = sqlRes.affectedRows; // 절대 음수가 안됨. 
        if (result > 0) {
          alert('정상적으로 등록되었습니다. ');
        } else{
          alert('정상적으로 등록되지 않았습니다.');
        }
      }
  },
  }

</script>