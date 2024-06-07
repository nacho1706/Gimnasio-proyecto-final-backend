const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  
  first_name: String,

  last_name: String,

  phone_number: {
    type: String,
    sparse: true, // Permite valores null y evita problemas de duplicidad
    default: null,
  },
  
  role: {
    type: String,
    default: "student", // Roles [student, professor, admin]
  },

  enabled: {
    type: Boolean,
    default: true,
  },

  pfp: {
    type: String,
  },
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
