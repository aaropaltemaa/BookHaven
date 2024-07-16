import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { registerUser } from '../../../reducers/registerReducer';
import { Container, Typography, TextField, Button } from '@mui/material';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [justRegistered, setJustRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (justRegistered) {
            navigate('/');
            setJustRegistered(false);
        }
    }, [justRegistered, navigate]);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(registerUser({ username, password, email }));
            unwrapResult(resultAction);
            setJustRegistered(true);
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginBottom: "400px", marginLeft: "600px" }}>
            <Typography variant="h4" style={{ marginBottom: '16px', color: "black" }}>Join Us. Where every book has its day. </Typography>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        inputProps={{
                            'data-testid': 'register-email-input',
                        }}
                    />
                    <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        inputProps={{
                            'data-testid': 'register-username',
                            'autoComplete': 'username', // Add this line
                        }}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        inputProps={{
                            'data-testid': 'register-password',
                            'autoComplete': 'new-password', // Add this line
                        }}
                    />
                    <TextField
                        type="password"
                        label="Confirm Password"
                        helperText="Do not share your password with anyone."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        inputProps={{
                            'data-testid': 'register-confirm-password',
                            'autoComplete': 'new-password', // Add this line
                        }}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">Sign Up</Button>
            </form>
        </Container>
    );
}

export default RegisterForm;