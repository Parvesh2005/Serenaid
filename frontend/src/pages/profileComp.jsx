import { useState } from "react";
import { UserAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
const backendPort = import.meta.env.VITE_PORT;
const baseURL = `http://localhost:${backendPort}/api/v1`;

const DynamicUserForm = () => {
  const { session } = UserAuth();

  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = session?.user?.email || "";
    const data = { email, role, ...formData };

    setSubmittedData(data);

    let route = "";

    if (role === "doctor") route = `${baseURL}/doctors`;
    else if (role === "admin") route = `${baseURL}/admins`;
    else if (role === "nurse") route = `${baseURL}/nurses`;
    else if (role === "patient") route = `${baseURL}/patients`;

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Submission successful:", result);

      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg shadow-lg bg-base-200">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-primary">User Registration</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Role</span>
            </label>
            <select
              className="select select-bordered"
              value={role}
              onChange={handleRoleChange}
              required
            >
              <option value="" disabled>Select one</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          {role &&
            roleFields[role].map((field) => (
              <div className="form-control" key={field}>
                <label className="label">
                  <span className="label-text">{labelMap[field]}</span>
                </label>
                <input
                  type="text"
                  name={field}
                  className="input input-bordered"
                  placeholder={`Enter ${labelMap[field]}`}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  required
                  pattern={field === "contact" ? "^[0-9]{10}$" : undefined}
                  title={field === "contact" ? "Please enter a 10-digit phone number" : undefined}
                />
              </div>
            ))}

          {role && (
            <div className="form-control mt-4">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          )}

          {/* {submittedData && (
            <div className="mt-4 p-4 bg-base-300 rounded-lg text-sm">
              <h3 className="font-semibold">Form Submitted:</h3>
              <pre className="whitespace-pre-wrap">{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default DynamicUserForm;
