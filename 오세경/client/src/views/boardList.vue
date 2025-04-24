<!-- views/UserList.vue -->
<template>
  <div class="container">
    <table class="table">
      <caption>Total : {{ count }} </caption>
      <thead>
        <tr>
          <th>NO.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>        
      </thead>
      <tbody>
        <!-- 데이터 출력-->
         <tr v-for="boardInfo in boardList" v-bind:key="boardInfo" 
                    @click="goToDetailInfo( boardInfo.NO)">
          <td>{{ boardInfo.NO }}</td>
          <td>{{ boardInfo.TITLE }}</td>
          <td>{{ boardInfo.WRITER }}</td>
          <td>{{ dateFormat(boardInfo.CREATED_DATE,'yyyy-MM-dd') }}</td> 
         </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  data() {
    return {
      boardList : [],
    }
  },
  computed : {
    count() {
      return this.boardList.length;
    }
  },
  created() { // 객체 생성완료 시점 => 초기화 데이터 호출
    this.getboardList()
  },
  methods : {
    async getboardList(){
      let result = await axios.get('/api/board')
                              .catch(err => console.log(err));
      this.boardList = result.data;
    },
    dateFormat(value, format){ // 내가 정한 format으로 출력
      let date = (value == null) ? new Date() : new Date(value);
      let year = date.getFullYear(); // 4자리 연도를 출력한다.
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);
      let result = format.replace('yyyy',year) 
                         .replace('MM',month) 
                         .replace('dd',day);
      return result;
    },
   
    goToDetailInfo(boardNo){
      this.$router.push({name : 'boardInfo', query : {no : boardNo }});
    }
  }
}
</script>