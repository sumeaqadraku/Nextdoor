import { useEffect, useState } from "react";
import axiosInstance from "../../../context/axiosInstance";

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/admin/appointments")
      .then(res => setAppointments(res.data))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    await axiosInstance.delete(`/admin/appointments/${id}`);
    setAppointments(appointments.filter(a => a.id !== id));
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Appointments</h2>
     
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Agent</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{app.id}</td>
                <td className="py-2 px-4 border-b">{app.user?.username || app.userId}</td>
                <td className="py-2 px-4 border-b">{app.agent?.username || app.agentId}</td>
                <td className="py-2 px-4 border-b">{app.date}</td>
                <td className="py-2 px-4 border-b">{app.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;