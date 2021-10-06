const express = require('express')
const bodyParser = require('body-parser')
const my_queries = require('./queries')
const connection = require('./databaseConfig')

const app = express()
app.use(bodyParser.json())

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


app.post('/', (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    connection.query(add_user, [[req.body.email, req.body.created_at]], (err) => {
      if (err) throw err;
      res.send({ 201: "USER CREATED" })
    })
    connection.end(error => {
      if (error) throw error;
    });
  });
})

app.post('/create_user', (req, res) => {
  exists = false
  unique_email = req.body.email
  connection.query(my_queries.find_user, [[unique_email]], (error, results, fields) => {
    console.log(results)
    if (error) throw error;
    if (results[0]) {
      res.send({ 409: 'Conflict', "message": 'user already exists' })
      exists = true
    }
  })
  if (!exists) {
    connection.query(my_queries.create_user, [[req.body.email, req.body.created_at]], (err) => {
      if (err) throw err;
      res.send({ 201: "USER CREATED" })
    })
  }
  connection.end()
})


app.listen(4001, () => {
  console.log('connected on port 4001')
})



