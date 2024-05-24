const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  branch: {
    type: String,
    branches: ["Yerba buena"],
    default: branches[0],
  },
});

const AppointmentModel = model("Appointment", AppointmentSchema);

module.exports = PersonModel;
