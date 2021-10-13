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

-- SELECT
-- *
-- FROM comments
-- JOIN photos ON photos.id = comments.photo_id
-- RIGHT JOIN users
-- ON users.id = photos.user_id
-- WHERE comments.user_id = 8;

-- SELECT
-- users.username,
-- comments.created_at,
-- comments.content
-- FROM comments
-- JOIN photos ON photos.id = comments.photo_id
-- RIGHT JOIN users
-- ON users.id = photos.user_id
-- WHERE comments.user_id = 8;

-- SELECT * FROM comments WHERE comments.user_id = 8;

INSERT INTO comments(content, user_id, photo_id)
VALUES ('HEYYYYYYY', 1, 20);