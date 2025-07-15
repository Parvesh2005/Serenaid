import { User, Hospital, BedDouble, Stethoscope, ShieldCheck, ShieldAlert, Building2, HeartPulse } from "lucide-react";
import AlarmButton from "./alarmButton";

const PatientDashboard = ({ user, signOut }) => {
  return (
    <div className="min-h-screen bg-base-100 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-4">Patient Dashboard</h1>
        <p className="text-secondary mb-6">
          Welcome, <span className="font-medium">{user.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Patient Info Card */}
          <div className="card bg-base-100 p-4 shadow-md border border-primary/30">
            <h2 className="text-lg font-semibold mb-3 text-primary flex items-center gap-2">
              <User className="h-5 w-5" /> Patient Info
            </h2>
            <div className="flex items-center gap-2 mb-1">
              <Hospital className="text-secondary" size={16} />
              <p className="text-sm">Hospital: <span className="font-medium">{user.hospital}</span></p>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="text-secondary" size={16} />
              <p className="text-sm">Department: <span className="font-medium">{user.department}</span></p>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="text-secondary" size={16} />
              <p className="text-sm">Building: <span className="font-medium">{user.building}</span></p>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <BedDouble className="text-secondary" size={16} />
              <p className="text-sm">Ward: <span className="font-medium">{user.ward}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="text-secondary" size={16} />
              <p className="text-sm">Bed No: <span className="font-medium">{user.bedNo}</span></p>
            </div>
          </div>

          {/* Assigned Staff Card */}
          <div className="card bg-base-100 p-4 shadow-md border border-secondary/30">
            <h2 className="text-lg font-semibold mb-3 text-secondary flex items-center gap-2">
              <Stethoscope className="h-5 w-5" /> Assigned Staff
            </h2>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-primary" size={16} />
              <p className="text-sm">Doctor: <span className="font-medium">{user.doctorAssigned}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent" size={16} />
              <p className="text-sm">Nurse: <span className="font-medium">{user.nurseAssigned}</span></p>
            </div>
          </div>
        </div>

        {/* Alarm Buttons */}
        <div className="card bg-warning/10 border border-warning p-4 shadow mb-6">
          <h2 className="text-lg font-semibold mb-3 text-warning flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" /> Need Help?
          </h2>
          <AlarmButton user={user} />
        </div>

        <button onClick={signOut} className="btn btn-error mt-4">Sign Out</button>
      </div>
    </div>
  );
};

export default PatientDashboard;
