const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");

const passport = require("./authentication/passport");

const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const User = require("./models/User");

const keys = require("./config/keys");

const app = express().use("*", cors({
  origin: ["http://localhost:3000", "https://mathlib.onrender.com"],
  credentials: true,
  preflightContinue: true,
}));
app.options("*", function(req, res) { res.sendStatus(200) });
const port = 5000;

connectDb();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// sessions
app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: keys.MONGODB_URI,
    }),
  })
)

// authentication stuff
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// const testUser = new User({ username: "testUser", password: "bananas", email: "testmail@testsite.com" });
// testUser.save();

module.exports = app.listen(port, () => {
  console.log(`Node is listening on port ${port}`);
});
