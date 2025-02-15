import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user) //this is to get user data from redux
    const storedUser = JSON.parse(localStorage.getItem("user")) //get user data from local storage

    //if user did not found it will be directed to login page
    if (!user?._id && !storedUser?._id) {
        return <Navigate to="/Login" replace />
    }

    // If the user is logged in, render the children (protected component)
    return children
}

export default ProtectedRoute;