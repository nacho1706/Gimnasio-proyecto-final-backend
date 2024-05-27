const UserModel = require('../models/userSchema');

const checkDuplicateUser = async (req, res, next) => {
  const { username, email, phone_number } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [
        { username },
        { email },
        { phone_number: phone_number || null } // Evitar duplicados de phone_number cuando no es null
      ]
    });

    if (existingUser) {
      // Determina qué campo está duplicado
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
      if (existingUser.phone_number === phone_number) {
        return res.status(400).json({ error: 'Phone number is already in use' });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = checkDuplicateUser;
