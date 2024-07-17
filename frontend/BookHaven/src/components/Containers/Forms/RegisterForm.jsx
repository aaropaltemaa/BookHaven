import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { registerUser } from '../../../reducers/registerReducer';
import { Container, Typography, TextField, Button } from '@mui/material';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [justRegistered, setJustRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (justRegistered) {
            navigate('/');
            setJustRegistered(false);
        }
    }, [justRegistered, navigate]);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(registerUser({ username, firstName, lastName, password, email }));
            unwrapResult(resultAction);
            setJustRegistered(true);
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginBottom: "150px", marginLeft: "600px" }}>
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
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        required
                        inputProps={{
                            'data-testid': 'register-firstname',
                        }}
                    />
                    <TextField
                        type="text"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        required
                        inputProps={{
                            'data-testid': 'register-lastname',
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
                            'autoComplete': 'username',
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
                            'autoComplete': 'new-password',
                        }}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                <Typography variant="body1" style={{ marginTop: "10px", marginLeft: "150px", color: "black" }}>Already have an account? <Link to="/login">Log in</Link></Typography>

            </form>
        </Container>
    );
}

export default RegisterForm;