import { useEffect, useState } from "react";
import { Check, MoreHorizontal, Clock } from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const DoctorDashboard = ({ user, signOut }) => {
  const [tab, setTab] = useState("pending");
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPatients = async () => {
    try {
      const url =
        tab === "pending"
          ? `${baseURL}/patients/unapproved?department=${user.department}&building=${user.building}`
          : `${baseURL}/patients/approved?department=${user.department}&building=${user.building}`;

      const res = await fetch(url);
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${baseURL}/patients/approve/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        setPatients((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [tab]);

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ward?.toLowerCase().includes(q) ||
      p.bedNo?.toString().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Doctor Dashboard</h1>
        <p className="text-secondary mb-4">
          Welcome, <span className="font-medium">{user.name}</span> <br />
          Department: {user.department} | Building: {user.building}
        </p>

        <input
          type="text"
          placeholder="Search by name, ward or bed"
          className="input input-bordered w-full mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="space-y-3">
          {filteredPatients.map((p) => (
            <div key={p._id} className="card bg-base-200 p-4 shadow-md">
              <p className="font-semibold">Name: <span className="text-neutral-content">{p.name}</span></p>
              <p className="font-semibold">Ward: <span className="text-neutral-content">{p.ward}</span></p>
              <p className="font-semibold">Bed No: <span className="text-neutral-content">{p.bedNo}</span></p>
              {tab === "pending" && (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleApprove(p._id)}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <p className="text-center">No patients found.</p>
          )}
        </div>

        <button className="btn btn-error mt-8" onClick={signOut}>
          Sign Out
        </button>
      </div>

      <div className="btm-nav btm-nav-md shadow-md">
        <button
          className={tab === "pending" ? "active" : ""}
          onClick={() => setTab("pending")}
        >
          <Clock className="h-5 w-5" />
          <span className="btm-nav-label">Pending</span>
        </button>
        <button
          className={tab === "approved" ? "active" : ""}
          onClick={() => setTab("approved")}
        >
          <Check className="h-5 w-5" />
          <span className="btm-nav-label">Approved</span>
        </button>
        <button onClick={() => alert("More options coming soon...")}>
          <MoreHorizontal className="h-5 w-5" />
          <span className="btm-nav-label">More</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
