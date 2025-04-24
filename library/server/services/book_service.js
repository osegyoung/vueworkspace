// Service에서 필요하면 DB에 접속할 수 있도록 mapper를 가져옴
const mariadb = require("../database/mapper.js");
// 공통으로 사용하는 기능들 중 필요한 함수만 구조분해할당(Destructuring)으로 가져옴
const { convertObjToAry } = require('../utils/converts.js');

// 조건 없이 전체조회
const findAll = async () => {
  // 변수 mariadb에 등록된 query 함수를 통해 서비스에서 필요한 SQL문을 실행하도록 요청
  // -> 비동기작업이므로 await/async를 활용해서 동기식으로 동작하도록 진행
  let list = await mariadb.query("selectBookList")
                          .catch(err => console.log(err));
  return list;
};

// 북번호를 기준으로 단건조회
const findByBookNo = async (bookNo) => {
  // bookNo : 사용자가 전달한 북번호, Number 타입
  let list = await mariadb.query("selectBookOne", bookNo)
                          .catch(err => console.log(err));
  // mariadb 모듈의 경우 SELECT문의 결과는 갯수와 상관없이 배열로 반환
  // -> 서비스의 결과로 값이 하나일 경우 변환이 필요함.
  let info = list[0];
  return info;
};

// 북정보(name, writer, publisher, publication_date, info)를 기반으로 등록
const addNewBook = async (bookInfo) => {
  // bookInfo : 사용자가 전달한 북정보, Object 타입

  // t_book_01 테이블에 등록하는 insert문에 정의된 컬럼들
  let insertColumns = ['name', 'writer', 'publisher', 'publication_date', 'info'];
  // 사용자가 전달한 북정보 중 insert문에 정의된 컬럼들 기준으로 값을 선별 : 객체 -> 배열
  let data = convertObjToAry(bookInfo, insertColumns);

  let resInfo = await mariadb.query("bookInsert", data)
                              .catch(err => console.log(err));
  // mariadb 모듈은 DML(insert, update, delete)의 결과를 { affectedRows: 1, insertId: 1, warningStatus: 0 } 로 반환
  // affectedRows : 실제 실행된 행수 (default : 0)
  // insertId     : AUTO_INCREMENT를 사용하는 경우 자동 부여된 PRIMARY KEY를 가짐, 무조건 Number 타입 (default : 0)

  let result = null;
  if (resInfo.insertId > 0) {
    // 정상적으로 등록된 경우
    result = {
      isSuccessed: true,
      bookNo: resInfo.insertId,
    };
  } else {
    // 등록되지 않은 경우
    result = {
      isSuccessed: false,
    };
  }
  return result;
};

// 북정보 수정
const modifyBookInfo = async (bookNo, bookInfo) => {
  // bookNo : 사용자가 전달한 북번호, Number 타입
  // bookInfo : 사용자가 전달한 북정보, Object 타입

  // SQL문에 존재하는 ?에 전달하기 위해 배열로 변환
  let data = [bookInfo, bookNo];

  let resInfo = await mariadb.query("bookUpdate", data)
                          .catch(err => console.log(err));
  
  let result = null;
  if (resInfo.affectedRows > 0) {
    // 정상적으로 수정된 경우 : 수정과 삭제의 경우 insertId은 무조건 0이므로 affectedRows로 판단
    bookInfo.no = bookNo;
    result = {
      isUpdated: true,
      bookInfo,
    };
  } else {
    // 수정되지 않은 경우
    result = {
      isUpdated: false,
    };
  }
  return result;
};

// 북번호를 기준으로 북정보 삭제
const removeBookInfo = async (bookNo) => {
  // bookNo : 사용자가 전달한 북번호, Number 타입

  let result = await mariadb.query("bookDelete", bookNo)
                          .catch(err => console.log(err));
  return result;
};

module.exports = {
  findAll,
  findByBookNo,
  addNewBook,
  modifyBookInfo,
  removeBookInfo,
};
