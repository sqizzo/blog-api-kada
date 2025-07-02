const posts = require("../data/posts");
const attachTimestamp = require("../middleware/attachTimestamp");
const { post } = require("../routes");

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
    title,
    content,
    author,
  };

  posts.push(newPost);

  return newPost;
};

exports.edit = (id, title, content, author) => {
  const postIndex = posts.findIndex((post) => post.id === Number(id));

  if (postIndex === -1) {
    throw new Error("Post not found");
  }

  posts[postIndex].title = title ? title : posts[postIndex].title;
  posts[postIndex].content = content ? content : posts[postIndex].content;
  posts[postIndex].author = author ? author : posts[postIndex].author;

  return posts[postIndex];
};

exports.delete = (id) => {
  const postIndex = posts.findIndex((post) => post.id === Number(id));

  if (postIndex === -1) {
    const err = new Error("Post was not found");
    err.status = 401;
    throw err;
  }

  const deletedPost = posts[postIndex];
  posts.splice(postIndex, 1);

  return deletedPost;
};
