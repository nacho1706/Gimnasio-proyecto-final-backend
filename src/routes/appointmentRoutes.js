const express = require("express");

const { createAppointment } = require("../controllers/appointmentControllers");
const handleValidationErrors = require("../middlewares/handleValidationErrors");

const app = express.Router();

app.post("/createAppointment", handleValidationErrors, createAppointment);

module.exports = app;
