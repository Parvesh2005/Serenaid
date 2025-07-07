import { useState } from "react";

const DynamicUserForm = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const commonFields = ["name", "contact", "hospital", "department"];
  const roleFields = {
    doctor: [...commonFields],
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
    setFormData({}); // Clear previous data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ role, ...formData });
    console.log("Submitted:", { role, ...formData });
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

          {submittedData && (
            <div className="mt-4 p-4 bg-base-300 rounded-lg text-sm">
              <h3 className="font-semibold">Form Submitted:</h3>
              <pre className="whitespace-pre-wrap">{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DynamicUserForm;
