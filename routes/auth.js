const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

const authenticateRequest = require("../authentication/middleware");

// const authenticateRequest = function(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.header(401).send("No active session");
//   } else {
//     next();
//   }
// }

router
  .post("/login", 
    passport.authenticate("local"), (req, res) => {
      res.send(req.user);
  })

  // make current user end point

  .get("/unauth", (req, res, next) => {
    res.status(401).send("Unauthorized");
  })

  .post("/logout", (req, res) => {
    if (req.user) {
      console.log(req.user);
      req.logout(function(err) {
        if (err) { return next(err) }
        res.send("Logged out!");
      });
    } else {
      res.send("No user to log out.");
    }
  })

  // Just for testing
  // .get("/users", authenticateRequest, (req, res, next) => {
  //   console.log(req.session);
  //   User.find()
  //     .exec((err, users) => {
  //       if (err) return next(err);
  //       res.status(200).send(users);
  //     });
  // })

module.exports = router;