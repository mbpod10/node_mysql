const db = require('./databaseConfig')
const faker = require('faker');
const bcrypt = require('bcrypt');
const names = require('./names');

const DATA_NUMBER = names.length
let values = []
let photo_values = []
let comment_values = []
let profile_values = []
let add_users = "INSERT INTO users (email, username, created_at, password) VALUES ?";
let add_images = "INSERT INTO photos (image_url, user_id, created_at, caption) VALUES ?";
let add_comments = "INSERT INTO comments(content, created_at, user_id, photo_id) VALUES ?";
let add_profiles = "INSERT INTO profiles(first_name, last_name, profile_image, birthday, profile_description, user_id) VALUES ?";

const createUserData = () => {
  for (let i = 0; i <= DATA_NUMBER - 1; i++) {
    let randomEmail = `${(names[i].split(' ')[0]).toLowerCase()}${(names[i].split(' ')[1]).toLowerCase()}@gmail.com`;
    let pastDate = faker.date.past()
    let username_ = `@${(names[i].split(' ')[0]).toLowerCase()}${(names[i].split(' ')[1]).toLowerCase()}`
    values.push([randomEmail, username_, pastDate, bcrypt.hashSync('123', 10)])
    // values.push([randomEmail, pastDate, "123"])
  }
}
createUserData()
db.query(add_users, [values], (err) => {
  if (err) throw err;
})

const createPhotoData = () => {
  for (let i = 0; i <= DATA_NUMBER - 1; i++) {
    // let randomImage = faker.image.imageUrl();
    let randomImage = faker.image.image();
    let userId = Math.ceil(Math.random() * DATA_NUMBER)
    let pastDate = faker.date.past()
    let cap = faker.lorem.sentence()
    photo_values.push([randomImage, userId, pastDate, cap])
  }
}
createPhotoData()

db.query(add_images, [photo_values], (err) => {
  if (err) throw err;
})

const createCommentData = () => {
  for (let i = 0; i <= DATA_NUMBER - 1; i++) {
    let randomContent = faker.lorem.sentence();
    let pastDate = faker.date.past()
    let userId = Math.ceil(Math.random() * (DATA_NUMBER / 2))
    let photoId = Math.ceil(Math.random() * (DATA_NUMBER / 2))
    comment_values.push([randomContent, pastDate, userId, photoId])
  }
}
createCommentData()

db.query(add_comments, [comment_values], (err) => {
  if (err) throw err;
})

const createProfileData = () => {
  for (let i = 1; i <= DATA_NUMBER; i++) {
    let fname = names[i - 1].split(' ')[0]
    let lname = names[i - 1].split(' ')[1]
    let image = faker.image.avatar()
    let birthday_ = faker.date.past()
    let description = faker.lorem.sentence()
    let userId = i

    profile_values.push([fname, lname, image, birthday_, description, userId])
  }
}
createProfileData()

db.query(add_profiles, [profile_values], (err) => {
  if (err) throw err;
})

db.end(console.log("Seed Data Created"));
