const { Schema, model } = require("mongoose");

const BranchSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Asegúrate de que el nombre de la sucursal sea único
  },
  address: {
    type: String,
    required: true,
  },
  // Otros campos relevantes para una sucursal
});

const BranchModel = model("Branch", BranchSchema);

module.exports = BranchModel;
