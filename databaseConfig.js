let mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Python1/',
  database: 'join_us_db'
});

module.exports = connection