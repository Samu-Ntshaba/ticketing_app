import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../actions/userActions';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    isAuthenticated: !!localStorage.getItem('authToken'),
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };

        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload, isLoading: false, isAuthenticated: true,};

        case USER_REGISTER_FAILURE:
        case USER_LOGIN_FAILURE:
            return { ...state, error: action.payload, isLoading: false };

        case USER_LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};

export default userReducer;
