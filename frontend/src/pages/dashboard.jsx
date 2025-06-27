import { useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContex"

const Dashboard = () => {
    const {session, signOut} = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    console.log(session);

    return <div className = "h-screen flex items-center justify-center">
        <h1>Dashboard</h1>
        <h2>Welcome, {session?.user?.email} </h2>
        <div>
            <button onClick = {handleSignOut} className = "btn btn-primary">Sign Out</button>
        </div>
    </div>
}

export default Dashboard;