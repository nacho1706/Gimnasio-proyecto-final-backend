const { Schema, model, mongoose } = require("mongoose");


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
    match: [/^\d+$/],
    required: true,
  },
  
  role: {
    type: String,
    enum: ["student", "professor", "admin"],
    default: "student",
  },

  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
  },

  enabled: {
    type: Boolean,
    default: true,
  },

  pfp: {
    type: String,
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
