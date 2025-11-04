const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fname: { type: String, require: true },
  lname: { type: String },
  email: { type: String, require: true },
  pass: { type: String, require: true },
});

module.exports = model("user", userSchema)
