import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AgentDashboard = () => {
  useCheckRole(['agent','admin'], '/login');
  const [topProperties] = useState([
    { id: 1, name: "Luxury Condo", location: "Prishtine", price: "$600,000" },
    { id: 2, name: "Modern Flat", location: "Ferizaj", price: "$420,000" },
    { id: 3, name: "Spacious Villa", location: "Shkup", price: "$900,000" },
  ]);

  const [stats, setStats] = useState({
    listings: 0,
    sold: 0,
    appointments: 0,
    revenue: "$0",
    leads: 0,
    meetings: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [propsRes, soldRes, appointRes, reqsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/agents/countProperties", { headers }),
        axios.get("http://localhost:5000/api/agents/countSold", { headers }),
        axios.get("http://localhost:5000/api/agents/countAppointments", { headers }),
        axios.get("http://localhost:5000/api/agents/getRequests", { headers }),
      ]);

      setStats({
        listings: propsRes.data.count,
        sold: soldRes.data.count,
        appointments: appointRes.data.count,
        leads: reqsRes.data.requests.length,
        meetings: appointRes.data.count, // Simplified assumption
        revenue: `$${soldRes.data.count * 100000}`, // Hypothetical revenue
      });
    } catch (err) {
      console.error("Dashboard API error", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales ($)",
        data: [12000, 19000, 15000, 22000, 18000],
        backgroundColor: "#1275A4",
      },
    ],
  };

  return (
    <div className="flex h-lvh">
      <div className="w-full  bg-[#f6f6f6] overflow-y-auto">
        {/* Header */}
         <div className="bg-white px-10 py-2 mb-5 flex justify-between items-center">
            <div className="">
                <h1 className="text-2xl font-medium leading-tight">Property Management</h1>
                <p className="text-[20px] font-light leading-5">Manage all your properties here</p>
            </div>
            <div className="flex items-center gap-1">
                <div className="bg-gray-200 size-10 rounded-full"></div>
                <h1 className="font-semibold">Erris Binxhija</h1>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 xl:grid-cols-6 gap-4 mb-6">
          <StatCard title="Listings" value={stats.listings} icon={<FaRegBuilding />} />
          <StatCard title="Sold" value={stats.sold} icon={<FaCheckCircle />} />
          <StatCard title="Pending" value={stats.appointments} icon={<FaHourglassHalf />} />
          <StatCard title="Revenue" value={stats.revenue} icon={<FaDollarSign />} />
          <StatCard title="New Leads" value={stats.leads} icon={<MdOutlinePersonAddAlt1 />} />
          <StatCard title="Meetings" value="3 Today" icon={<FaCalendarAlt />} />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 px-10 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-4 rounded-xl shadow col-span-2">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <Bar data={salesData} options={{ responsive: true }} />
          </div>

          {/* Top Properties */}
          <div className="bg-white p-4 rounded-xl px-10 shadow">
            <h2 className="text-lg font-semibold mb-4">Appointments</h2>
            <ul className="divide-y">
              {topProperties.map((prop) => (
                <li key={prop.id} className="py-3 flex flex-col">
                  <span className="font-medium">{prop.name}</span>
                  <span className="text-sm text-gray-500">{prop.location}</span>
                  <span className="text-sm text-[#1275A4] font-semibold">{prop.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white p-4 rounded-xl px-10 shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>📬 John Doe sent an inquiry on Luxury Condo.</li>
            <li>✅ Mark Lee finalized deal for Family Home.</li>
            <li>📞 Scheduled a tour with Emily Smith for Urban Studio.</li>
          </ul>
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
