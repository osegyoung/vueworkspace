<!-- views/UserInfo.vue -->
<template>
  <div class="container">
    <table class="table">
      <tr>
        <th class="text-right">NO</th>
        <td class="text-center">{{ boardInfo.NO }}</td>
      </tr>
      <tr>
        <th class="text-right">제목</th>
        <td class="text-center">{{ boardInfo.TITLE }}</td>
      </tr>
      <tr>
        <th class="text-right">작성자</th>
        <td class="text-center">{{ boardInfo.WRITER }}</td>
      </tr>
      <tr>
        <th class="text-right">작성일자</th>
        <td class="text-center">{{ boardInfo.CREATED_DATE }}</td>
      </tr>
      <tr>
        <th class="text-right">내용</th>
        <td class="text-center">{{ boardInfo.CONTENT }}</td>
      </tr>
      
    </table>
    <div>
      <button class="btn btn-light">목록</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  data(){
    return {
      boardInfo : {},
    }
  },
  created(){
    let selected = this.$route.query.no; 
    this.getBoardInfo(selected);
  },
  methods : {
    async getBoardInfo(boardNo){ // 단건조회
      let result = await axios.get(`/api/board/${boardNo}`).catch(err=>console.log(err)); 
      this.boardInfo = result.data; 
    }
  }
}
</script>