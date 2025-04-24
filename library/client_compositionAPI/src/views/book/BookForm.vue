<template>
    <div class="container">
<form @submit.prevent >

    <label for="no">No.</label>
    <input type="text" id="no" v-model="bookInfo.no" readonly>

    <label for="name">도서명</label>
    <input type="text" id="name"  v-model="bookInfo.name">

    <label for="writer">저자</label>
    <input type="text" id="writer" v-model="bookInfo.writer">    

    <label for="publisher">출판사</label>
    <input type="text" id="publisher" v-model="bookInfo.publisher">

    <label for="publication_date">출판일자</label>
    <input type="date" id="publication_date" v-model="bookInfo.publication_date">

    <label for="info">소개</label>
    <textarea id="info" style="height:200px" v-model="bookInfo.info"></textarea>

    <button type="button" class="btn btn-xs btn-info" @click="isUpdated? bookUpdate() : bookInsert()">저장</button>

</form>
    </div>
</template>
<script setup>
import userDateUtils from '@/utils/useDates.js';
import axios from 'axios';

import { ref,  onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
// Router를 통해 컴포넌트가 호출될 경우 라우팅 정보에 접근하기 위해 객체 반환
const route = useRoute();

// 반응형 객체 선언 : AJAX를 통해 Server에서 데이터를 가져오면 재할당 + 중첩 프로퍼티 관찰(v-model)
let bookInfo = ref({
        no : '',
        name : '',
        writer : '',
        publisher : '',
        publication_date : '',
        info : ''
    });

// 반응형 객체 선언 : 원시타입    
const isUpdated = ref(false);        

const getToday = ()=>{
    return userDateUtils.dateFormat(null, 'yyyy-MM-dd');
};

const bookInsert = async ()=>{
    let obj = {
        name : bookInfo.value.name,
        writer : bookInfo.value.writer,
        publisher : bookInfo.value.publisher,
        publication_date : bookInfo.value.publication_date,
        info : bookInfo.value.info
    }

    let result = await axios.post("/api/books", obj)
       .catch(err => console.log(err));

    let addRes = result.data;
    if(addRes.isSuccessed){
        alert('등록되었습니다.');
        bookInfo.value.no = addRes.bookNo;
    }else{
        alert('등록되지 않았습니다.\n데이터를 확인해보세요.');
    };
};

const getBookInfo = async (selected)=>{
    // 서버에 데이터를 요청
    let result = await axios.get(`/api/books/${selected}`)
    .catch(err => console.log(err));
    bookInfo.value = result.data;
    bookInfo.value.publication_date = userDateUtils.dateFormat(bookInfo.value.publication_date, 'yyyy-MM-dd');
};

const bookUpdate = async ()=>{
    let obj = {
        name : bookInfo.value.name,
        writer : bookInfo.value.writer,
        publisher : bookInfo.value.publisher,
        publication_date : bookInfo.value.publication_date,
        info : bookInfo.value.info
    }

    let result = await axios.put(`/api/books/${bookInfo.value.no}`, obj)
       .catch(err => console.log(err));

    let updateRes = result.data;
    if(updateRes.isUpdated){
        alert('수정되었습니다.');
    }else{
        alert('수정되지 않았습니다.\n데이터를 확인해보세요.');
    };
};

onBeforeMount(()=> {

    let searchNo = route.query.bno;
    if(searchNo > 0){
        //수정
        getBookInfo(searchNo);
        isUpdated.value = true;
    }else{
        //등록
        bookInfo.value.publication_date = getToday();  
    }
});
</script>
<style scoped>
/* Style inputs with type="text", select elements and textareas */
input, select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
button[type=button] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
button[type=button]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>