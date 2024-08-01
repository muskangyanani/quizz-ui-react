import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';  // Ensure this import is correct

const PrivateRoute = ({ component: Component, ...rest }) => {
    let { user } = useAuth();
    const location = useLocation();

    user = localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null;

    return user ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default PrivateRoute;
