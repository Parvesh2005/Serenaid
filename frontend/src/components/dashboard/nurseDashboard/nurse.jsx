import { useEffect, useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const NurseDashboard = ({ user, signOut }) => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPatients = async () => {
  try {
    const url = `${baseURL}/patients/approved/nurse?hospital=${user.hospital}&department=${user.department}&nurseName=${encodeURIComponent(user.name)}`;
    const res = await fetch(url);
    const data = await res.json();
    setPatients(data.patients || []);
  } catch (err) {
    console.error("Error fetching patients:", err);
  }
};


  useEffect(() => {
    fetchPatients();
  }, []);

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
        <h1 className="text-3xl font-bold text-primary mb-2">Nurse Dashboard</h1>
        <p className="text-secondary mb-4">
          Welcome, <span className="font-medium">{user.name}</span><br />
          Hospital: {user.hospital}
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
              <p className="font-semibold">Doctor: <span className="text-neutral-content">{p.doctorAssigned}</span></p>
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <p className="text-center">No patients assigned to you.</p>
          )}
        </div>

        <button className="btn btn-error mt-8" onClick={signOut}>
          Sign Out
        </button>
      </div>

      <div className="btm-nav btm-nav-md shadow-md">
        <button className="active">
          <Check className="h-5 w-5" />
          <span className="btm-nav-label">My Patients</span>
        </button>
        <button onClick={() => alert("More features coming soon...")}>
          <MoreHorizontal className="h-5 w-5" />
          <span className="btm-nav-label">More</span>
        </button>
      </div>
    </div>
  );
};

export default NurseDashboard;
