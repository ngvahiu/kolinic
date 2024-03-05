import { useSelector } from "react-redux";
import { getUser } from "../redux/user.slice";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const user = useSelector(getUser);
    const { pathname } = useLocation();

    if (!user) {
        return <Navigate to={`/sign-in?redirectUrl=${pathname}`} replace />
    }
    if (user.role === "USER" && pathname.includes('admin')) {
        return <Navigate to={'/'} replace />
    }
    if (user.role === "ADMIN" && !pathname.includes('admin') && !pathname.includes('profile')) {
        return <Navigate to={'/admin/users'} replace />
    }
    return children;
}

export default ProtectedRoute;