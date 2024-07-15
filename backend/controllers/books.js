const bookRouter = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

bookRouter.get("/", async (request, response) => {
  const books = await Book.find({}).populate("user", { username: 1, name: 1 });
  response.json(books);
});

bookRouter.get("/:id", async (request, response) => {
  const book = await Book.findById(request.params.id);
  if (book) {
    response.json(book);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

bookRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!body.title || !body.author) {
    return response.status(400).json({ error: "title or author missing" });
  }

  const user = await User.findById(decodedToken.id);

  const book = new Book({
    title: body.title,
    author: body.author,
    description: body.description,
    genre: body.genre,
    pages: body.pages,
    publisher: body.publisher,
    read: body.read,
    user: user._id,
  });

  try {
    const savedBook = await book.save();
    user.books = user.books.concat(savedBook._id);
    await user.save();
    response.json(savedBook);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

bookRouter.delete("/:id", async (request, response) => {
  const book = await Book.findById(request.params.id);
  if (!book) {
    return response.status(404).json({ error: "book not found" });
  }

  await Book.findByIdAndDelete(request.params.id);
  await User.updateOne({ _id: book.user }, { $pull: { books: book._id } });

  response.status(204).end();
});

bookRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const book = {
    title: body.title,
    author: body.author,
    description: body.description,
    genre: body.genre,
    pages: body.pages,
    publisher: body.publisher,
    read: body.read,
  };

  const updatedBook = await Book.findByIdAndUpdate(request.params.id, book, {
    new: true,
  });
  response.json(updatedBook);
});

module.exports = bookRouter;
