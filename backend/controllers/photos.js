const express = require('express')
const router = express.Router();
const my_queries = require('./queries/user_query')
const photo_queries = require('./queries/photo_query')
const db = require('../databaseConfig')

router.get('/', (req, res) => {
  db.query(my_queries.all_photos, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.post('/create_photo', (req, res) => {
  db.query(photo_queries.create_photo, [[req.body.image_url, req.body.user_id, req.body.caption]], (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  })
})

router.get('/user/:user_id', (req, res) => {
  db.query(photo_queries.get_photos_by_user_id, [[req.params.user_id]], (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  })
})

router.get('/home_photos', (req, res) => {
  db.query(photo_queries.home_photos, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.get('/comments/:photo_id', (req, res) => {
  db.query(photo_queries.get_comments_by_photo_id, [[req.params.photo_id]], (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})
router.get('/crazy', (req, res) => {
  db.query(photo_queries.crazy, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.get('/:id', (req, res) => {
  db.query(photo_queries.find_photo_by_id, [[req.params.id]], (error, results) => {
    if (error) throw error;
    db.query(photo_queries.get_comments, [[req.params.id]], (error, comment_results) => {
      if (error) throw error;
      return_results = {
        "user_id": results[0].user_id,
        "image_url": results[0].image_url,
        "created_at": results[0].created_at,
        "username": results[0].username,
        "photo_id": results[0].id,
        "comment_count": comment_results.length,
        "comments": comment_results
      }
      return res.status(200).send(return_results)
    });
  });
})

module.exports = router