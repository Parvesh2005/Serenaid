import { Link, useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContex"
import { useEffect, useState } from "react";
import AdminDashboard from "../components/dashboard/adminDashboard/admin";
import DoctorDashboard from "../components/dashboard/doctorDashboard/doctor";
import NurseDashboard from "../components/dashboard/nurseDashboard/nurse";
import DefaultDashboard from "../components/dashboard/default";
import PatientDashboard from "../components/dashboard/patientDashboard/patient";

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
          let found = false;

          for (let r of roles) {
            const res = await fetch(`${baseURL}/${r}s/email/${session.user.email}`);
            
            if (res.ok) {
              const data = await res.json();

              if (data && data[r]) {
                setUserData(data[r]);
                setRole(r);
                found = true;
                break;
              }
            }
          }

          if (!found) {
            setUserData("incomplete");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData("incomplete");
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
    <div>
        {/* <h1 className="text-3xl font-bold mb-4 text-primary">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>
        <h2 className="text-lg mb-6 text-secondary">
          Welcome, {session.user.email}
        </h2> */}

        
        {userData === "incomplete" ? (
          <div>
            <p className="text-warning">Please complete your profile before accessing the dashboard.</p>
            <Link to="/profilecomp" className="link link-error">You can complete your profile here.</Link>
          </div>
        ) : userData ? (
          <>
            {
              role === "admin" ? <AdminDashboard user={userData} /> :
              role === "doctor" ? (
                userData.approved ? (
                  <DoctorDashboard user={userData} />
                ) : (
                  <div className="text-warning">
                    <p>Your profile is pending approval by the admin.</p>
                  </div>
                )
              ) :
              role === "nurse" ? <NurseDashboard user={userData} /> :
              role === "patient" ? <PatientDashboard user={userData} /> :
              <DefaultDashboard />
            }
          </>
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