import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuth = localStorage.getItem("accessToken")

    if (!isAuth) {
        return <Navigate to="/login" replace={true} />
    }
    return children
}

export default ProtectedRoute