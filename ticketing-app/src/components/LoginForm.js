import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/userActions';
import MessageHandler from './MessageHandler';
import { TextField, Button, Paper, Typography } from '@mui/material';
import '../assets/css/loginForm.css';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [messageInfo, setMessageInfo] = useState({
        open: false,
        severity: '',
        message: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Using Redux's useSelector to fetch any login error from Redux store.
    const loginError = useSelector(state => state.user.error);

    //Handling input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Login fucntion 
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const resultAction = await dispatch(loginUser(credentials));
            if (!credentials.username.trim() || !credentials.password.trim()) {
                setMessageInfo({
                    open: true,
                    severity: 'error',
                    message: 'Both username and password are required!'
                });
                return; // Return early so the rest of the function doesn't execute
            }
            
            // If login is successful and we get a token, navigate to '/tickets'
            if (resultAction.payload && resultAction.payload.token) {
                localStorage.setItem('authToken', resultAction.payload.token);
                setMessageInfo({
                    open: true,
                    severity: 'success',
                    message: 'Login successful!'
                });
                setTimeout(() => {
                    navigate('/tickets');
                }, 2000);
            } else {
                setMessageInfo({
                    open: true,
                    severity: 'error',
                    message: loginError || 'Login failed!'
                });
            }
        } catch (error) {
            setMessageInfo({
                open: true,
                severity: 'error',
                message: 'There was an error logging in. Please try again.'
            });
        }
    };

    return (
        <Paper className="login-form">
            <Typography className='login-header' variant="h5">Login</Typography>
            <MessageHandler 
                open={messageInfo.open} 
                severity={messageInfo.severity} 
                message={messageInfo.message}
                onClose={() => setMessageInfo(prev => ({ ...prev, open: false }))} 
            />
            <form onSubmit={handleLogin}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </Paper>
    );

}

export default LoginForm;
