const User = require("../models/user");
const libraryRouter = require("express").Router();

libraryRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    const user = await User.findById(userId).populate("books", {
      title: 1,
      author: 1,
      genre: 1,
      publishedDate: 1,
      description: 1,
      isbn: 1,
      pageCount: 1,
      coverImage: 1,
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    let filteredBooks = user.books;
    if (status) {
      filteredBooks = user.books.filter((book) => book.status === status);
    }

    const booksDetails = filteredBooks.map((book) => book.book);

    res.json(booksDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = libraryRouter;
