const ActivityModel = require("../models/activitySchema");

// Crear una nueva actividad
const createActivity = async (req, res) => {
  try {
    const activity = new ActivityModel(req.body);
    await activity.save();
    res.status(201).json({ msg: "Actividad creada exitosamente", activity });
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    res.status(500).json({ msg: "Error al crear la actividad" });
  }
};

// Obtener todas las actividades
const getAllActivities = async (req, res) => {
  try {
    const activities = await ActivityModel.find().populate('trainer', 'name'); // Asumiendo que el modelo User tiene un campo 'name'
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    res.status(500).json({ msg: "Error al obtener las actividades" });
  }
};

// Obtener una actividad por su ID
const getActivityById = async (req, res) => {
  try {
    const activity = await ActivityModel.findById(req.body._id).populate('trainer', 'name');
    if (!activity) {
      return res.status(404).json({ msg: "Actividad no encontrada" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error al obtener la actividad:", error);
    res.status(500).json({ msg: "Error al obtener la actividad" });
  }
};

// Actualizar una actividad por su ID
const updateActivity = async (req, res) => {
  try {
    const activity = await ActivityModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    ).populate('trainer', 'name');
    if (!activity) {
      return res.status(404).json({ msg: "Actividad no encontrada" });
    }
    res.status(200).json({ msg: "Actividad actualizada exitosamente", activity });
  } catch (error) {
    console.error("Error al actualizar la actividad:", error);
    res.status(500).json({ msg: "Error al actualizar la actividad" });
  }
};

// Eliminar una actividad por su ID
const deleteActivity = async (req, res) => {
  try {
    const activity = await ActivityModel.findByIdAndDelete(req.body._id);
    if (!activity) {
      return res.status(404).json({ msg: "Actividad no encontrada" });
    }
    res.status(200).json({ msg: "Actividad eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la actividad:", error);
    res.status(500).json({ msg: "Error al eliminar la actividad" });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
