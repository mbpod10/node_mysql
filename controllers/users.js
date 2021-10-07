const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const my_queries = require('./queries')
const db = require('../databaseConfig')

router.get('/', (req, res) => {
  db.query(my_queries.all_users, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.post('/create_user', (req, res) => {
  unique_email = req.body.email
  db.query(my_queries.find_user, [[unique_email]], (error, results) => {
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

router.post('/login', (req, res) => {
  unique_email = req.body.email
  db.query(my_queries.find_user, [[unique_email]], (error, results) => {
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

router.get('/:id', (req, res) => {
  db.query(my_queries.find_user_by_id_sub, [[req.params.id]], (error, user_results) => {
    if (error) throw error;
    db.query(my_queries.find_user_by_id, [[req.params.id]], (error, results) => {
      if (error) throw error;
      return_results = {
        "user_id": user_results[0].id,
        "email": user_results[0].email,
        "password": user_results[0].password,
        "user_created": user_results[0].created_at,
        "post_count": results.length,
        "posts": results
      }
      return res.status(200).send(return_results)
    });
  });
})

module.exports = router;