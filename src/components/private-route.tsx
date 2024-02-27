import { useSelector } from "react-redux";
import * as React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: any}> = (props) => {
    const user_name = useSelector((state: any) => state.user.user_name)
    
    return (user_name !== "default") ? props.children : <Navigate to='/' replace />
}

export default PrivateRoute;