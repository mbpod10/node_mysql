let mysql = require('mysql');
const faker = require('faker');
const express = require('express')
const app = express()

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Python1/',
  database: 'join_us_db'
});

all_users = 'SELECT users.id AS user_id, email, image_url, photos.id AS photo_id FROM users JOIN photos ON users.id = photos.user_id'

app.get('/', (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    connection.query(all_users, (error, results, fields) => {
      if (error) throw error;
      res.send(results)
    });
    connection.end(error => {
      if (error) throw error;
    });
  });
})



app.get('/id/:id', (req, res) => {
  res.send(req.params.id)
})

app.listen(4001, () => {
  console.log('connected on port 4001')
})



