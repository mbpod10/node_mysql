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

-- INSERT INTO profiles(first_name, last_name, profile_image, birthday, profile_description, user_id) 
-- VALUES ("brock", "pod", "dasdfasdfasdf", "2021-09-22", "I love it", 1);