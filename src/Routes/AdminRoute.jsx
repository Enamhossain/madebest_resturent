// AdminRoute.jsx

// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLocation, Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin,isAdminLoading] = useAdmin();

    if(loading || isAdminLoading){
        return <div className="flex justify-center items-center mt-10">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoute;
