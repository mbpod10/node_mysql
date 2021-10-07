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


-- SELECT * FROM comments WHERE comments.user_id = 101;