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
    created_at TIMESTAMP DEFAULT NOW(),
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


SELECT
photos.id AS image_id, 
image_url,
photos.created_at AS image_posted_at,
photos.caption,
comments.created_at AS comment_created_at,
comments.content,
users.id AS commenting_user_id,
users.username AS username

FROM photos
JOIN comments ON comments.photo_id = photos.id
JOIN users ON users.id = comments.user_id
WHERE photos.user_id = 51
