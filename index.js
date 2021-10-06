const express = require('express')
const bodyParser = require('body-parser')
const my_queries = require('./queries')
const db = require('./databaseConfig')

const app = express()
app.use(bodyParser.json())

db.connect((err) => {
  if (err) throw err;
})

app.get('/users', (req, res) => {
  db.query(my_queries.all_users_2, (error, results, fields) => {
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
  exists = false
  unique_email = req.body.email
  db.query(my_queries.find_user, [[unique_email]], (error, results, fields) => {
    console.log(results)
    if (error) throw error;
    if (results[0]) {
      return res.status(201).send({ 409: 'Conflict', "message": 'user already exists' })
    }
    else {
      db.query(my_queries.create_user, [[unique_email]], (err) => {
        if (err) throw err;
        return res.status(201).send({ 201: "USER CREATED" })
      })
    }
  })
})



app.set("port", process.env.PORT || 4001);
app.listen(app.get("port"), () => {
  console.log(db.config.database, `CONNECTED ON PORT: ${app.get("port")} `);
});
