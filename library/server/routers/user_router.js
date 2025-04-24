const express = require('express');
const router = express.Router();
const userService = require('../services/user_service.js');
// 회원가입
router.post('/users', async (req, res) => {
  let userInfo = req.body;
  let result = await userService.addNewUser(userInfo)
    .catch(err => console.log(err));
  res.send(result);
});

// 로그인
router.post('/login', async (req, res) => {
  let loginInfo = req.body;
  let resInfo = await userService.loginByUserId(loginInfo)
    .catch(err => console.log(err));

  if (resInfo.result) {
    // 성공한 경우 정보를 세션에 저장
    req.session.user = resInfo.userInfo.user_id;
    req.session.save(function (err) {
      if (err) throw err;
      res.send({
        result: true,
        id: resInfo.userInfo.user_id
      });
    })
  } else {
    // 실패한 경우
    res.send({
      result: false,
      message: '회원 정보가 존재하지 않습니다.'
    });
  }

  });
  // 로그아웃
  router.get('/logout', (req, res) => {
    // 로그아웃시 정보를 저장하고 있는 세션을 소멸
    req.session.destroy();
    res.send({
      result: true
    });
  });
  // 회원정보조회
  router.get('/myInfo', async (req, res) => {
    // 세션에서 로그인한 정보(id) 가져옴
    let userId = req.session.user;
    let userInfo = await userService.findUserInfoById(userId)
      .catch(err => console.log(err));
    res.send(userInfo);
  });

  // 회원정보수정
  router.put('/myInfo', async (req, res) => {
    // 세션에서 로그인한 정보(id) 가져옴
    let userId = req.session.user;
    let userInfo = req.body;
    let result = await userService.modifyUserInfo(userId, userInfo)
      .catch(err => console.log(err));
    res.send(result);
  });


  module.exports = router