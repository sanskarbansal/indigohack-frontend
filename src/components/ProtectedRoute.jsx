import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Unauthorized from "./Unauthorized";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ roles = ["user"], children }) => {
    const { auth } = useContext(AuthContext);

    const userHasRequiredRole = auth && roles.includes(auth.role) ? true : false;

    if (!(auth && auth.loggedIn)) {
        return <Navigate to="/login" />;
    }

    if (auth && !userHasRequiredRole) {
        if (auth.role === "admin") return <Navigate to="/admin" />;
        return <Unauthorized />;
    }

    return children;
};

export default ProtectedRoute;
