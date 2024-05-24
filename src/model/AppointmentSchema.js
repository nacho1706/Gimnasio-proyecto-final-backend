const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  branch: {
    type: String,
    branches: ["Yerba buena", "San Miguel", "Tafi Viejo"],
  }
});


const AppointmentModel = model("Appointment", AppointmentSchema);

module.exports = PersonModel;
