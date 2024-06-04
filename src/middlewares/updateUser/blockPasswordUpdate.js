// Middleware para bloquear la actualización de la contraseña
const blockPasswordUpdate = (req, res, next) => {
    if (req.body.password) {
        // Si hay un intento de actualizar la contraseña, eliminarla del body
        delete req.body.password;
        // Opcionalmente, puedes enviar una respuesta indicando que la contraseña no puede ser actualizada
        return res.status(400).json({ message: 'You cant update the password from this route' });
    }
    next();
};

module.exports = { blockPasswordUpdate };
