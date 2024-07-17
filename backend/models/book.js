const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
});

bookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
