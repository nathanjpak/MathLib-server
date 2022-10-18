const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const ProblemSetSchema = require("./ProblemSet")

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: false },
  problemSets: [{ type: Schema.Types.ObjectId, ref: "ProblemSet" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "ProblemSet" }],
  password: { type: String, required: true},
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

UserSchema.methods.validPassword = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
