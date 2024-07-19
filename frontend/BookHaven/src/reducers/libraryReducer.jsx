import libraryService from '../services/library';
import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: "library",
    initialState: [],
    reducers: {
        setLibrary: (state, action) => {
            return action.payload;
        },
        addBook: (state, action) => {
            return [...state, action.payload];
        },
        removeBook: (state, action) => {
            return state.filter(book => book.id !== action.payload);
        }
    }
});

export const initializeLibrary = (userId) => {
    return async dispatch => {
        const library = await libraryService.getUserBooks(userId);
        console.log("Library", library);
        dispatch(setLibrary(library));
        return library;
    };
};

export const { setLibrary, addBook, removeBook } = librarySlice.actions;

export default librarySlice.reducer;

