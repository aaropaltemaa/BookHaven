import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';
import bookService from '../services/books';
import { initializeUsers } from './usersReducer';

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ username, password, onSuccess }, { dispatch }) => {
        const user = await loginService.login({ username, password });
        window.localStorage.setItem('loggedBookHavenUser', JSON.stringify(user));
        bookService.setToken(user.token);
        dispatch(initializeUsers());
        dispatch(setUser(user));
        if (onSuccess) onSuccess();
        return user;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        username: '',
        password: '',
        user: null,
        firstName: '',
        lastName: '',
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        logoutUser: (state) => {
            window.localStorage.removeItem('loggedBookHavenUser');
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        initializeLoginFromStorage: (state) => {
            const loggedUserJSON = window.localStorage.getItem('loggedBookHavenUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                state.user = user;
                state.firstName = user.firstName;
                state.lastName = user.lastName;
                bookService.setToken(user.token);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const user = action.payload;
            state.user = user;
            state.firstName = user.firstName;
            state.lastName = user.lastName;
            state.username = '';
            state.password = '';
        });
    },
});

export const { setUsername, setPassword, logoutUser, setUser, initializeLoginFromStorage } = loginSlice.actions;

export default loginSlice.reducer;
