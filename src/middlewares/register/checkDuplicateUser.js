const UserModel = require('../../models/userSchema');

const checkDuplicateUser = async (req, res, next) => {
  const { username, email, phone_number } = req.body;

  try {
    const query = {
      $or: [
        { username },
        { email },
      ]
    };

    // Agrega el telefono al Query SOLO SI no es null (valor por defecto definido en el userModel)
    if (phone_number !== null) {
      query.$or.push({ phone_number });
    }
    console.log(query);
    const existingUser = await UserModel.findOne(query).exec();

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
      if (phone_number !== null && existingUser.phone_number === phone_number) {
        return res.status(400).json({ error: 'Phone number is already in use' });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = checkDuplicateUser;
