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
      )
        .populate("problemSets")
        .exec((err, user) => {
          if (err) return next(err);
          res.status(200).send({ user: user, problemSet: set }).end();
        })
      });
  })

  // GET a problem set
  .get("/:id", async (req, res, next) => {
    const setId = req.params.id;
    ProblemSet.findById(setId)
      .exec((err, set) => {
        if (err) return next(err);
        res.status(200).send(set).end();
      })
  })

  // PUT and update a problem set
  .put("/:id", authenticateRequest, async (req, res, next) => {
    const setId = req.params.id;
    const updateQuery = {};
    if (req.body.name) updateQuery.name = req.body.name;
    if (req.body.problems) updateQuery.problems = req.body.problems;
    ProblemSet.findByIdAndUpdate(
      setId,
      updateQuery,
      { new: true }
    )
      .exec((err, set) => {
        if (err) return next(err);
        let updatedUser = null;
        if (req.body.name) {
          User.findById(req.body.userId)
            .exec((err, user) => {
              if (err) return next(err);
              res.status(200).send({ updatedSet: set, updatedUser: user });
            })
        } else {
          res.status(200).send({ updatedSet: set });
        }
      });
  })

  // DELETE a problem set
  .delete("/:id", async (req, res, next) => {
    const setId = req.params.id;
    ProblemSet.findByIdAndDelete(setId)
      .exec((err) => {
        if (err) return next(err);
        res.status(204).send();
      });
  })

module.exports = router;