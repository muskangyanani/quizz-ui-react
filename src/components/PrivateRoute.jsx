import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ component: Component }) => {
    let { user } = useAuth();

    user = localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null;

    return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
