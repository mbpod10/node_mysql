const db = require('./databaseConfig')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const usersController = require("./controllers/users");
const photosController = require("./controllers/photos")
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", usersController);
app.use("/photos", photosController);

app.set("port", process.env.PORT || 4001);
app.listen(app.get("port"), () => {
  console.log(db.config.database, `CONNECTED ON PORT: ${app.get("port")} `);
  console.log(`http://localhost:${app.get("port")}`)
});