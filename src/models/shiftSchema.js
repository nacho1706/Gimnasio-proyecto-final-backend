const { Schema, model } = require("mongoose");

const ShiftSchema = new Schema({
    //nombre de la clase POR EJEMPLO: CROSSFIT
  activity: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
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
    default: Date.now,
    required: true,
    expires: '7d'  // Esto hará que el documento se elimine automáticamente después de 7 días
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

// Solo se eliminarán automáticamente los documentos si `weekly` es `false`
ShiftSchema.index({ date: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60, partialFilterExpression: { weekly: false } });


const ShiftModel = model("Shift", ShiftSchema);

module.exports = ShiftModel;
