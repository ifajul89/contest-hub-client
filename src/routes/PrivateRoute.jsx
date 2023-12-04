/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="w-full h-20 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
