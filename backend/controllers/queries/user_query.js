const my_queries = {
  all_photos:
    `SELECT * FROM photos`,
  all_users:
    `SELECT email, 
    users.id AS user_id, 
    COUNT(photos.user_id) AS post_count,
    password
    FROM photos
    RIGHT JOIN users 
    ON users.id = photos.user_id
    GROUP BY users.id`,
  find_user:
    `SELECT * FROM users WHERE email= (?)`,
  create_user:
    "INSERT INTO users (email, password) VALUES (?)",
  create_photo:
    "INSERT INTO photos (image_url, user_id) VALUES (?)",
  find_user_by_id:
    `SELECT 
    photos.id AS image_id, 
    image_url, 
    photos.created_at 
    FROM users
    JOIN photos ON users.id = photos.user_id
    WHERE users.id = (?)`,
  find_user_by_id_sub:
    `SELECT * FROM users
    WHERE users.id = (?)`,
  get_comments_by_id:
    `SELECT * FROM comments WHERE comments.user_id = (?)`

}

module.exports = my_queries