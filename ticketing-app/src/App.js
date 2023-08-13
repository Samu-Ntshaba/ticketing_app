import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
import TicketList from './components/TicketList';

import { useSelector, useDispatch } from 'react-redux';


// Main App component
function App() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <Router>
            <Navbar />
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route
                          path="/tickets"
                          element={<ProtectedRoute element={TicketList} isAuthenticated={isAuthenticated} />}
                    />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
