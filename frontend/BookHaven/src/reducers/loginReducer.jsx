import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';
import bookService from '../services/books';
import { initializeUsers } from './usersReducer';

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ username, password, email, onSuccess }, { dispatch }) => {
        const user = await loginService.login({ username, password, email });
        window.localStorage.setItem('loggedFragranceappUser', JSON.stringify(user));
        bookService.setToken(user.token);
        dispatch(initializeUsers());
        if (onSuccess) onSuccess();
        return user;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        username: '',
        password: '',
        email: '',
        user: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        logoutUser: (state) => {
            window.localStorage.removeItem('loggedFragranceappUser');
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        initializeLoginFromStorage: (state) => {
            const loggedUserJSON = window.localStorage.getItem('loggedFragranceappUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                state.user = user;
                bookService.setToken(user.token);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.username = '';
            state.password = '';
        });
    },
});

export const { setUsername, setPassword, setEmail, logoutUser, setUser, initializeLoginFromStorage } = loginSlice.actions;

export default loginSlice.reducer;
