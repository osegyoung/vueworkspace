const express = require('express');
const router = express.Router();


const boardService = require('../service/board_service.js');

//전체조회
router.get('/board', async (req,res)=>{
  let list = await boardService.findAll();
  res.send(list);
});

//단건조회
router.get('/board/:no', async (req,res)=> {
  let boardNo = req.params.no;
  let info = await boardService.findbyId(boardNo);
  res.send(info);
});

//등록
router.post('/board', async (req,res) => {
  let boardInfo = req.body;
  let result = await boardService.createNewBoard(boardInfo);
  res.send(result);
});

//수정
router.put('/board/:id', async (req, res) => {
  let boardNo = req.params.no;
  let  boardUpInfo = req.body;
  let result = await boardService.modifyCustomerInfo(boardUpInfo, boardNo); // 순서대로 넘겨야함.
  res.send(result);
});
module.exports = router;