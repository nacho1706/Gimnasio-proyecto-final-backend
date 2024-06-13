const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityControllers");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const auth = require("../middlewares/auth");

const app = express.Router();

app.post("/createActivity", auth("admin"), handleValidationErrors, createActivity);
app.get("/getAllActivities", auth("admin"), handleValidationErrors, getAllActivities);
app.post("/getActivity", auth("admin"), handleValidationErrors, getActivityById);
app.put("/updateActivity", auth("admin"), handleValidationErrors, updateActivity);
app.delete("/deleteActivity", auth("admin"), handleValidationErrors, deleteActivity);

module.exports = app;
