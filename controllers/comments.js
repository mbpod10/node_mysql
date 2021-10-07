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

module.exports = router