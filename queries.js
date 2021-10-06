const my_queries = {
  all_users:
    `SELECT users.id AS user_id, 
    email, image_url, 
    photos.id AS photo_id 
    FROM users
    RIGHT JOIN 
    photos 
    ON users.id = photos.user_id`,
  all_photos:
    `SELECT * FROM photos`,
  all_users_2:
    `SELECT email, 
    users.id AS user_id, 
    COUNT(photos.user_id) AS post_count
    FROM photos
    RIGHT JOIN users 
    ON users.id = photos.user_id
    GROUP BY users.id`
}

module.exports = my_queries