import AlarmButton from "./alarmButton";

const PatientDashboard = ({ user, signOut }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-primary">Patient Dashboard</h2>
      <p>Hello {user.name}, here's your dashboard.</p>
      <AlarmButton user={user} />

      <button className="btn btn-error mt-8" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default PatientDashboard;