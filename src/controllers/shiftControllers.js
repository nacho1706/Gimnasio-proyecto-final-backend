const ShiftModel = require("../models/shiftSchema");

// Crear un nuevo turno/clase
const createShift = async (req, res) => {
  try {
    const shift = new ShiftModel(req.body);
    await shift.save();

    // Popula las referencias para obtener los nombres en lugar de los IDs
    const populatedShift = await ShiftModel.findById(shift._id)
      .populate("activity", "name") // Popula el campo 'activity' y solo obtiene el campo 'name'
      .populate("branch", "name"); // Popula el campo 'branch' y solo obtiene el campo 'name'

    res.status(201).json({ msg: "Turno creado exitosamente", populatedShift });
  } catch (error) {
    console.error("Error al crear el turno:", error);
    res.status(500).json({ msg: "Error al crear el turno" });
  }
};

// Obtener todos los turnos/clases
const getAllShifts = async (req, res) => {
  try {
    const numeroPagina = req.query.numeroPagina || 0;
    const limite = req.query.limite || 8;

    const [shifts, count] = await Promise.all([
      ShiftModel.find()
        .populate("activity", "name")
        .populate("branch", "name")
        .skip(numeroPagina * limite)
        .limit(limite),
      ShiftModel.countDocuments(),
    ]);
    res.status(200).json(shifts, count, limite);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ msg: "Error al obtener los turnos" });
  }
};

// Obtener un turno/clase por su ID
const getShiftById = async (req, res) => {
  try {
    const shift = await ShiftModel.findById(req.body._id)
      .populate("activity", "name")
      .populate("branch", "name");
    if (!shift) {
      return res.status(404).json({ msg: "Turno no encontrado" });
    }
    res.status(200).json(shift);
  } catch (error) {
    console.error("Error al obtener el turno:", error);
    res.status(500).json({ msg: "Error al obtener el turno" });
  }
};

// Actualizar un turno/clase por su ID
const updateShift = async (req, res) => {
  try {
    const shift = await ShiftModel.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    })
      .populate("activity", "name")
      .populate("branch", "name");
    if (!shift) {
      return res.status(404).json({ msg: "Turno no encontrado" });
    }
    res.status(200).json({ msg: "Turno actualizado exitosamente", shift });
  } catch (error) {
    console.error("Error al actualizar el turno:", error);
    res.status(500).json({ msg: "Error al actualizar el turno" });
  }
};

// Eliminar un turno/clase por su ID
const deleteShift = async (req, res) => {
  try {
    const shift = await ShiftModel.findByIdAndDelete(req.params._id);
    if (!shift) {
      return res.status(404).json({ msg: "Turno no encontrado" });
    }
    res.status(200).json({ msg: "Turno eliminado exitosamente", shift });
  } catch (error) {
    console.error("Error al eliminar el turno:", error);
    res.status(500).json({ msg: "Error al eliminar el turno" });
  }
};

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};
