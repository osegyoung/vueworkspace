const mariadb = require("../database/mapper.js");
const {
  convertObjToAry
} = require('../utils/converts.js');
const loginByUserId = async (loginInfo) => {
  let list = await mariadb.query("findUserInfoByUserId", loginInfo.id);
  let userInfo = null;
  if (list.length == 1) {
    // 해당 회원의 정보가 존재하는 경우 <- 조건문이 두번 들어감. 
    let info = list[0];
    if (info.password == loginInfo.pwd) {
      // 테이블에 등록된 회원의 비밀번호와 입력받은 비밀번호가 같은 경우
       userInfo = info;
    }
  }
  return {
    result: userInfo != null,
    userInfo,
  };
};
const findUserInfoById = async (userId) => {
  let list = await mariadb.query("selectUserOne", userId);
  let info = list[0];
  return info;
};
const addNewUser = async (userInfo) => {
  let insertColumns = ['user_id', 'password', 'user_name', 'email'];
  let data = convertObjToAry(userInfo, insertColumns);
  let resInfo = await mariadb.query("userInsert", data);
  let isSuccessed = false;
  if (resInfo.insertId > 0) {
    isSuccessed = true;
  }
  return {
    isSuccessed,
  };
};
const modifyUserInfo = async (userId, userInfo) => {
  let data = [userInfo, userId];
  let resInfo = await mariadb.query("userUpdate", data);
  return {
    isUpdated: (resInfo.affectedRows > 0),
  };
};
module.exports = {
  loginByUserId,
  findUserInfoById,
  addNewUser,
  modifyUserInfo,
};
