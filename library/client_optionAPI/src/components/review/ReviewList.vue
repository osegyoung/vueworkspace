<script>
import axios from 'axios';
import ReviewInfo from './ReviewInfo.vue';
export default {
  components: {
    ReviewInfo,
  },
  props: ['bookNo'],
  data() {
    return {
      reviewList: [],
    }
  },
  created() {
    this.getReviewList();
  },
  methods: {
    async getReviewList() {
      let result = await axios.get(`/api/reviews?book_no=${this.bookNo}`)
        .catch(err => console.log(err));
      this.reviewList = result.data;
    },
  }
}
</script>
<template>
  <div>
    <div class="card">
      <div class="card-header text-center">리뷰 목록</div>
      <div class="card-body">
        <ul class="list-group">
          <template v-if="reviewList.length > 0">
            <!-- 자식 컴포넌트를 하나의 태그(사용자 정의 태그)로 볼 수 있음 -->

            <ReviewInfo v-for="info in reviewList" :key="info.no" v-bind:reviewInfo="info"
              v-on:review-reload="getReviewList" />
          </template>
          <li v-else class="list-group-item">현재 작성된 리뷰가 없습니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>