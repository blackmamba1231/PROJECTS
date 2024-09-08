// routes/users.js

const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');
const User1 = require('../models/User');

router.get('/getUserProfile', auth, getUserProfile);
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User1.find({
        $or: [{
            username: {
                "$regex": filter
            }
        }, {
            email: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            email: user.email,
            _id: user._id
        }))
    })

})
module.exports = router;
