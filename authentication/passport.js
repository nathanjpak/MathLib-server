const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, { _id: user._id });
})

passport.deserializeUser((id, done) => {
  User.findOne(
    { _id: id },
    "-password",
    // "username",
    (err, user) => {
      done(null, user)
    }
  )
})

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = passport;
