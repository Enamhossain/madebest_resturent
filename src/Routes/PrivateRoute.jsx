import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <h3>Loadding....</h3>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;