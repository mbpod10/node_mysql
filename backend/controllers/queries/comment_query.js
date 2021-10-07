const comments_query = {
  get_all_comments:
    `SELECT * FROM comments`,
  post_comment:
    `INSERT INTO comments(content, user_id, photo_id) VALUES (?)`
}

module.exports = comments_query