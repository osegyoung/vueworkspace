const express = require('express');
const router = express.Router();
const reviewService = require('../services/review_service.js');
// 라우팅 = 사용자의 요청(URL+METHOD) + Service + 응답형태(View or Data)

// 다양한 조건을 기반으로 전체조회 => 다양한 조건은 정해지지 않았으므로QueryString(질의문자열) 으로 유연하게 처리
router.get('/reviews', async (req, res) => {
  // GET + QueryString(질의문자열) => req(Http Request 에 대응하는 객체)의 query 속성 사용 let search = req.query;
  let reviewList = await reviewService.findList(search)
    .catch(err => console.log(err));
  res.send(reviewList);
});

// 단건조회
router.get('/reviews/:no', async (req, res) => {
  let reviewNo = req.params.no;
  let reviewInfo = await reviewService.findByReviewNo(reviewNo)
    .catch(err => console.log(err));
  res.send(reviewInfo);
})
// 등록
router.post('/reviews', async (req, res) => {
  let reviewInfo = req.body;
  let result = await reviewService.addNewReview(reviewInfo)
    .catch(err => console.log(err));
  res.send(result);
});

// 수정
router.put('/reviews/:no', async (req, res) => {
  let reviewNo = req.params.no;
  let reviewInfo = req.body;
  let result = await reviewService.modifyReviewInfo(reviewNo, reviewInfo)
    .catch(err => console.log(err));
  res.send(result);
});

// 삭제
router.delete('/reviews/:no', async (req, res) => {
  let reviewNo = req.params.no;
  let resInfo = await reviewService.removeReviewInfo(reviewNo)
                                    .catch(err => console.log(err));
  res.send(resInfo);
})

module.exports = router