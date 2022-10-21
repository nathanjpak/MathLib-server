const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const ProblemSetSchema = require("./ProblemSet")

const UserSchema = new Schema({
  username: {type: String, required: false, unique: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: false },
  problemSets: [{ type: Schema.Types.ObjectId, ref: "ProblemSet" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "ProblemSet" }],
  password: { type: String, required: true },
});

UserSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

UserSchema.methods = {
  verifyPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: function (plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

UserSchema.pre("save", function(next) {
  if (this.password) { this.password = this.hashPassword(this.password) }
  next();
});

module.exports = mongoose.model("User", UserSchema);
