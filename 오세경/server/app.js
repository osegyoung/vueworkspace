
require('dotenv').config({path : './database/mysql.env'})
const express = require('express');
const app = express();
const boardRouter = require('./router/board_router.js')

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.listen(3000, ()=>{
  console.log('Server Start');
  console.log('http://localhost:3000');
});

app.get('/', (req,res)=> {
  res.send('Welcome');
})

app.use('/',boardRouter);