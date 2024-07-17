const User = require("../models/user");
const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();

usersRouter.post("/", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("books", {
    title: 1,
    author: 1,
    genre: 1,
    publishedDate: 1,
    description: 1,
    isbn: 1,
    pageCount: 1,
    coverImage: 1,
  });
  res.json(users);
});

module.exports = usersRouter;
