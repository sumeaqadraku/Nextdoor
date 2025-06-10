import { useEffect, useState } from "react";
import useCheckRole from "../../../context/checkRole";
import axiosInstance from "../../../context/axiosInstance";

const AdminDashboard = () => {
  useCheckRole(['admin'], '/login');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axiosInstance.get("/admin/users");
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await axiosInstance.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mt-8 mb-2">Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2">
            {user.username} ({user.email}) 
            <button 
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;