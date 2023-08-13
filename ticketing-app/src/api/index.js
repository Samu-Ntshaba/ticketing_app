import axios from 'axios';

// Connection to endpoint
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// API to reigster a new user
export const apiRegister = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/register`, userData);
        console.log("Full Response:", response)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('API request failed');
    }
};

// API to login an user
export const apiLogin = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, credentials);
        console.log("Login Response:", response)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('API request failed');
    }
};

// API to ftech tickets 
export const fetchTickets = async (page, filter) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Authentication token not found");
    }

    try {
        const response = await axios.get(`${BASE_URL}/tickets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                page: page,
                limit: 10, // Fixed the ticketsPerPage to 10
                type: filter.type,
                term: filter.term  
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to fetch tickets.');
    }
};

// API to create a new ticket
export const createTicket = async (ticketData) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Authentication token not found");
    }

    try {
        const response = await axios.post(`${BASE_URL}/tickets`, ticketData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("Create Ticket Response:", response);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to create a new ticket.');
    }
};