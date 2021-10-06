let mysql = require('mysql');
const express = require('express')
const my_queries = require('./queries')

const app = express()

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Python1/',
  database: 'join_us_db'
});

app.get('/', (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    connection.query(my_queries.all_users, (error, results, fields) => {
      if (error) throw error;
      res.send(results).json()
    });
    connection.end(error => {
      if (error) throw error;
    });
  });
})


app.get('/users', (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    connection.query(my_queries.all_users_2, (error, results, fields) => {
      if (error) throw error;
      res.send(results).json()
    });
    connection.end(error => {
      if (error) throw error;
    });
  });
})

all_photos =
  `SELECT * FROM photos`

app.get('/photos', (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    connection.query(my_queries.all_photos, (error, results, fields) => {
      if (error) throw error;
      res.send(results)
    });
    connection.end(error => {
      if (error) throw error;
    });
  });
})


app.listen(4001, () => {
  console.log('connected on port 4001')
})



