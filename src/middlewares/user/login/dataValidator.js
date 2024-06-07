const UserModel = require("../../../models/userSchema");
const bcrypt = require("bcrypt");

const loginValidator = async (req, res, next) => {

    const { username, password } = req.body;

    try {

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Username or password incorrect.' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Username or password incorrect.' });
        }

        // Si la contraseña es correcta, continuar con el siguiente middleware
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server internal error.');
    }
};

module.exports = {
  loginValidator,
};
