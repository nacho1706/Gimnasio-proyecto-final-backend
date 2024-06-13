const BranchModel = require("../models/branchSchema");

// Crear una nueva cita
const createBranch = async (req, res) => {
  try {
    const branch = new BranchModel(req.body);
    await branch.save();
    res.status(201).json({ msg: "Sucursal creada exitosamente", branch });
  } catch (error) {
    console.error("Error al crear la sucursal:", error);
    res.status(500).json({ msg: "Error al crear la sucursal" });
  }
};

// Obtener todas las sucursales (Read - Get All)
const getAllBranches = async (req, res) => {
  try {
    const branches = await BranchModel.find();
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error al obtener las sucursales:", error);
    res.status(500).json({ msg: "Error al obtener las sucursales" });
  }
};

// Obtener una sucursal por su ID (Read - Get One) |||||BODY
const getBranchById = async (req, res) => {
  try {
    const branch = await BranchModel.findById(req.body._id);
    if (!branch) {
      return res.status(404).json({ msg: "Sucursal no encontrada" });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error("Error al obtener la sucursal:", error);
    res.status(500).json({ msg: "Error al obtener la sucursal" });
  }
};

// Actualizar una sucursal por su ID (Update) ||||||BODY
const updateBranch = async (req, res) => {
  try {
    const branch = await BranchModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    if (!branch) {
      return res.status(404).json({ msg: "Sucursal no encontrada" });
    }
    res.status(200).json({ msg: "Sucursal actualizada exitosamente", branch });
  } catch (error) {
    console.error("Error al actualizar la sucursal:", error);
    res.status(500).json({ msg: "Error al actualizar la sucursal" });
  }
};

// Eliminar una sucursal por su ID (Delete)  |||||BODY
const deleteBranch = async (req, res) => {
  try {
    const branch = await BranchModel.findByIdAndDelete(req.body._id);
    if (!branch) {
      return res.status(404).json({ msg: "Sucursal no encontrada" });
    }
    res.status(200).json({ msg: "Sucursal eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error);
    res.status(500).json({ msg: "Error al eliminar la sucursal" });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
