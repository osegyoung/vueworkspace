const books = require('./sqls/books.js');
const reviews = require('./sqls/reviews.js');
const users = require('./sqls/users.js');

module.exports = {
  ...books, // 펼침 연산자
  ...reviews,
  ...users,
}
