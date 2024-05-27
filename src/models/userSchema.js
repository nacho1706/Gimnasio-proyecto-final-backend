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
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  
  first_name: String,

  last_name: String,

  phone_number: {
    type: String,
    sparse: true, // Permite valores null y evita problemas de duplicidad
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

const UserModel = model("user", UserSchema);

module.exports = UserModel;
