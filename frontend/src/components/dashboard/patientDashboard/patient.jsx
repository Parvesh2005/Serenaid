const PatientDashboard = ({ user }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-primary">Patient Dashboard</h2>
      <p>Hello {user.name}, here's your dashboard.</p>
    </div>
  );
};

export default PatientDashboard;