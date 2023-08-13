import { 
    FETCH_TICKETS_SUCCESS, 
    FETCH_TICKETS_FAILURE, 
    CREATE_TICKET_SUCCESS, 
    CREATE_TICKET_FAILURE 
} from '../actions/ticketActions';

const initialState = {
    tickets: [],
    totalPages: 0,
    error: null,
    success: false
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                tickets: action.payload.tickets,
                totalPages: action.payload.pagination.totalPages, // Updated this line
                error: null,  // Reset any previous errors
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case CREATE_TICKET_SUCCESS:
            return {
                ...state,
                tickets: [...state.tickets, action.payload], // Adding new ticket to tickets array
                error: null,
                success: true   // Reset any previous errors
            };
        case CREATE_TICKET_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default ticketReducer;
