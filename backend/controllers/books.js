const bookRouter = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publishedDate,
      description,
      isbn,
      pageCount,
    } = req.body;
    const coverImage = req.file ? req.file.path : "";

    const newBook = new Book({
      title,
      author,
      genre,
      publishedDate,
      description,
      isbn,
      pageCount,
      coverImage,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }

    await Book.findByIdAndDelete(req.params.id);
    await User.updateOne({ _id: book.user }, { $pull: { books: book._id } });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.put("/:id", async (req, res) => {
  try {
    const body = req.body;

    const book = {
      title: body.title,
      author: body.author,
      genre: body.genre,
      publishedDate: body.publishedDate,
      description: body.description,
      isbn: body.isbn,
      pageCount: body.pageCount,
      coverImage: body.coverImage,
    };

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = bookRouter;
