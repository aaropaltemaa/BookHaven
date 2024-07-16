import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser, logoutUser, setPassword, setUsername } from "../../../reducers/loginReducer";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.login.username);
    const password = useSelector(state => state.login.password);
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    useEffect(() => {
        if (justLoggedIn) {
            navigate('/');
            setJustLoggedIn(false);
        }
    }, [justLoggedIn, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({
                username,
                password,
                onSuccess: () => {
                    navigate('/');
                }
            }));
            unwrapResult(resultAction);
        } catch (error) {
            console.error('Failed to log in:', error);
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setJustLoggedIn(true);
    };

    return (
        <Container maxWidth="sm" style={{ marginBottom: "400px", marginLeft: "600px" }}>
            <Typography variant="h4" style={{ marginBottom: '16px' }}>Login</Typography>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={({ target }) => dispatch(setUsername(target.value))}
                        fullWidth
                        inputProps={{
                            'data-testid': 'username-input',
                        }}
                    />

                    <TextField
                        type="password"
                        label="Password"
                        helperText="Do not share your password with anyone."
                        value={password}
                        onChange={({ target }) => dispatch(setPassword(target.value))}
                        fullWidth
                        inputProps={{
                            'data-testid': 'password-input',
                        }}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '16px' }}>Login</Button>
            </form>
            <Button onClick={handleLogout} variant="contained" color="secondary">Logout</Button>
        </Container>
    );
}
export default LoginForm;
