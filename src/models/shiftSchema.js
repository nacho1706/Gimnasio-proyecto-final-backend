const { Schema, model } = require("mongoose");

const ShiftSchema = new Schema({
    //nombre de la clase POR EJEMPLO: CROSSFIT
  className: {
    type: Schema.Types.ObjectId,
    ref: "ClassName",
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  weekly: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch", // Referencia a la colección Branch
    required: true,
  },
});

const ShiftModel = model("Shift", ShiftSchema);

module.exports = ShiftModel;
