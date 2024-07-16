import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { setBooks } from "./src/reducers/bookReducer";
import bookService from "./src/services/books";
import loginReducer from "./src/reducers/loginReducer";
import usersReducer from "./src/reducers/usersReducer";
import notificationReducer from "./src/reducers/notificationReducer";

const store = configureStore({
  reducer: {
    books: bookReducer,
    login: loginReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
});

bookService.getAll().then((books) => store.dispatch(setBooks(books)));

export default store;
