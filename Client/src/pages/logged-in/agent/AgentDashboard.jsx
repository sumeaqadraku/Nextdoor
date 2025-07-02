import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import toast from "react-hot-toast";

import {
  FaRegBuilding,
  FaCheckCircle,
  FaHourglassHalf,
  FaDollarSign,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import Agentbar from "../../../components/AgentBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useCheckRole  from "../../../context/checkRole";
import axiosInstance from "../../../context/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AgentDashboard = () => {
  useCheckRole(['agent','admin'], '/login');

  const [stats, setStats] = useState({
    listings: 0,
    sold: 0,
    appointments: 0,
    revenue: "$0",
    leads: 0,
    meetings: 0,
  });
  const [appointments, setAppointments] = useState([]);


  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [propsRes, soldRes, appointRes, ] = await Promise.all([
        axiosInstance.get("/agents/countProperties", { headers }),
        axiosInstance.get("/agents/countSold", { headers }),
        axiosInstance.get("/agents/countAppointments", { headers }),
      ]);
      
      console.log(propsRes.data)

      setStats({
      listings: propsRes.data.count || 0,
      sold: soldRes.data.count || 0,
      appointments: appointRes.data.count || 0,
      
    });
    } catch (err) {
      console.error("Dashboard API error", err);
    }
  };

  const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axiosInstance.get("/appointments", { headers });
    console.log("Appointment API Response:", response.data); // 👈 Inspect this
    setAppointments(response.data); // You may need response.data.appointments or similar
  } catch (err) {
    console.error("Error fetching appointments", err);
  }
 };

  useEffect(() => {
    fetchDashboardData();
    fetchAppointments();
  }, []);

 const handleStatusChange = async (id, newStatus) => {
  try {
    const response = await axiosInstance.patch(`/appointments/status/${id}`, {
      status: newStatus,
    });

    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );

    console.log(`Status for appointment ${id} updated to ${newStatus}`);
    toast.success(`Appointment status updated to "${newStatus}"`);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    toast.error("Failed to update appointment status");
  }
};


  return (
    <div className="flex h-lvh">
      <div className="w-full  bg-[#f6f6f6] overflow-y-auto">
        {/* Header */}
         <div className="bg-white px-10 py-2 mb-5 flex justify-between items-center">
            <div className="">
                <h1 className="text-2xl font-medium leading-tight">Dashboard</h1>
                <p className="text-[20px] font-light leading-5">Manage all information here</p>
            </div>
            <div className="flex items-center gap-1">
                <div className="bg-gray-200 size-10 rounded-full"></div>
                <h1 className="font-semibold">Erris Binxhija</h1>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 xl:grid-cols-3 gap-4 mb-6">
          <StatCard title="Listings" value={stats.listings} icon={<FaRegBuilding />} />
          <StatCard title="Sold" value={stats.sold} icon={<FaCheckCircle />} />
          <StatCard title="Pending" value={stats.appointments} icon={<FaHourglassHalf />} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 px-10 gap-6">
          

          {/* Top Properties */}
          <div className="bg-white p-4 rounded-xl px-10 shadow col-span-2">
            <h2 className="text-lg font-semibold mb-4">Your Appointments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-3">Property</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                  <tbody>
                    {(appointments || []).map((appt, index) => (
                      <tr key={index}>
                        <td className="py-2 px-3">{appt.title}</td>
                        <td className="py-2 px-3">
                          {new Date(appt.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3">
                          <select
                            value={appt.status}
                            onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                            className={`border rounded px-2 py-1 text-sm ${
                              appt.status === 'Completed'
                                ? 'text-green-600'
                                : appt.status === 'Cancelled'
                                ? 'text-red-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
    <div className="bg-[#1275A4] text-white p-3 rounded-full text-lg">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  </div>
);

export default AgentDashboard;
