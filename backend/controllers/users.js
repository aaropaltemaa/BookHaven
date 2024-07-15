const User = require("../models/user");
const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();

usersRouter.post("/", async (request, response) => {
  const { username, name, email, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("books", {
    title: 1,
    author: 1,
    description: 1,
    genre: 1,
    pages: 1,
    publisher: 1,
    read: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
