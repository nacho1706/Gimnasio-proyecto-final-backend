const AppointmentModel = require("../models/AppointmentSchema");

// Crear una nueva cita
const createAppointment = async (req, res) => {
  try {
    const appointment = new AppointmentModel(req.body);

    await appointment.save();

    res.status(201).json({ msg: "Turno creadoe exitosamente", appointment: appointment })
  } catch (error) {
    res.status(500).json({ msg: "Error al crear la cita" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(
      req.body._id
    );

    if (!branch) {
      return res.status(404).json({ msg: "No tienes un turno registrado todavia" });
    }

    res.status(200).json({ msg: "Turno borrado exitosamente", appointment: appointment});
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error);
    res.status(500).json({ msg: "Error al eliminar la sucursal" });
  }
};

module.exports = { createAppointment, deleteAppointment };
