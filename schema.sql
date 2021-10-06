DROP DATABASE IF EXISTS join_us_db;
CREATE DATABASE join_us_db;
USE join_us_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) 
      REFERENCES users(id) 
      ON DELETE CASCADE
);


-- SELECT email, 
-- users.id AS user_id, 
-- COUNT(photos.user_id) AS post_count
-- FROM photos
-- RIGHT JOIN users 
-- ON users.id = photos.user_id
-- GROUP BY users.id;