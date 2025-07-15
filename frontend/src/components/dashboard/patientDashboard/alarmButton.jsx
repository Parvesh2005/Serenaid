import { useState } from "react";

const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const AlarmButton = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendAlarm = async (type) => {
    setLoading(true);
    setStatus("");

    const alarmData = {
      patient: user.name,
      type: type,
      nurse: user.nurseAssigned,
      doctor: user.doctorAssigned,
      status: "pending"
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
      } else {
        setStatus(`Error: ${result.message || "Failed to send alarm"}`);
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center mt-6">
      <button
        onClick={() => sendAlarm("nurse_call")}
        className="btn btn-warning w-40"
        disabled={loading}
      >
        Call Nurse
      </button>

      <button
        onClick={() => sendAlarm("emergency")}
        className="btn btn-error w-40"
        disabled={loading}
      >
        Emergency
      </button>

      {status && <p className="text-sm mt-2 text-center">{status}</p>}
    </div>
  );
};

export default AlarmButton;