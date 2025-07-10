const DoctorDashboard = ({ user }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-primary">Doctor Dashboard</h2>
      <p>Hello Dr. {user.name}, here's your dashboard.</p>
    </div>
  );
};

export default DoctorDashboard;