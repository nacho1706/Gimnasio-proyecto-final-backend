const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityControllers");

const app = express.Router();

app.post("/createActivity", createActivity);
app.get("/getAllActivities", getAllActivities);
app.post("/getActivity", getActivityById);
app.put("/updateActivity", updateActivity);
app.delete("/deleteActivity", deleteActivity);

module.exports = app;
