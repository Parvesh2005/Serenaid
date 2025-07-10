import { useEffect, useState } from "react";
import { Check, MoreHorizontal, Clock } from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const AdminDashboard = ({ user, signOut }) => {
  const [tab, setTab] = useState("pending");
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDoctors = async () => {
    try {
      const url =
        tab === "pending"
          ? `${baseURL}/doctors/unapproved?hospital=${user.hospital}`
          : `${baseURL}/doctors/approved?hospital=${user.hospital}`;

      const res = await fetch(url);
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${baseURL}/doctors/approve/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      }
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [tab]);

  const filteredDoctors = doctors.filter((doc) => {
    const q = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) ||
      doc.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-secondary mb-4">
          Welcome, <span className="font-medium">{user.name}</span> from {user.hospital}
        </p>

        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="space-y-3">
          {filteredDoctors.map((doc) => (
            <div key={doc._id} className="card bg-base-200 p-4 shadow-md">
              <p className="font-semibold">
                Name: <span className="text-neutral-content">{doc.name}</span>
              </p>
              <p className="font-semibold">
                Department: <span className="text-neutral-content">{doc.department}</span>
              </p>
              {tab === "pending" && (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleApprove(doc._id)}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
          {filteredDoctors.length === 0 && <p className="text-center">No doctors found.</p>}
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

export default AdminDashboard;