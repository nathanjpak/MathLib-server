const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ProblemSet = require("../models/ProblemSet");

router
  // GET all users
  .get("/", (req, res, next) => {
    User.find()
      .exec((err, users) => {
        if (err) return next(err);
        res.status(200).send(users);
      });
  })

module.exports = router;
