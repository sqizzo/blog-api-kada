require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("./middleware/logger");
var errorHandler = require("./middleware/errorHandler");

// Connect mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => {
    console.log("Connection to MongoDB failed with:", err);
  });

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
  const statusCode = err.status || 500;
  res.status(statusCode).json(errorHandler(err.message));
});

module.exports = app;
