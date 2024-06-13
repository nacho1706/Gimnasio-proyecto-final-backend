const express = require("express");

const {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
} = require("../controllers/appointmentControllers");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const auth = require("../middlewares/auth");
const sendAppointmentEmail = require("../middlewares/appointment/appointmentMailSuccess");

const app = express.Router();

app.post(
  "/createAppointment",
  auth(["admin", "professor", "user"]),
  handleValidationErrors,
  createAppointment,
  sendAppointmentEmail,
  (req, res) => {
    res.status(201).json({ msg: "Cita creada exitosamente", appointment: res.locals.appointment });
  }
);
app.delete(
  "/deleteAppointment",
  auth(["admin", "professor", "user"]),
  handleValidationErrors,
  deleteAppointment
);

app.get(
  "/getAllAppointments",
  auth(["admin", "professor"]),
  handleValidationErrors,
  getAllAppointments
);

module.exports = app;
