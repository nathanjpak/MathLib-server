const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const ProblemSet = require("../models/ProblemSet");

const authenticateRequest = require("../authentication/middleware");

router
  // POST new problem set
  .post("/", authenticateRequest, async (req, res, next) => {
    const { name, userId, problems } = req.body;
    // console.dir({
    //   name: name,
    //   owner: userId,
    //   problems: problems,
    // })
    const newProblemSet = await new ProblemSet({
      name: name,
      owner: userId,
      problems: problems,      
    }).save((err, set) => {
      if (err) return next(err);
      User.findOneAndUpdate(
        { _id: userId },
        { $push: { problemSets: set._id } },
        { new: true },
        // function (err, user) {
        //   if (err) return next(err);
        //   res.status(200).send(user).end();
        // }
      )
        .populate("problemSets")
        .exec((err, user) => {
          if (err) return next(err);
          res.status(200).send({ user: user, problemSet: set }).end();
        })
      });
      // .then(() => {
      //   // if (err) return next(err);
      //   User.findByIdAndUpdate(userId, 
      //     { $push: { problemSets: newProblemSet._id }},
      //     { new: true },
      //     function (err, user) {
      //       console.log(user);
      //       if (err) return next(err);
      //       res.status(200).send(user).end();
      //     }
      //   )
      // })
  })

module.exports = router;