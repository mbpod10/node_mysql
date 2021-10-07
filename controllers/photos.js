const express = require('express')
const router = express.Router();
const my_queries = require('./queries')
const photo_queries = require('./photo_query')
const db = require('../databaseConfig')

router.get('/', (req, res) => {
  db.query(my_queries.all_photos, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.get('/:id', (req, res) => {
  db.query(photo_queries.find_photo_by_id, [[req.params.id]], (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.post('/create_photo', (req, res) => {
  db.query(my_queries.create_photo, [[req.body.image_url, req.body.user_id]], (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  })
})

module.exports = router