let mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Python1/',
  database: 'join_us_db'
});

module.exports = db