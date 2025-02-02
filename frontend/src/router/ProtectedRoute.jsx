import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Check if token exists

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if no token
    }

    return children; // Allow access to the protected route
};

export default ProtectedRoute;
