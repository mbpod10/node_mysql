let mysql = require('mysql');
const faker = require('faker');

const DATA_NUMBER = 500

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Python1/',
  database: 'join_us_db'
});

let values = []
let users_count = null
const createUserData = () => {
  for (let i = 0; i <= DATA_NUMBER; i++) {
    let randomEmail = faker.internet.email();
    let pastDate = faker.date.past()
    values.push([randomEmail, pastDate])
  }
}
createUserData()

let add_users = "INSERT INTO users (email, created_at) VALUES ?";
let add_images = "INSERT INTO photos (image_url, user_id, created_at) VALUES ?";
// let add_images = "INSERT INTO photos SET ?";


connection.query(add_users, [values], (err) => {
  if (err) throw err;
  // connection.end();
})

let photo_values = []

const createPhotoData = () => {
  for (let i = 0; i <= DATA_NUMBER - 1; i++) {
    let randomImage = faker.image.imageUrl();
    let userId = Math.ceil(Math.random() * DATA_NUMBER)
    let pastDate = faker.date.past()
    photo_values.push([randomImage, userId, pastDate])
  }
}
createPhotoData()

connection.query(add_images, [photo_values], (err) => {
  if (err) throw err;
})

// for (var i = 0; i < 500; i++) {
//   var photo = {
//     image_url: faker.image.imageUrl(),
//     user_id_: Math.ceil(Math.random() * 49),
//     created_at: faker.date.past()
//   };
//   var end_result = connection.query("INSERT INTO photos SET ?", photo, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// }
connection.end();
