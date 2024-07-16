import bookService from '../services/books';
import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers: {
        setBooks: (state, action) => {
            return action.payload;
        },
        updateBook: (state, action) => {
            return state.map(book => book.id === action.payload.id ? action.payload : book);
        },
        removeBook: (state, action) => {
            return state.filter(book => book.id !== action.payload);
        }
    }
});


export const initializeBooks = () => {
    return async dispatch => {
        const books = await bookService.getAll();
        dispatch(setBooks(books));
        return books;
    };
}

export const bookToRemove = (id) => {
    return async dispatch => {
        try {
            const response = window.confirm('Are you sure you want to delete this book?');
            if (response) {
                await bookService.remove(id);
                dispatch(removeBook(id));
            }
        }
        catch (error) {
            console.log("Error deleting book", error);
        }
    }

}

export const { setBooks, updateBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;