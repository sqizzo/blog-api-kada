const posts = require("../data/posts");
const attachTimestamp = require("../middleware/attachTimestamp");

exports.list = () => {
  return posts.map(({ id, title, author }) => ({
    id,
    title,
    author,
  }));
};

exports.create = (title, content, author) => {
  const newId = posts.length + 1;

  const newPost = {
    id: newId,
    timestamp: attachTimestamp(),
    newId,
    title,
    content,
    author,
  };

  posts.push(newPost);

  return newPost;
};
