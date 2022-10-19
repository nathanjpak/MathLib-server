const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");
require("dotenv").config();

const userRoutes = require("./routes/users");

// const User = require("./models/User");

const app = express();
const port = 5000;

connectDb();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use("/users", userRoutes);

// const testUser = new User({ username: "testUser", password: "bananas", email: "testmail@testsite.com" });
// testUser.save();

module.exports = app.listen(port, () => {
  console.log(`Node is listening on port ${port}`);
});
