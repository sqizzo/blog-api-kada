const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = require("../models/post");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validateBody");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* GET all posts */
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

/* CREATE a new post */
router.post(
  "/",
  auth("editor"),
  validateBody(["title", "content"]),
  async (req, res, next) => {
    try {
      const { title, content, author } = req.body;

      const newPost = new Post({
        title,
        content,
        author,
        timestamp: req.timestamp ?? new Date(),
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

/* UPDATE a post */
router.put(
  "/:id",
  auth("editor"),
  validateBody(["title"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }

      const { title, content, author } = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          content,
          author,
          timestamp: req.timestamp ?? new Date(),
        },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
);

/* DELETE a post */
router.delete("/:id", auth("admin"), async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ deleted: post });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
