import { useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContex"
import { useEffect, useState } from "react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const Dashboard = () => {
    const {session, signOut} = UserAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState("");

    const commonFields = ["name", "contact", "hospital", "department"];
  const roleFields = {
    doctor: [...commonFields, "building"],
    admin: [...commonFields],
    nurse: [...commonFields, "building", "ward"],
    patient: [...commonFields, "building", "ward", "bedNo", "doctorAssigned", "nurseAssigned"],
  };

  const labelMap = {
    name: "Name",
    contact: "Contact",
    hospital: "Hospital",
    department: "Department",
    building: "Building",
    ward: "Ward",
    bedNo: "Bed No.",
    doctorAssigned: "Doctor Assigned",
    nurseAssigned: "Nurse Assigned",
  };

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;

      try {
        const roles = ["doctor", "admin", "nurse", "patient"];
        for (let r of roles) {
          const res = await fetch(`${baseURL}/${r}s/email/${session.user.email}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data[r]) {
            setUserData(data[r]);
            setRole(r);
            break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session]);


    if (!session?.user?.email) 
    {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl">Unauthorized</h1>
      </div>
    );
    }

    console.log(session);

    return <div className="h-screen overflow-y-auto bg-base-100 p-4">
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-primary">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>
        <h2 className="text-lg mb-6 text-secondary">
          Welcome, {session.user.email}
        </h2>

        
   {userData ? (
            <div className="grid grid-cols-1 gap-4">
            {role && roleFields[role].map((field) => (
              <div className="form-control" key={field}>
                <label className="label">
                    <span className="label-text font-semibold text-primary">
                    {labelMap[field] || field}
                    </span>
                </label>
                <p className="pl-2 text-neutral">
                    {userData[field] ?? "Not provided"}
                </p>
                </div>
            ))}
             </div>
        ) : (
            <p>Loading user data...</p>
        )}


        <button onClick={handleSignOut} className="btn btn-primary mt-6">
          Sign Out
        </button>
      </div>
    </div>
}

export default Dashboard;