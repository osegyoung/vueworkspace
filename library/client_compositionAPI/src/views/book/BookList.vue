<template>
    <div class="container">
        <table class="table table-hover">
            <caption> total : {{ count }}</caption>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>도서명</th>
                    <th>저자</th>
                    <th>출판사</th>
                    <th>출판일수</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="book.no" v-for="book in bookList" @click="goToDetail(book.no)">
                    <td>{{ book.no }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.writer }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>{{ useDateUtils.dateFormat(book.publication_date, 'yyyy-MM-dd') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import useDateUtils from '@/utils/useDates.js';
import axios from 'axios';

// Composition API : 필요한 함수를 import
import { shallowRef, computed, onBeforeMount } from 'vue';
// Router에 접근하는 경우 useRouter 함수를 사용
import { useRouter } from 'vue-router';
// Router 객체를 반환
const router = useRouter();

// 반응형 객체 선언 : AJAX를 통해 Server에서 데이터를 가져오면 재할당 + 단순 출력(중첩 프로퍼티 관찰 X)
let bookList = shallowRef([]);

// 앞서 선언한 반응형 객체의 값을 기준으로 자동 계산하는 값 선언
const count = computed(()=>{
    // ref 기반의 반응형 객체이므로 실제 값에 접근할 떄는 value 필드 사용
    // 동시에 Composition API에선 객체로 선언하지 않으므로 this로 접근 불가
    return bookList.value.length;
})

// Vue 객체가 사용할 기능은 일반 함수를 선언하듯 작성
const getBookList = async () => {
    let result = await axios.get('/api/books')
        .catch(err => console.log(err));

    // ref 기반의 반응형 객체이므로 실제 값에 접근할 떄는 value 필드 사용
    // 동시에 Composition API에선 객체로 선언하지 않으므로 this로 접근 불가
    bookList.value = result.data; 
};
const goToDetail = (bookNo) => {
    // Composition API에선 객체로 선언하지 않으므로 this로 접근 불가
    router.push({ name: 'bookInfo', params: { bno: bookNo } });
};

// beforeCreate 와 created 훅은 사용 불가 => onBeforeMount(), 가장 먼저 실행되는 훅
onBeforeMount(() => {
    // 해당 훅에서 작업할 내용을 함수로 선언해서 전달, 콜백함수
    getBookList();
});

</script>
<style scoped>
table * {
    text-align: center;
}
</style>
