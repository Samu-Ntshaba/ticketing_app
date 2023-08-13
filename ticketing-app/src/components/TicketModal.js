import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createNewTicket } from '../redux/actions/ticketActions';
import MessageHandler from './MessageHandler';

const TicketModal = () => {
    const [open, setOpen] = useState(false);
    const [ticket, setTicket] = useState({ ticket_title: '', ticket_description: '' });
    const [messageInfo, setMessageInfo] = useState({
        open: false,
        severity: '',
        message: ''
    });

    const dispatch = useDispatch();
    
    const error = useSelector(state => state.tickets.error);
    const success = useSelector(state => state.tickets.success); // Assuming you've a success field in your tickets state

    useEffect(() => {
        if (error) {
            setMessageInfo({
                open: true,
                severity: 'error',
                message: 'Failed to create the ticket!'
            });
        } else if (success) {
            setMessageInfo({
                open: true,
                severity: 'success',
                message: 'Ticket successfully created!'
            });

            setTicket({ ticket_title: '', ticket_description: '' });
        }
    }, [error, success]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicket(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        // Check if both fields are filled in
        if (!ticket.ticket_title.trim() || !ticket.ticket_description.trim()) {
            setMessageInfo({
                open: true,
                severity: 'error',
                message: 'Both title and description are required!'
            });
            return; // Return early so the rest of the function doesn't execute
        }

        await dispatch(createNewTicket(ticket));
        setOpen(false);  // Close the modal
    };

    return (
        <div>
            <Button variant="outlined" color="inherit" onClick={() => setOpen(true)}>
                Create New Ticket
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Ticket</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="ticket_title"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="ticket_description"
                        label="Description"
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <MessageHandler 
                open={messageInfo.open} 
                severity={messageInfo.severity} 
                message={messageInfo.message}
                onClose={() => setMessageInfo(prev => ({ ...prev, open: false }))} 
            />
        </div>
    );
}

export default TicketModal;
