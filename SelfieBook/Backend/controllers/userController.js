// controllers/userController.js

const User1 = require('../models/User');

exports.getUserProfile = async  (req, res) => {
  const { id } = req.query;
  console.log(`Received request for user ID: ${id}`);
  try {
    const user = await User1.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
