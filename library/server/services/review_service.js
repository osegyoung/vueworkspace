const mariadb = require("../database/mapper.js");
const { convertObjToAry, convertObjToQuery } = require('../utils/converts.js');
// 다양한 조건을 기반으로 한 리뷰조회
const findList = async (searchList) => {
 // 검색정보가 넘어온 경우 
 // SQL 문에 반영하기 위해 문자열로 변환하는 함수 호출
 let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) :
'';
 let list = await mariadb.query("selectReviewList", searchKeyword);
 return list;
};
// PRIMARY KEY 인 no 을 기반으로 한 단건조회
const findByReviewNo = async (reviewNo) => {
  let list = await mariadb.query("selectReviewOne", reviewNo);
  let info = list[0];
  return info;
 };
 // 새로운 리뷰 등록
 const addNewReview = async (reviewInfo) => {
  let insertColumns = ['writer', 'score', 'content', 'book_no'];
  let data = convertObjToAry(reviewInfo, insertColumns);
  let resInfo = await mariadb.query("reviewInsert", data);
  let result = null;
  if (resInfo.insertId > 0) {
  result = {
  isSuccessed: true,
  reviewNo: resInfo.insertId,
  };
  } else {
  result = {
  isSuccessed: false,
  };
  }
  return result;
 };
 // 기존 리뷰 수정
 const modifyReviewInfo = async (reviewNo, reviewInfo) => {
  let data = [reviewInfo, reviewNo];
  let resInfo = await mariadb.query("reviewUpdate", data);
 
  let result = null;
  if (resInfo.affectedRows > 0) {
  reviewInfo.no = reviewNo;
  result = {
  isUpdated: true,
  reviewInfo,
  };
  } else {
  result = {
  isUpdated: false,
  };
  }
  return result;
 };
 // 기존 리뷰 삭제
 const removeReviewInfo = async (reviewNo) => {
  let result = await mariadb.query("reviewDelete", reviewNo);
  return result;
 };
 module.exports = {
  findList,
  findByReviewNo,
  addNewReview,
  modifyReviewInfo,
  removeReviewInfo,
 };