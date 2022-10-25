const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User");

const ProblemSetSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  favorites: [{type: Schema.Types.ObjectId, ref: "User" }],
  problems: [],
});

module.exports = mongoose.model("ProblemSet", ProblemSetSchema);
