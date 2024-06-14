const express = require("express");
const app = express.Router();
const {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift
} = require("../controllers/shiftControllers");
const auth = require("../middlewares/auth");
const handleValidationErrors = require("../middlewares/handleValidationErrors");

app.post("/createShift" ,auth("admin"), handleValidationErrors, createShift);
app.get("/getAllShifts", auth("admin"), handleValidationErrors, getAllShifts);
app.post("/getShift", auth("admin"), handleValidationErrors, getShiftById);
app.put("/updateShift", auth("admin"), handleValidationErrors, updateShift);
app.delete("/deleteShift", auth("admin"), handleValidationErrors, deleteShift);

module.exports = app;
