var express = require("express");
var router = express.Router();
// const Posts = require("../models/posts");
const Post = require("../models/post");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validateBody");

/* GET post listing. */
router.get("/", async function (req, res, next) {
  const posts = await Post.find();
  res.status(200).json(posts);
});

router.post(
  "/",
  auth("editor"),
  validateBody(["title", "content"]),
  async function (req, res, next) {
    const { title, content, author } = req.body;

    // const newPost = Posts.create(title, content, author);
    // res.status(201).json(newPost);

    const newPost = new Post({
      title,
      content,
      timestamp: req.timestamp ?? new Date(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  }
);

router.put(
  "/:id",
  auth("editor"),
  validateBody(["title"]),
  async function (req, res, next) {
    try {
      const { id } = req.params;
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
router.delete("/:id", auth("admin"), async function (req, res, next) {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ deletedPost });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
