import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermify } from '@permify/react-role';

const AuthenticatedRoute = ({ children, redirectTo }) => {
    const { setUser } = usePermify();

    // Retrieve user details from local storage

    const auth = JSON.parse(localStorage.getItem("userDetail"));

    // Set user roles if user details are available
    if (auth && auth?.roleId) {
        setUser({
            id: auth?._id,
            roles: [auth?.roleId],
        });
    }

    // console.log(auth,auth?.role,redirectTo,auth?._id,(auth && auth?.role))

    // Check if the token is not available or is undefined
    const isAuthenticated = auth && auth?.role;
    
    // If not authenticated, render the children components (i.e., the protected component)
    // If authenticated, redirect to the specified path
    return !isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default AuthenticatedRoute;
