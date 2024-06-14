const { Schema, model } = require("mongoose");

const PlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  // Descripción opcional del plan
  description: {
    type: String,
    required: true,
  },

  // Precio del plan, si es aplicable
  price: {
    type: Number,
    required: true,
  },
  
  features: [String], // Lista de características del plan
});

const PlanModel = model("Plan", PlanSchema);

module.exports = PlanModel;
