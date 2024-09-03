const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  interest: {
    type: Array,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "none",
  },
  gender: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: Number,
    default: null,
  },
  location: {
    type: String,
    default: "N/A",
  },
  age: {
    type: String,
    default: "N/A",
  },
  blockedUsers: {
    type: Array,
    default: null,
  },
  blockedBy: {
    type: Array,
    default: null,
  },
  crown: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: String,
    default: moment().format("LLL"),
  },
});

userSchema.index({ username: "text", email: "text" });

module.exports = mongoose.model("UserDetails", userSchema);
