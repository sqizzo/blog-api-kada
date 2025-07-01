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
    res.send(201).json(newPost);
  }
);

module.exports = router;
