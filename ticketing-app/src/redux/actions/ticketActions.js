import { 
    fetchTickets as apiFetchTickets, 
    createTicket as apiCreateTicket 
} from '../../api/index';

export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const CREATE_TICKET_SUCCESS = 'CREATE_TICKET_SUCCESS';
export const CREATE_TICKET_FAILURE = 'CREATE_TICKET_FAILURE';

export const fetchTickets = (page, filter) => async dispatch => {
    try {
        const data = await apiFetchTickets(page, filter);
        dispatch({ 
            type: FETCH_TICKETS_SUCCESS, 
            payload: {
                tickets: data.tickets,
                pagination: data.pagination
            }
        });
    } catch (error) {
        console.error("There was an error fetching the tickets", error);
        dispatch({ type: FETCH_TICKETS_FAILURE, payload: { error: error.message } });
    }
};

export const createNewTicket = (ticketData) => async (dispatch, getState) => {
    try {
        const response = await apiCreateTicket(ticketData);
        dispatch({ type: CREATE_TICKET_SUCCESS, payload: response });

        // Refetch the updated list of tickets after creating a new one
        const currentPage = getState().tickets.currentPage || 1;
        const filter = getState().tickets.filter || { term: '', type: '' }; 

        dispatch(fetchTickets(currentPage, filter));

    } catch (error) {
        console.error("There was an error creating the ticket", error);
        dispatch({ type: CREATE_TICKET_FAILURE, payload: { error: error.message } });
    }
};
