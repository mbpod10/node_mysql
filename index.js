const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const my_queries = require('./queries')
const db = require('./databaseConfig')

const app = express()
app.use(bodyParser.json())

db.connect((err) => {
  if (err) throw err;
})

app.get('/users', (req, res) => {
  db.query(my_queries.all_users, (error, results, fields) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

app.get('/photos', (req, res) => {
  db.query(my_queries.all_photos, (error, results, fields) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

app.post('/create_user', (req, res) => {
  unique_email = req.body.email
  db.query(my_queries.find_user, [[unique_email]], (error, results, fields) => {
    console.log(results)
    if (error) throw error;
    if (results[0]) {
      return res.status(201).send({ 409: 'Conflict', "message": 'user already exists' })
    }
    else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      db.query(my_queries.create_user, [[unique_email, hash]], (err) => {
        if (err) throw err;
        console.log(hash)
        return res.status(201).send({ 201: "USER CREATED" })
      })
    }
  })
})

app.post('/create_photo', (req, res) => {
  db.query(my_queries.create_photo, [[req.body.image_url, req.body.user_id]], (error, results, fields) => {
    if (error) throw error;
    console.log(fields)
    return res.status(200).send(results)
  })
})

app.post('/login', (req, res) => {
  unique_email = req.body.email
  db.query(my_queries.find_user, [[unique_email]], (error, results, fields) => {
    if (error) throw error;
    if (results[0]) {
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        return res.status(201).send({ 200: 'Login Successful' })
      }
      else {
        return res.status(401).send({ 401: 'Incorrect Password' })
      }
    }
    else {
      return res.status(401).send({ 401: 'User Not Found' })
    }
  })
})





app.set("port", process.env.PORT || 4001);
app.listen(app.get("port"), () => {
  console.log(db.config.database, `CONNECTED ON PORT: ${app.get("port")} `);
});
