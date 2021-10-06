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

}

module.exports = my_queries