const AppointmentModel = require("../models/AppointmentSchema");

// Crear una nueva cita
const createAppointment = async (req, res, next) => {
  try {
    const appointment = new AppointmentModel(req.body);
    await appointment.save();

    // Poblar los campos de referencia para obtener los nombres y demás información
    const populatedAppointment = await AppointmentModel.findById(appointment._id)
    .populate('user', 'username email')
    .populate({
      path: 'shift',
      populate: [
        { path: 'activity', select: 'name' },
        { path: 'branch', select: 'name' }
      ]
    });

    // Guardar la cita poblada en res.locals para que el middleware la use
    res.locals.appointment = populatedAppointment;

    next(); // Llamar al siguiente middleware (sendAppointmentEmail)
  } catch (error) {
    console.error("Error al crear la cita:", error); // Imprimir el error en la consola
    res.status(500).json({ msg: "Error al crear la cita", error: error });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find()
      .populate("user", "name email") // Poblar el campo 'user' obteniendo los campos 'name' y 'email'
      .populate({
        path: "shift",
        populate: [
          { path: "activity", select: "name" }, // Poblar 'activity' en 'shift' obteniendo solo el campo 'name'
          { path: "branch", select: "name location" }, // Poblar 'branch' en 'shift' obteniendo los campos 'name' y 'location'
        ],
      })
      .select("-__v"); // Para que no se vea el __v

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error al obtener las citas:", error);
    res.status(500).json({ msg: "Error al obtener las citas" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(req.body._id);

    if (!branch) {
      return res
        .status(404)
        .json({ msg: "No tienes un turno registrado todavia" });
    }

    res
      .status(200)
      .json({ msg: "Turno borrado exitosamente", appointment: appointment });
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error);
    res.status(500).json({ msg: "Error al eliminar la sucursal" });
  }
};

module.exports = { createAppointment, getAllAppointments, deleteAppointment };
