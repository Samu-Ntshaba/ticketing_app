import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { registerUser } from '../redux/actions/userActions';
import '../assets/css/registerForm.css';
import MessageHandler from './MessageHandler';

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [messageInfo, setMessageInfo] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const navigate = useNavigate();

    //Redux
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    //Register function
    const handleRegister = async  (e) => {
        e.preventDefault();
        
        if (userData.password !== userData.confirmPassword) {
            setMessageInfo({
                open: true,
                severity: 'error',
                message: 'Passwords do not match!'
            });
            return;
        }

        if (userData.password === "" || userData.username === "" || userData.confirmPassword === "") {
            setMessageInfo({
                open: true,
                severity: 'error',
                message: 'All field are required!'
            });
            return;
        }

        const { confirmPassword, ...userWithoutConfirm } = userData;

        try {
            const action = await dispatch(registerUser(userWithoutConfirm));
            setMessageInfo({
                open: true,
                severity: 'success',
                message: 'Registration successful!'
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessageInfo({
                open: true,
                severity: 'error',
                message: error.message || "Registration failed!"
            });
        }
    };

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMessageInfo((prev) => ({
            ...prev,
            open: false,
        }));
    };


    return (
        <Paper className="register-form">
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
            <MessageHandler
                open={messageInfo.open}
                onClose={handleCloseMessage}
                severity={messageInfo.severity}
                message={messageInfo.message}
            />
        </Paper>
    );

}

export default RegisterForm;
