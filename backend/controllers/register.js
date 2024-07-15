const bcrypt = require("bcryptjs");
const registerRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

registerRouter.post("/", async (request, response) => {
  const { username, name, email, password } = request.body;

  if (!password || !username || !email) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: "Username already exists" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(201)
    .json({ token, username: savedUser.username, id: savedUser._id });
});

module.exports = registerRouter;
