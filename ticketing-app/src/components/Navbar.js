import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MessageHandler from './MessageHandler';
import { logoutUser } from '../redux/actions/userActions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import '../assets/css/navbar.css';

const Navbar = () => {
    const user = useSelector(state => state.user.user);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [menuOpen, setMenuOpen] = useState(false);

    // Menu Toggle
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [messageInfo, setMessageInfo] = useState({
        open: false,
        severity: '',
        message: ''
    });

    const dispatch = useDispatch();

    // Logout Function 
    const handleLogout = () => {
        setMessageInfo({
            open: true,
            severity: 'success',
            message: 'Logged Out successful!'
        });
        dispatch(logoutUser());
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    return (
        <AppBar position="static">
            <Toolbar className="navbar">
                <MessageHandler 
                    open={messageInfo.open} 
                    severity={messageInfo.severity} 
                    message={messageInfo.message}
                    onClose={() => setMessageInfo(prev => ({ ...prev, open: false }))} 
                />
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    <NavLink to="/" className="name-logo" end>Tick-APP</NavLink>
                </Typography>
                {menuOpen && (
                    <div className={menuOpen ? "nav-links active" : "nav-links"}>
                        {!isAuthenticated ? (
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                            </>
                        ) : (
                            <>
                                <Typography className='username'>
                                    {`Welcome, ${user && user.username ? user.username : ''}`}
                                </Typography>
                                <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
                            </>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
