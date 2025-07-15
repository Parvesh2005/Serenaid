import { useState } from "react";
import { AlertCircle, BellRing, Loader2, CheckCircle, XCircle } from "lucide-react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const AlarmButton = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  const sendAlarm = async (type) => {
    setLoading(true);
    setStatus("");
    setStatusType("");

    const alarmData = {
      patient: user.name,
      type: type,
      nurse: user.nurseAssigned,
      doctor: user.doctorAssigned,
      status: "pending",
    };

    try {
      const res = await fetch(`${baseURL}/alarms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alarmData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("Alarm sent successfully!");
        setStatusType("success");
      } else {
        setStatus(`Error: ${result.message || "Failed to send alarm"}`);
        setStatusType("error");
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
      setStatusType("error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <button
        onClick={() => sendAlarm("nurse_call")}
        className="btn btn-outline btn-warning w-48 gap-2"
        disabled={loading}
      >
        <BellRing size={18} />
        {loading ? "Calling..." : "Call Nurse"}
      </button>

      <button
        onClick={() => sendAlarm("emergency")}
        className="btn btn-outline btn-error w-48 gap-2"
        disabled={loading}
      >
        <AlertCircle size={18} />
        {loading ? "Sending..." : "Emergency"}
      </button>

      {loading && <Loader2 className="animate-spin text-primary" size={22} />}

      {status && (
        <div
          className={`flex items-center gap-2 text-sm mt-2 ${
            statusType === "success"
              ? "text-green-600"
              : statusType === "error"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {statusType === "success" && <CheckCircle size={16} />}
          {statusType === "error" && <XCircle size={16} />}
          <span>{status}</span>
        </div>
      )}
    </div>
  );
};

export default AlarmButton;
