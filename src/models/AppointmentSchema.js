
const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shift: {
    type: Schema.Types.ObjectId,
    ref: "Shift",
    required: true,
  }
});

const AppointmentModel = model("Appointment", AppointmentSchema);

module.exports = AppointmentModel;
