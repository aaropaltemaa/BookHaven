import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { setBooks } from "./src/reducers/bookReducer";
import bookService from "./src/services/books";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

bookService.getAll().then((books) => store.dispatch(setBooks(books)));

export default store;
