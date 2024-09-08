// controllers/commentController.js

const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const {postid} = req.query;

  try {
    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      user: req.user.id,
      text,
      date: new Date(),
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
