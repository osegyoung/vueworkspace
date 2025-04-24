<!-- views/UserAdd.vue -->
<template>
  <div class="container">
    <table class="table">      
      <tr>
        <th class="text-right">No.</th>
        <td class="text-center">
          <input type="number" v-model="info.NO">
        </td>
      </tr>
      <tr>
        <th class="text-right">제목</th>
        <td class="text-center">
          <input type="title" v-model="info.TITLE">
        </td>
      </tr>
      <tr>
        <th class="text-right">작성자</th>
        <td class="text-center">
          <input type="text" v-model="info.WRITER">
        </td>
      </tr>
      <tr>
        <th class="text-right">내용</th>
        <td class="text-center">
          <input type="content" v-model="info.CONTENT">
        </td>
      </tr>
      <tr>
        <th class="text-right">작성일자</th>
        <td class="text-center">
          <input type="date" v-model="info.CREATED_DATE">
        </td>
      </tr>
    </table>
    <div>
      <button class="btn btn-info" v-on:click="boardInsert">등록</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      info: {
        NO: null,
        WRITER: null,
        CONTENT: null,
        CREATED_DATE : null,
      }
    }
  },
  computed: {
    nameOk() {
      return (this.info.name != null) && (this.info.name != '');
    }
  },
  methods : { 
    async boardInsert() {
      let ajaxRes = await axios.post(`/api/board`, this.info) 
      let sqlRes = ajaxRes.data;
      let boardNo = sqlRes.insertNo; 
      if (boardNo > 0) {
        alert('정상적으로 등록되었습니다. ');
        this.$router.push({ no: 'boardInfo', query : { no : boardNo } });
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