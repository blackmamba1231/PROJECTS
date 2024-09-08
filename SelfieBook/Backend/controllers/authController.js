// controllers/authController.js

const User1 = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jWT_Secret  = require('../config');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User1.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User1({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const Id = user.id;

    const payload = {
      user: {
        id: user.id,
      },
    };
   
    jwt.sign(
      payload,
      jWT_Secret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({success: true, token, Id});
      }
    );
  } catch (err) {
    console.log("Errorrrrrrr");
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User1.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      jWT_Secret,
      
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
