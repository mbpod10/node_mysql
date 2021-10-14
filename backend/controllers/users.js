const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const user_queries = require('./queries/user_query')
const db = require('../databaseConfig')

router.get('/', (req, res) => {
  db.query(user_queries.all_users, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.post('/create_user', (req, res) => {
  unique_email = req.body.email
  db.query(user_queries.find_user, [[unique_email]], (error, results) => {
    console.log(results)
    if (error) throw error;
    if (results[0]) {
      return res.status(201).send({ 409: 'Conflict', "message": 'user already exists' })
    }
    else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      db.query(user_queries.create_user, [[unique_email, req.body.username, hash]], (error, results) => {
        if (error) throw error;
        console.log(results.insertId)
        id = results.insertId
        return res.status(201).send({ "id": id })
      })
    }
  })
})

router.post('/login', (req, res) => {
  unique_email = req.body.email
  db.query(user_queries.find_user, [[unique_email]], (error, results) => {
    if (error) throw error;
    if (results[0]) {
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        return res.status(201).send({ 200: 'Login Successful', "msg": "Successful" })
      }
      else {
        return res.status(200).send({ 401: 'Incorrect Password' })
      }
    }
    else {
      return res.status(200).send({ 401: 'User Not Found' })
    }
  })
})


router.get('/profiles', (req, res) => {
  db.query(user_queries.join_user_and_profile, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

// router.get('/profiles', (req, res) => {
//   db.query(user_queries.join_user_and_profile, (error, results) => {
//     if (error) throw error;
//     return res.status(200).send(results)
//   });
// })

router.post('/create_profile', (req, res) => {
  params = [req.body.first_name, req.body.last_name, req.body.profile_image, req.body.profile_description, req.body.user_id]
  db.query(user_queries.created_profile, [params], (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})


router.get('/:id', (req, res) => {
  db.query(user_queries.find_user_by_id_sub, [[req.params.id]], (error, user_results) => {
    if (error) throw error;
    db.query(user_queries.find_user_by_id, [[req.params.id]], (error, photo_results) => {
      if (error) throw error;
      db.query(user_queries.get_comments_by_id, [[req.params.id]], (error, comment_results) => {
        if (error) throw error;
        return_results = {
          "user_id": user_results[0].id,
          "email": user_results[0].email,
          "user_created": user_results[0].created_at,
          "username": user_results[0].username,
          "first_name": user_results[0].first_name,
          "last_name": user_results[0].last_name,
          "profile_image": user_results[0].profile_image,
          "birthday": user_results[0].birthday,
          "profile_description": user_results[0].profile_description,
          "post_count": photo_results.length,
          "comment_count": comment_results.length,
          "posts": photo_results,
          "comments": comment_results
        }
        return res.status(200).send(return_results)
      });
    });
  });
})


module.exports = router;