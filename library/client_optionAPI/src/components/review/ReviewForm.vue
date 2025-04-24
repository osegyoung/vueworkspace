<template>
  <div class="card">
    <div class="card-header text-center" v-if="!isUpdated">리뷰 등록</div>
    <div class="card-body container">
      <form>
        <div class="form-group">
          <label for="writer">작성자</label>
          <input type="text" class="form-control" id="writer" v-model="reviewInfo.writer">
        </div>
        <div class="form-group">
          <label for="content">내용</label>
          <textarea class="form-control" id="content" v-model="reviewInfo.content"></textarea>
        </div>
        <div class="form-group row">
          <!-- 별점을 5 점 만점으로 각 점수를 Radio 버튼으로 선택하도록 함 -->
          <template v-for="score in scores">
            <label class="form-check-label col">
              <input type="radio" v-bind:value="score" v-model="reviewInfo.score">
              <!-- 각 점수를 별표를 이용해서 표시 -->
              <span v-for="count in score">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792
 1792" width="15" height="15">
                  <path fill="yellow"
                    d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0
21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21
0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                  </path>
                </svg>
              </span>
            </label>
          </template>
        </div>
        <!-- isUpdated 프로퍼티의 값을 기준으로 각 버튼이 적절하게 보이도록 제어 -->
        <template v-if="isUpdated">
          <button type="button" class="btn btn-info" @click="reviewUpdate()">수정</button>
          <button type="button" class="btn btn-light" @click="updateCancel()">취소</button>
        </template>
        <button type="button" class="btn btn-info" v-else @click="reviewInsert()">등록</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  // 해당 컴포넌트를 호출하는 부모 컴포넌트에 따라 받는 값이 달라짐 *******
  // bookNo : 부모컴포넌트가 BookInfo.vue => 새로운 리뷰 등록
  // reviewNo : 부모 컴포넌트가 ReviewInfo.vue => 기존 리뷰 수정
  props: ['bookNo', 'reviewNo'], // <- 부모가 넘겨준거 받는 것만 할 수 있음. 
  data() {
    return {
      scores: [5, 4, 3, 2, 1],
      reviewInfo: {},
      isUpdated: false,
    }
  },
  created() {
    // reviewNo 프로퍼티의 값이 존재하는 경우 기존 리뷰를 수정
    if (this.reviewNo > 0) {
      this.getReviewInfo();
      this.isUpdated = true;
    }
  },
  methods: {
    async reviewInsert() {
      let obj = {
        book_no: this.bookNo,
        writer: this.reviewInfo.writer,
        content: this.reviewInfo.content,
        score: this.reviewInfo.score,
      };
      let result = await axios.post(`/api/reviews`, obj)
        .catch(err => console.log(err));
      let addRes = result.data;
      if (addRes.isSuccessed) {
        alert('등록되었습니다.');
        // this.$emit('custmoe-event'[, 전달할 값 ]) : 커스텀 이벤트를 부모에게 전달 // 새로운 리뷰가 등록된 걸 'add-review' 라는 이벤트로 부모 컴포넌트에게 전달 this.$emit('add-review');
        this.reviewInfo = {};
      } else {
        alert('등록되지 않았습니다.\n 데이터를 확인해보세요.');
      };
    },
    async getReviewInfo() {
      let result = await axios.get(`/api/reviews/${this.reviewNo}`)
        .catch(err => console.log(err));
      this.reviewInfo = result.data;
    },
    async reviewUpdate() {
      let obj = {
        writer: this.reviewInfo.writer,
        content: this.reviewInfo.content,
        score: this.reviewInfo.score,
        book_no: this.reviewInfo.book_no,
      };
      let result = await axios.put(`/api/reviews/${this.reviewInfo.no}`, obj)
        .catch(err => console.log(err));
      let updateRes = result.data;
      if (updateRes.isUpdated) {
        alert('수정되었습니다.');
        // this.$emit('custmoe-event'[, 전달할 값 ]) : 커스텀 이벤트를 부모에게 전달 // 리뷰가 수정된 걸 'update-review' 라는 이벤트로 부모 컴포넌트에게 전달
        this.$emit('update-review');
      } else {
        alert('수정되지 않았습니다.\n 데이터를 확인해보세요.');
      };
    },
    updateCancel() {
      // this.$emit('custmoe-event'[, 전달할 값 ]) : 커스텀 이벤트를 부모에게 전달 // 리뷰가 수정을 취소한 걸 'cancel-edit' 라는 이벤트로 부모 컴포넌트에게 전달
      this.$emit('cancel-edit');
    },
  }
}
</script>
