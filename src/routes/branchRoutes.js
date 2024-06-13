const express = require("express");

const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchControllers");
const auth = require("../middlewares/auth");
const handleValidationErrors = require("../middlewares/handleValidationErrors");

const app = express.Router();

app.post("/createBranch", auth("admin"), handleValidationErrors, createBranch);
app.get("/getAllBranches", auth("admin"), handleValidationErrors, getAllBranches);
app.get("/branch/:id", auth("admin"),handleValidationErrors, getBranchById);
app.put("/updateBranch", auth("admin"),handleValidationErrors, updateBranch);
app.delete("/deleteBranch/:id", auth("admin"),handleValidationErrors, deleteBranch);

module.exports = app;
