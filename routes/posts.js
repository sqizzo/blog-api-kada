var express = require("express");
var router = express.Router();
const Posts = require("../models/posts");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validateBody");

/* GET post listing. */
router.get("/", function (req, res, next) {
  res.status(200).json(Posts.list());
});

router.post(
  "/",
  auth("editor"),
  validateBody(["title", "content"]),
  function (req, res, next) {
    const { title, content, author } = req.body;

    const newPost = Posts.create(title, content, author);
    res.status(201).json(newPost);
  }
);

router.put(
  "/:id",
  auth("editor"),
  validateBody(["title"]),
  function (req, res, next) {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const editedPost = Posts.edit(id, title, content, author);
    res.status(200).json(editedPost);
  }
);

router.delete("/:id", auth("admin"), function (req, res, next) {
  const { id } = req.params;

  const deletedPost = Posts.delete(id);
  res.status(200).json(deletedPost);
});

module.exports = router;
