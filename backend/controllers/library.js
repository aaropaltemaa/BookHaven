const User = require("../models/user");
const libraryRouter = require("express").Router();

libraryRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    const user = await User.findById(userId).populate("books.book", {
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
      filteredBooks = user.books.filter(
        (bookEntry) => bookEntry.status === status
      );
    }

    const booksDetails = filteredBooks.map((bookEntry) => ({
      ...bookEntry.book.toJSON(), // Convert the Mongoose document to a plain JavaScript object
      status: bookEntry.status, // Include the status in the response
    }));

    res.json(booksDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

libraryRouter.delete("/:userId/books/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const bookIndex = user.books.findIndex(
      (bookEntry) => bookEntry.book.toString() === bookId
    );

    if (bookIndex === -1) {
      return res.status(404).json({ error: "book not found" });
    }

    user.books.splice(bookIndex, 1);
    await user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = libraryRouter;
