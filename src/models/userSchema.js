const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    first_name: String,
    last_name: String,
  },
  role: {
    type: String,
    default: "student",
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  pfp: {
    type: String,
  },
});

const UserModel = model("user", userSchema);

module.exports = UserModel;
