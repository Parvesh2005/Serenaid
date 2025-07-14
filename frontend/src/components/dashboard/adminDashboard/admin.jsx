import { useEffect, useState } from "react";
import { Check, MoreHorizontal, Clock } from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const AdminDashboard = ({ user, signOut }) => {
  const [role, setRole] = useState("doctor");
  const [tab, setTab] = useState("pending");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const endpoint = tab === "pending" ? "unapproved" : "approved";
      const url = `${baseURL}/${role}s/${endpoint}?hospital=${user.hospital}`;
      const res = await fetch(url);
      const json = await res.json();
      setData(json[`${role}s`] || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${baseURL}/${role}s/approve/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab, role]);

  const filteredData = data.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.department?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-secondary mb-4">
          Welcome, <span className="font-medium">{user.name}</span> from {user.hospital}
        </p>

        <div className="flex gap-4 flex-wrap mb-4">
          <select
            className="select select-bordered"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
          </select>

          <input
            type="text"
            placeholder="Search by name or department"
            className="input input-bordered w-full max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filteredData.map((item) => (
            <div key={item._id} className="card bg-base-200 p-4 shadow-md">
              <p className="font-semibold">
                Name: <span className="text-neutral-content">{item.name}</span>
              </p>
              <p className="font-semibold">
                Department: <span className="text-neutral-content">{item.department}</span>
              </p>
              {tab === "pending" && (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleApprove(item._id)}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
          {filteredData.length === 0 && (
            <p className="text-center">No {role}s found.</p>
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

export default AdminDashboard;
