import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../context/axiosInstance";
import { FaUsers, FaUserTie, FaCalendarAlt } from "react-icons/fa";

const StatCard = ({ title, value, icon, onClick }) => (
  <div
    className="bg-white p-6 rounded-xl shadow flex flex-col items-center cursor-pointer hover:bg-blue-50 transition"
    onClick={onClick}
  >
    <div className="text-3xl mb-2 text-blue-600">{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-gray-600">{title}</div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Users"
          value={stats.userCount || 0}
          icon={<FaUsers />}
          onClick={() => navigate("/admin/users")}
        />
        <StatCard
          title="Agents"
          value={stats.agentCount || 0}
          icon={<FaUserTie />}
          onClick={() => navigate("/admin/agents")}
        />
        <StatCard
          title="Appointments"
          value={stats.appointmentCount || 0}
          icon={<FaCalendarAlt />}
          onClick={() => navigate("/admin/appointments")}
        />
      </div>
      <div className="text-gray-500">Select a section above to manage users, agents, or appointments.</div>
    </div>
  );
};

export default AdminDashboard;