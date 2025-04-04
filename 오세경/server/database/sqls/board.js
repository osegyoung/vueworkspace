//전체 조회
const boardList = 
`SELECT NO
,TITLE
,WRITER
,CONTENT
,CREATED_DATE
,UPDATED_DATE
FROM T_BOARD_BOARD
ORDER BY NO`;

//단건조회
const boardInfo = 
`SELECT NO
,TITLE
,WRITER
,CONTENT
,CREATED_DATE
,UPDATED_DATE
FROM T_BOARD_BOARD
WHERE NO = ?`;

//등록
const boardInsert = 
`INSERT INTO t_board_board (no, title, writer, content, created_date)
values (?,?,?,?,?)`;

module.exports = {
  boardList,
  boardInfo,
  boardInsert,
  
  }