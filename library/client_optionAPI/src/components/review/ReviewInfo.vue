<script>
import useDateUtils from '@/utils/useDates.js';
import axios from 'axios';
import ReviewForm from './ReviewForm.vue';
export default {
  components: {
    ReviewForm,
  },
  props: ['reviewInfo'],
  data() {
    return {
      scoreMax: 5,
      isEdited: false,
    }
  },
  methods: {
    dateFormat(value, format) {
      return useDateUtils.dateFormat(value, format);
    },
    async delInfo() {
      let ajaxRes = await axios.delete(`/api/reviews/${this.reviewInfo.no}`)
        .catch(err => console.log(err));
      let sqlRes = ajaxRes.data;
      let result = sqlRes.affectedRows;
      if (result > 0) {
        alert('정상적으로 삭제되었습니다.');
        this.$emit('review-reload');
      } else {
        alert('삭제되지 않았습니다.');
      }
    },
    goToForm() {
      this.isEdited = true;
    },
    updateInfo() {
      // 자식 컴포넌트가 전달한 커스텀 이벤트에 대응하는 함수
      this.isEdited = false;
      this.$emit('review-reload');
    },
  }
}
</script>
<template>
  <li class="list-group-item">
    <div class="container">
      <div class="row" v-show="!isEdited">
        <div class="col text-start">
          {{ reviewInfo.writer }}
        </div>
        <div class="col text-start">
          {{ dateFormat(reviewInfo.created_date, 'yyyy-MM-dd') }}
        </div>
        <div class="col text-start">
          <template v-for="n in reviewInfo.score">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
              <path fill="yellow" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5
35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6
2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502
73q56 9 56 46z">
              </path>
            </svg>
          </template>
          <template v-for="n in (scoreMax - reviewInfo.score)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
              <path fill="white" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5
35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6
2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502
73q56 9 56 46z">
              </path>
            </svg>
          </template>
        </div>
        <div class="col text-end">
          <button type="button" class="btn btn-success" v-on:click="goToForm()">수정</button>
          <button type="button" class="btn btn-danger" v-on:click="delInfo()">삭제</button>
        </div>
      </div>
      <div class="row text-start" v-show="!isEdited">
        {{ reviewInfo.content }}
      </div>
      <!-- 사용자가 수정을 원할 경우 ReviewForm 을 보이도록 함.-->
      <div class="row" v-show="isEdited">
        <!-- 자식 컴포넌트가 전달하는 커스텀 이벤트도 v-on 디렉티브를 활용해 이벤트
핸들러를 등록 -->
        <ReviewForm v-bind:reviewNo="reviewInfo.no" @update-review="updateInfo" @cancel-edit="isEdited = false;" />
      </div>
    </div>
  </li>
</template>