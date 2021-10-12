DROP DATABASE IF EXISTS join_us_db;
CREATE DATABASE join_us_db;
USE join_us_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    caption VARCHAR(255),
    FOREIGN KEY(user_id) 
      REFERENCES users(id) 
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) 
      REFERENCES users(id) 
      ON DELETE CASCADE,
    photo_id INTEGER NOT NULL,
    FOREIGN KEY(photo_id) 
      REFERENCES photos(id) 
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) NOT NULL,
  birthday TIMESTAMP DEFAULT NOW(),
  profile_description VARCHAR(255), 
  user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- SELECT 
-- photos.id AS photo_id,
-- username,
-- image_url,
-- photos.created_at,
-- users.id AS user_id,
-- profile_image,
-- COUNT(comments.id) AS comments
-- FROM photos
-- JOIN users ON users.id = photos.user_id
-- JOIN profiles ON users.id = profiles.user_id
-- JOIN comments ON photos.id = comments.photo_id
-- GROUP BY comments.photo_id
-- ORDER BY photos.created_at DESC LIMIT 10;

-- SELECT * FROM comments WHERE comments.photo_id = 3;

SELECT
comments.user_id AS commenter_id,
content,
users.username 
FROM comments 
JOIN photos ON comments.photo_id = photos.id
JOIN users ON comments.user_id = users.id 
WHERE photos.id = 6;