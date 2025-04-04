const mariaDB = require('mariadb/callback');
const sqlList = require('./sqls/board.js');

const connectionPool = mariaDB.createPool({
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  user : process.env.DB_USER,
  password : process.env.DB_PWD,
  database : process.env.DB_DATABASE,
  connectionLimit : process.env.DB_LIMIT,

  permitSetMultiParamEntries : true,
  insertIdAsNumber : true,
  bigIntAsNumber : true,
  logger : {
    query : console.log,
    error : console.log, 
  },
});

const query = (alias, values) => {
  return new Promise((resolve,reject)=>{
    let executeSql = sqlList[alias];
    connectionPool.query(executeSql,values, (err,result)=>{
      if(err){
        reject({err});
      }else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  query,
}