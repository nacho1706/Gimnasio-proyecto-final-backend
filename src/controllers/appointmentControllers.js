const AppointmentModel = require("../models/AppointmentSchema");

// Crear una nueva cita
const createAppointment = async (req, res) => {
  try {
    const appointment = new AppointmentModel(req.body);

    await appointment.save();

    console.log("Cita creada exitosamente");
  } catch (error) {
    res.status(500).json({ msg: "Error al crear la cita" });
  }
};

const deleteAppointment = async (req, res) => {
  try {

    const appointment= await AppointmentModelModel.findByIdAndDelete(req.body.id);

    if (!branch) {
      return res.status(404).json({ msg: "Sucursal no encontrada" });
    }

    res.status(200).json({ msg: "Sucursal eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error);
    res.status(500).json({ msg: "Error al eliminar la sucursal" });
  }
};

module.exports = { createAppointment };
