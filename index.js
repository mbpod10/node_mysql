const faker = require('faker');
let mysql = require('mysql');
const express = require('express')

const app = express()

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Python1/',
  database: 'ig_clone'
});


app.get('/', (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    connection.query('SELECT * FROM users;', (error, results, fields) => {
      if (error) throw error;
      res.send(results)
    });
    connection.end(error => {
      if (error) throw error;
      console.log('disconnecting from server')
    });
  });

})

app.listen(4001, () => {
  console.log('connected on port 4001')
})



