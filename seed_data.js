const db = require('./databaseConfig')
const faker = require('faker');

const DATA_NUMBER = 250
let values = []
let users_count = null
let photo_values = []
let add_users = "INSERT INTO users (email, created_at) VALUES ?";
let add_images = "INSERT INTO photos (image_url, user_id, created_at) VALUES ?";

const createUserData = () => {
  for (let i = 0; i <= DATA_NUMBER; i++) {
    let randomEmail = faker.internet.email();
    let pastDate = faker.date.past()
    values.push([randomEmail, pastDate])
  }
}
createUserData()
db.query(add_users, [values], (err) => {
  if (err) throw err;
})

const createPhotoData = () => {
  for (let i = 0; i <= DATA_NUMBER - 1; i++) {
    let randomImage = faker.image.imageUrl();
    let userId = Math.ceil(Math.random() * DATA_NUMBER)
    let pastDate = faker.date.past()
    photo_values.push([randomImage, userId, pastDate])
  }
}
createPhotoData()
db.query(add_images, [photo_values], (err) => {
  if (err) throw err;
})

db.end();
