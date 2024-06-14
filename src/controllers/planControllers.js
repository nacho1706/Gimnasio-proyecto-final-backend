const PlanModel = require("../models/planSchema"); 
const UserModel = require("../models/userSchema");

// Crear un nuevo plan
const createPlan = async (req, res) => {
  try {
    const plan = new PlanModel(req.body);
    await plan.save();
    res.status(201).json({ msg: "Plan creado exitosamente", plan });
  } catch (error) {
    console.error("Error al crear el plan:", error);
    res.status(500).json({ msg: "Error al crear el plan" });
  }
};

// Obtener todos los planes
const getAllPlans = async (req, res) => {
  try {
    const plans = await PlanModel.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    res.status(500).json({ msg: "Error al obtener los planes" });
  }
};

// Obtener un plan por su ID
const getPlanById = async (req, res) => {
  try {
    const plan = await PlanModel.findById(req.body._id);
    if (!plan) {
      return res.status(404).json({ msg: "Plan no encontrado" });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error("Error al obtener el plan:", error);
    res.status(500).json({ msg: "Error al obtener el plan" });
  }
};

// Actualizar un plan por su ID
const updatePlan = async (req, res) => {
  try {
    const plan = await PlanModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    if (!plan) {
      return res.status(404).json({ msg: "Plan no encontrado" });
    }
    res.status(200).json({ msg: "Plan actualizado exitosamente", plan });
  } catch (error) {
    console.error("Error al actualizar el plan:", error);
    res.status(500).json({ msg: "Error al actualizar el plan" });
  }
};

// Eliminar un plan por su ID
const deletePlan = async (req, res) => {
  try {
    const plan = await PlanModel.findByIdAndDelete(req.body._id);
    if (!plan) {
      return res.status(404).json({ msg: "Plan no encontrado" });
    }
    res.status(200).json({ msg: "Plan eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el plan:", error);
    res.status(500).json({ msg: "Error al eliminar el plan" });
  }
};

// Actualizar un usuario y cambiar su plan
const updateUserPlan = async (req, res) => {
    try {
      const { username, newPlanName } = req.body;
  
      // Buscar el nuevo plan por su nombre para obtener su ObjectId
      const newPlan = await PlanModel.findOne({ name: newPlanName });
      if (!newPlan) {
        return res.status(404).json({ msg: "Plan no encontrado" });
      }
  
      // Actualizar el usuario para referenciar el nuevo plan
      const user = await UserModel.findOneAndUpdate(
        { username: username }, // Condición de búsqueda
        { plan: newPlan._id },  // Actualización del campo 'plan' con el ObjectId del nuevo plan
        { new: true }           // Opción para devolver el documento actualizado
      ).select("-password -_id") // Excluir 'password' y '_id'
       .populate('plan', 'name'); // Poblamos el campo 'plan' pero solo con el campo 'name'
  
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
  
      res.status(200).json({ msg: "Usuario actualizado exitosamente", user });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ msg: "Error al actualizar el usuario" });
    }
  };

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  updateUserPlan
};
