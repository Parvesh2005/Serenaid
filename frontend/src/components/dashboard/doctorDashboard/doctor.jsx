import { useEffect, useState } from "react";
import {
  Check,
  MoreHorizontal,
  Clock,
  Bell,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  User,
  Hospital,
  BedDouble,
  Stethoscope,
} from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const DoctorDashboard = ({ user, signOut }) => {
  const [tab, setTab] = useState("pending");
  const [patients, setPatients] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPatients = async () => {
    try {
      const url =
        tab === "pending"
          ? `${baseURL}/patients/unapproved?department=${user.department}&building=${user.building}&hospital=${user.hospital}&doctorName=${encodeURIComponent(user.name)}`
          : `${baseURL}/patients/approved?department=${user.department}&building=${user.building}&hospital=${user.hospital}&doctorName=${encodeURIComponent(user.name)}`;

      const res = await fetch(url);
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const fetchAlarms = async () => {
    try {
      const res = await fetch(`${baseURL}/alarms/doctor/${encodeURIComponent(user.name)}`);
      const data = await res.json();
      setAlarms(data.data || []);
    } catch (err) {
      console.error("Error fetching alarms:", err);
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

  const handleResolveAlarm = async (alarmId) => {
    try {
      const res = await fetch(`${baseURL}/alarms/${alarmId}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (result.success) {
        setAlarms((prev) =>
          prev.map((a) =>
            a._id === alarmId ? { ...a, status: "resolved" } : a
          )
        );
      }
    } catch (err) {
      console.error("Failed to resolve alarm:", err);
    }
  };

  useEffect(() => {
    if (tab === "alarms") {
      fetchAlarms();
      const intervalId = setInterval(fetchAlarms, 2000);
      return () => clearInterval(intervalId);
    } else {
      fetchPatients();
    }
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
        <h1 className="text-3xl font-bold text-primary mb-2">Doctor Dashboard</h1>
        <p className="text-secondary mb-4">
          Welcome, <span className="font-medium">{user.name}</span><br />
          Department: {user.department} | Building: {user.building} | Hospital: {user.hospital}
        </p>

        {tab !== "alarms" && (
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
                <div
                  key={p._id}
                  className="card bg-base-100 p-4 shadow-md border border-primary/40"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`badge gap-1 ${tab === "pending" ? "badge-warning" : "badge-success"}`}>
                      <UserCheck size={14} />
                      {tab === "pending" ? "Pending" : "Approved"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <User className="text-primary" size={16} />
                    <p className="text-sm font-semibold">{p.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Hospital className="text-secondary" size={16} />
                    <p className="text-sm">Ward: <span className="font-medium">{p.ward}</span></p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <BedDouble className="text-secondary" size={16} />
                    <p className="text-sm">Bed No: <span className="font-medium">{p.bedNo}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="text-info" size={16} />
                    <div className="badge badge-info">Nurse: {p.nurseAssigned}</div>
                  </div>

                  {tab === "pending" && (
                    <button
                      className="btn btn-success mt-4"
                      onClick={() => handleApprove(p._id)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              ))}
              {filteredPatients.length === 0 && (
                <p className="text-left col-span-full">No patients found.</p>
              )}
            </div>
          </>
        )}

        {tab === "alarms" && (
          <>
            <h2 className="text-xl font-bold text-primary mb-4">Emergency Alarms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAlarms.map((alarm) => (
                <div
                  key={alarm._id}
                  className={`card p-4 shadow-md border-2 relative ${
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
                  <p className="font-semibold">Nurse: <span className="text-neutral-content">{alarm.nurse}</span></p>
                  <p className="font-semibold">Status: <span className="text-neutral-content">{alarm.status}</span></p>
                  <p className="font-semibold">Time: <span className="text-neutral-content">{new Date(alarm.createdAt).toLocaleString()}</span></p>

                  {alarm.status === "pending" && (
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => handleResolveAlarm(alarm._id)}
                    >
                      Resolve Alarm
                    </button>
                  )}
                </div>
              ))}
              {sortedAlarms.length === 0 && (
                <p className="text-center">No alarms at the moment.</p>
              )}
            </div>
          </>
        )}

        <button className="btn btn-error mt-8" onClick={signOut}>
          Sign Out
        </button>
      </div>

      <div className="btm-nav btm-nav-md shadow-md">
        <button className={tab === "pending" ? "active" : ""} onClick={() => setTab("pending")}>
          <Clock className="h-5 w-5" />
          <span className="btm-nav-label">Pending</span>
        </button>
        <button className={tab === "approved" ? "active" : ""} onClick={() => setTab("approved")}>
          <Check className="h-5 w-5" />
          <span className="btm-nav-label">Approved</span>
        </button>
        <button className={tab === "alarms" ? "active" : ""} onClick={() => setTab("alarms")}>
          <Bell className="h-5 w-5" />
          <span className="btm-nav-label">Alarms</span>
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
