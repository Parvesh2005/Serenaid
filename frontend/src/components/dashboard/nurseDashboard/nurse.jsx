import { useEffect, useState } from "react";
import { Check, Bell, AlertTriangle, CheckCircle, User, Hospital, BedDouble } from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const NurseDashboard = ({ user, signOut }) => {
  const [tab, setTab] = useState("patients");
  const [patients, setPatients] = useState([]);
  const [alarms, setAlarms] = useState([]);
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

  const fetchAlarms = async () => {
    try {
      const url = `${baseURL}/alarms/nurse/${encodeURIComponent(user.name)}`;
      const res = await fetch(url);
      const data = await res.json();
      setAlarms(data.data || []);
    } catch (err) {
      console.error("Error fetching alarms:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    let intervalId;

    if (tab === "alarms") {
      fetchAlarms();
      intervalId = setInterval(fetchAlarms, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [tab]);

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ward?.toLowerCase().includes(q) ||
      p.bedNo?.toString().includes(q)
    );
  });

  const sortedAlarms = [...alarms].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Nurse Dashboard</h1>
        <p className="text-secondary mb-4">
          Welcome, <span className="font-medium">{user.name}</span><br />
          Hospital: {user.hospital} | Department: {user.department}
        </p>

        {tab === "patients" && (
          <>
            <input
              type="text"
              placeholder="Search by name, ward or bed"
              className="input input-bordered w-full mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((p) => (
                <div key={p._id} className="card bg-base-200 p-4 shadow-md border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="text-primary" size={18} />
                    <p className="font-semibold">{p.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Hospital className="text-secondary" size={16} />
                    <p>Ward: <span className="font-medium">{p.ward}</span></p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <BedDouble className="text-secondary" size={16} />
                    <p>Bed No: <span className="font-medium">{p.bedNo}</span></p>
                  </div>
                  <div className="badge badge-info mt-2">Doctor: {p.doctorAssigned}</div>
                </div>
              ))}
              {filteredPatients.length === 0 && (
                <p className="text-center col-span-full">No patients assigned to you.</p>
              )}
            </div>
          </>
        )}

        {tab === "alarms" && (
          <>
            <h2 className="text-xl font-bold text-primary mb-4">Your Alarms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAlarms.map((alarm) => (
                <div
                  key={alarm._id}
                  className={`card p-4 shadow-md border-2 relative transition-all duration-300 ${
                    alarm.status === "pending" ? "border-red-500 animate-pulse" : "border-green-500"
                  }`}
                >
                  <div className="absolute top-2 right-2">
                    {alarm.status === "pending" ? (
                      <span className="badge badge-error gap-1"><AlertTriangle size={14} /> Pending</span>
                    ) : (
                      <span className="badge badge-success gap-1"><CheckCircle size={14} /> Resolved</span>
                    )}
                  </div>

                  <p className="font-semibold">Patient: <span className="text-neutral-content">{alarm.patient}</span></p>
                  <p className="font-semibold">Type: <span className="text-neutral-content capitalize">{alarm.type}</span></p>
                  <p className="font-semibold">Doctor: <span className="text-neutral-content">{alarm.doctor}</span></p>
                  <p className="font-semibold">Status: <span className="text-neutral-content">{alarm.status}</span></p>
                  <p className="font-semibold">Created At: <span className="text-neutral-content">{new Date(alarm.createdAt).toLocaleString()}</span></p>

                  {alarm.status === "pending" && (
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={async () => {
                        try {
                          const res = await fetch(`${baseURL}/alarms/${alarm._id}/resolve`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                          });
                          const result = await res.json();
                          if (result.success) {
                            setAlarms((prev) =>
                              prev.map((a) =>
                                a._id === alarm._id ? { ...a, status: "resolved" } : a
                              )
                            );
                          }
                        } catch (err) {
                          console.error("Failed to resolve alarm:", err);
                        }
                      }}
                    >
                      Resolve Alarm
                    </button>
                  )}
                </div>
              ))}
              {alarms.length === 0 && (
                <p className="text-center col-span-full">No alarms at the moment.</p>
              )}
            </div>
          </>
        )}

        <button className="btn btn-error mt-8" onClick={signOut}>
          Sign Out
        </button>
      </div>

      <div className="btm-nav btm-nav-md shadow-md">
        <button onClick={() => setTab("patients")} className={tab === "patients" ? "active" : ""}>
          <Check className="h-5 w-5" />
          <span className="btm-nav-label">My Patients</span>
        </button>
        <button onClick={() => setTab("alarms")} className={tab === "alarms" ? "active" : ""}>
          <Bell className="h-5 w-5" />
          <span className="btm-nav-label">Alarms</span>
        </button>
      </div>
    </div>
  );
};

export default NurseDashboard;
