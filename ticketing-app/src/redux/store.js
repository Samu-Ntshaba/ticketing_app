// redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import ticketReducer from './reducers/ticketReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    tickets: ticketReducer 
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
