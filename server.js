const db = require('./databaseConfig')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routesController = require("./controllers/routes");
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routesController);

app.set("port", process.env.PORT || 4001);
app.listen(app.get("port"), () => {
  console.log(db.config.database, `CONNECTED ON PORT: ${app.get("port")} `);
});