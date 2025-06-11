import { useEffect, useState } from "react";
import axiosInstance from "../../../context/axiosInstance";

const AgentsTable = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/admin/agents")
      .then(res => setAgents(res.data))
      .catch(() => setAgents([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this agent?")) return;
    await axiosInstance.delete(`/admin/agents/${id}`);
    setAgents(agents.filter(a => a.id !== id));
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Agents</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{agent.id}</td>
                <td className="py-2 px-4 border-b">{agent.username}</td>
                <td className="py-2 px-4 border-b">{agent.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleDelete(agent.id)}
                  >
                    Delete
                  </button>
                  {/* Add Edit button here if needed */}
                </td>
              </tr>
            ))}
            {agents.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentsTable;