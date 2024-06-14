const express = require("express");
const app = express.Router();
const {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan,
    updateUserPlan
} = require("../controllers/planControllers");
const auth = require("../middlewares/auth");
const handleValidationErrors = require("../middlewares/handleValidationErrors");

app.post('/createPlan',auth("admin"), handleValidationErrors, createPlan);
app.get('/getAllPlans', auth("admin"), handleValidationErrors, getAllPlans);
app.post('/getPlan', auth("admin"), handleValidationErrors, getPlanById); // Usamos POST para recibir el ID en el body
app.put('/updatePlan', auth("admin"), handleValidationErrors, updatePlan); // Actualización usando el body
app.delete('/deletePlan', auth("admin"), handleValidationErrors, deletePlan); // Eliminación usando el body

module.exports = app;