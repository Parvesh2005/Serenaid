import { Navigate } from "react-router";
import { UserAuth } from "../context/AuthContex"

const PrivateRoute = () => {
    const { session } = ({ children }) => {
        const { session } = UserAuth;

        return <>
            { session ? <>{children}</> : <Navigate to = "/signup" /> }
        </>
    }
}

export default PrivateRoute;