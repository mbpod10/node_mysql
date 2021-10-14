const my_queries = {
  all_photos:
    `SELECT * FROM photos`,
  all_users:
    `SELECT email, 
    users.id AS user_id, 
    COUNT(photos.user_id) AS post_count,
    username,
    password
    FROM photos
    RIGHT JOIN users 
    ON users.id = photos.user_id
    GROUP BY users.id`,
  find_user:
    `SELECT * FROM users WHERE email= (?)`,
  create_user:
    "INSERT INTO users (email, username, password) VALUES (?)",
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
    JOIN profiles ON users.id = profiles.user_id
    WHERE users.id = (?)`,
  get_comments_by_id:
    `SELECT
    users.username,
    users.id,
    photos.id AS photo_id,
    comments.created_at,
    comments.content
    FROM comments
    JOIN photos ON photos.id = comments.photo_id
    RIGHT JOIN users
    ON users.id = photos.user_id
    WHERE comments.user_id = (?);
    `,
  // get_comments_by_id:
  //   `SELECT * FROM comments WHERE comments.user_id = (?)`,
  join_user_and_profile:
    `SELECT * FROM users JOIN profiles ON users.id = profiles.user_id`,
  created_profile:
    `INSERT INTO profiles (first_name, last_name, profile_image, profile_description, user_id) VALUES (?)`
}

module.exports = my_queries