import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContex"

const PrivateRoute = ({children}) => {
        const { session, loading } = UserAuth();

        if (loading) return <div className="text-center text-white py-10">Loading...</div>;

        return session ? children : <Navigate to="/login" />;
}

export default PrivateRoute;