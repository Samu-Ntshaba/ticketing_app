import { apiRegister, apiLogin } from '../../api/index'; // Import the API functions

// Action Types
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_LOGOUT = 'USER_LOGOUT';

// Action Creators
export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const data = await apiRegister(userData);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILURE, payload: error.message });
    }
};

export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const data = await apiLogin(credentials);
        return dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
       return dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
    }
};

export const logoutUser = () => ({
    type: USER_LOGOUT
});
