// routes/comments.js

const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');

// @route   POST /api/posts/:postId/comments
// @desc    Add a comment to a post
// @access  Private
router.post('/comment', auth, addComment);

module.exports = router;
