import React, { useState, useEffect } from 'react';
import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { fetchTickets as fetchTicketsAction } from '../redux/actions/ticketActions';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/ticketList.css';
import MessageHandler from './MessageHandler';
import TicketModal from './TicketModal';

const TicketList = () => {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets.tickets);
    const totalPages = useSelector(state => state.tickets.totalPages);
    const totalTickets = tickets.length;

    const [currentPage, setCurrentPage] = useState(1);
    const [filterTerm, setFilterTerm] = useState('');
    const [filterType, setFilterType] = useState('title');
    const [messageInfo, setMessageInfo] = useState({
        open: false,
        severity: '',
        message: ''
    });

    useEffect(() => {
        dispatch(fetchTicketsAction(currentPage, { term: filterTerm, type: filterType }));
    }, [dispatch, currentPage, filterTerm, filterType]);

    const handleFilterChange = (e) => {
        setFilterTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        console.log("currentPage")
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Changing the date format 
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Paper className="ticket-list">
            <div className="actions">
                <TicketModal onMessage={(message) => setMessageInfo(message)} />
            </div>
            <div className="filter-container">
                <FormControl variant="outlined" style={{ marginRight: '1rem' }}>
                    <InputLabel>Filter By</InputLabel>
                    <Select
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        label="Filter By"
                    >
                        <MenuItem value="title">Ticket Title</MenuItem>
                        <MenuItem value="number">Ticket Number</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    label="Filter Value" 
                    variant="outlined" 
                    value={filterTerm} 
                    onChange={handleFilterChange}
                />
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Ticket Number</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket, index) => (
                            <TableRow key={ticket.id}>
                                <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                                <TableCell>{ticket.ticket_number}</TableCell>
                                <TableCell>{ticket.ticket_title}</TableCell>
                                <TableCell>{ticket.ticket_description}</TableCell>
                                <TableCell>{formatDate(ticket.created_date)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="pagination">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                <span>Page {currentPage} of {totalPages} | Total Tickets: {totalTickets}</span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
            </div>
            <MessageHandler 
                open={messageInfo.open} 
                severity={messageInfo.severity} 
                message={messageInfo.message}
                onClose={() => setMessageInfo(prev => ({ ...prev, open: false }))} 
            />
        </Paper>
    );
}

export default TicketList;
