const express = require("express");

const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchControllers");

const app = express.Router();

app.post("/createBranch", createBranch);
app.get("/getAllBranches", getAllBranches);
app.get("/branches/", getBranchById);
app.put("/updateBranch", updateBranch);
app.delete("/branches/", deleteBranch);


module.exports = app;

