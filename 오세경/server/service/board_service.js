<<<<<<< HEAD
const mariaDB = require('../database/mapper.js');
const { boardInfo } = require('../database/sqls/board.js');

//전체조회
const findAll = async ()=> {
let list  = await mariaDB.query('boardList')
                         .catch(err => console.log(err));
 return list;
};

//단건조회
const findbyId = async(selectBoard) => {
  let list = await mariaDB.query('boardInfo',selectBoard )
                          .catch(err => console.log(err));
  let info = list[0];
  return info;
};

//등록
const createNewBoard = async(boardInfo) => {
  let insertInfo = getInsertInfo(boardInfo);
  let result = await mariaDB.query('boardInsert',insertInfo)
                            .catch(err => console.log(err));
  if(result.insertId > 0){
    return { result : true, no : result.insertId};
  }else {
    return { result : false};
  }
};

function getInsertInfo(target){
  return [
    target.NO,
    target.TITLE,
    target.WRITER,
    target.CONTENT,
    target.CREATED_DATE,
    
  ];
}
module.exports={
  findAll,
  findbyId,
  createNewBoard,
=======
const mariaDB = require('../database/mapper.js');
const { boardInfo } = require('../database/sqls/board.js');

//전체조회
const findAll = async ()=> {
let list  = await mariaDB.query('boardList')
                         .catch(err => console.log(err));
 return list;
};

//단건조회
const findbyId = async(selectBoard) => {
  let list = await mariaDB.query('boardInfo',selectBoard )
                          .catch(err => console.log(err));
  let info = list[0];
  return info;
};

//등록
const createNewBoard = async(boardInfo) => {
  let insertInfo = getInsertInfo(boardInfo);
  let result = await mariaDB.query('boardInsert',insertInfo)
                            .catch(err => console.log(err));
  if(result.insertId > 0){
    return { result : true, no : result.insertId};
  }else {
    return { result : false};
  }
};

function getInsertInfo(target){
  return [
    target.NO,
    target.TITLE,
    target.WRITER,
    target.CONTENT,
    target.CREATED_DATE,
    
  ];
}
module.exports={
  findAll,
  findbyId,
  createNewBoard,
>>>>>>> 96cad937b608c1710c83062ae288bb9e59385f1c
};