const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    first: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    roles:{student, professor, admin},
    type: String,
    required: true,
    default: roles.student,
  },
});

const PersonModel = model("user", UserSchema);

module.exports = PersonModel;
