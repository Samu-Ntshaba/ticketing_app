import React from 'react';
import { Snackbar, Alert } from '@mui/material';

// Handling both error and succuss messages by passing it props
const MessageHandler = ({ open, onClose, severity, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default MessageHandler;