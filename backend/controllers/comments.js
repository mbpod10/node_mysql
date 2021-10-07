const express = require('express')
const router = express.Router();
const db = require('../databaseConfig')
const comments_query = require("./queries/comment_query")

router.get('/', (req, res) => {
  db.query(comments_query.get_all_comments, (error, results) => {
    if (error) throw error;
    return res.status(200).send(results)
  });
})

router.post('/post_comment', (req, res) => {
  db.query(comments_query.post_comment, [[req.body.content, req.body.user_id, req.body.photo_id]], (error, results) => {
    if (error) throw error;
    return res.status(201).send({ "message": "comment created" })
  });
})

module.exports = router