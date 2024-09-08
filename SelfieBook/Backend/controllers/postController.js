// controllers/postController.js

const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { text, image } = req.body;

  try {
    const newPost = new Post({
      user: req.user.id,
      text,
      image,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
