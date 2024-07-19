const User = require("../models/user");
const Book = require("../models/book");
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

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("books", {
    title: 1,
    author: 1,
    genre: 1,
    publishedDate: 1,
    description: 1,
    isbn: 1,
    pageCount: 1,
    coverImage: 1,
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.get("/:id/books", async (req, res) => {
  const user = await User.findById(req.params.id).populate("books", {
    title: 1,
    author: 1,
    genre: 1,
    publishedDate: 1,
    description: 1,
    isbn: 1,
    pageCount: 1,
    coverImage: 1,
  });
  if (user) {
    res.json(user.books);
  } else {
    res.status(404).end();
  }
});

usersRouter.get("/:id/books/:bookId", async (req, res) => {
  const user = await User.findById(req.params.id);
  const book = user.books.find((book) => book.id === req.params.bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).end();
  }
});

usersRouter.post("/:id/books", async (req, res) => {
  const { bookId, status } = req.body;

  const user = await User.findById(req.params.id);
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ error: "book not found" });
  }

  // Create a new object that includes all book properties and the status
  const bookEntry = {
    book: book.toJSON(), // Convert the Mongoose document to a plain JavaScript object
    status,
  };

  user.books = user.books.concat(bookEntry);
  await user.save();
  res.status(201).json(user);
});

module.exports = usersRouter;
