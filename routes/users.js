const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ProblemSet = require("../models/ProblemSet");

const authenticateRequest = require("../authentication/middleware");

router
  // GET all users
  .get("/", authenticateRequest, (req, res, next) => {
    User.find()
      .exec((err, users) => {
        if (err) return next(err);
        res.status(200).send(users);
      });
  })

  // GET current user
  .get("/current", authenticateRequest, (req, res, next) => {
    const currentUser = req.user;
    res.status(200).send(currentUser);
  })

  // POST sign up
  .post("/new", (req, res, next) => {
    const {username, email, password} = req.body;
    console.log(username, email, password);
    // validation
    User.findOne({ $or: [{ username: username }, { email: email }] })
      .exec((err, user) => {
        if (err) return next(err);
        if (user) res.status(403).send("An account with that username or email already exists.").end();
        const newUser = new User({
          username: username,
          email: email,
          password: password,
        });
        newUser.save((err, savedUser) => {
          if (err) return next(err);
          res.status(200).send(savedUser);
        });
      }) 
  })

module.exports = router;
