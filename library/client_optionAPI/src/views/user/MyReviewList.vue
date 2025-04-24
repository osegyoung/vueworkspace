<script>
import useDateUtils from '@/utils/useDates.js';
import axios from 'axios';
// pinia 로 관리하는 store(저장소) 중 필요한 저장소를 가져옴
import { useUserStore } from '../../store/index';
// store(저장소) 중 getters 정보를 가져올 함수
import { mapState } from 'pinia';
export default {
  data() {
    return {
      reviewList: [],
      scoreMax: 5,
    }
  },
  computed: {
    // 저장소가 가지고 있는 getters 중 필요한 함수만 가져옴
    // => store(저장소) 정보를 가지고 있는 변수를 구조분해할당할 경우 반응성이 끊어짐
    ...mapState(useUserStore, ['userId']),
    isLoggedIn() {
      return this.userId != undefined;
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.getReviewList();
    } else {
      alert('회원정보가 존재하지 않습니다.');
      this.$router.push({ name: 'loginForm' });
    }
  },
  methods: {
    dateFormat(value, format) {
      return useDateUtils.dateFormat(value, format);
    },
    async getReviewList() {
      // r.writer : 테이블 별칭을 그대로 보내는 이유는 문자열 방식으로 WHERE 절을 작성하므로 
      let result = await axios.get(`/api/reviews?r.writer=${this.userId}`) // #주의 사항 : r빠지면 위험 함. ㅋㅋ 중요함!!
        .catch(err => console.log(err));
      this.reviewList = result.data;
    },
  }
}
</script>

<template>
  <div>
    <div class="card">
      <div class="card-header text-center">내가 작성한 리뷰 목록</div>
      <div class="card-body">
        <ul class="list-group">
          <template v-if="reviewList.length > 0">
            <li class="list-group-item" v-for="reviewInfo in reviewList" :key="reviewInfo.no">
              <div class="container">
                <div class="row">
                  <div class="col text-start">
                    {{ reviewInfo.name }}
                  </div>
                  <div class="col text-start">
                    {{ dateFormat(reviewInfo.created_date, 'yyyy-MM-dd')
                    }}
                  </div>
                  <div class="col text-start">
                    <template v-for="n in reviewInfo.score">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                        <path fill="yellow"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21
0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                        </path>
                      </svg>
                    </template>
                    <template v-for="n in (scoreMax - reviewInfo.score)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                        <path fill="white"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21
0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                        </path>
                      </svg>
                    </template>
                  </div>
                </div>
                <div class="row text-start">
                  {{ reviewInfo.content }}
                </div>
              </div>
            </li>
          </template>
          <li v-else class="list-group-item">현재 작성된 리뷰가 없습니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>