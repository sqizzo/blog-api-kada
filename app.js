var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("./middleware/logger");
var errorHandler = require("./middleware/errorHandler");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use((err, req, res, next) => {
  res.status(err.status);
  res.json(errorHandler(err.message));
});

module.exports = app;
