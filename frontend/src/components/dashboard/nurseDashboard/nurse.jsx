const NurseDashboard = ({ user }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-primary">Nurse Dashboard</h2>
      <p>Hello {user.name}, here's your dashboard.</p>
    </div>
  );
};

export default NurseDashboard;