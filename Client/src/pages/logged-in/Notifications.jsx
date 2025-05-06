import { useState } from "react";
import { FaCheck, FaTimes, FaHome, FaExclamationCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

// Sample data for notifications (focused on specific actions)
const notificationsData = [
  {
    id: 1,
    title: "New Property Added",
    message: "A new apartment in Ulpiana is now available for rent.",
    time: "2 mins ago",
    category: "New Property",
    status: "info", // Can be "info", "success", or "danger"
    action: "/view-property/1",
  },
  {
    id: 2,
    title: "Client Request Accepted",
    message: "Your request for the 'Luxury Condo' has been accepted.",
    time: "30 mins ago",
    category: "Request Accepted",
    status: "success",
    action: "/client-details/2",
  },
  {
    id: 3,
    title: "Client Request Cancelled",
    message: "Your request for the 'Cozy Loft' has been cancelled.",
    time: "1 hour ago",
    category: "Request Cancelled",
    status: "danger",
    action: "/client-details/3",
  },
  // Add more notification items as required
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <div className="bg-[#f6f6f6] h-[88%] px-10 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <div className="space-x-4 flex items-center">
              <button
                onClick={markAllAsRead}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Mark All as Read
              </button>
              <button
                onClick={clearAll}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl shadow-sm transition ${notification.read ? "bg-gray-100" : "bg-white border-l-4 border-blue-500"}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* Icon based on the notification type */}
                    {notification.category === "New Property" && <FaHome size={20} className="text-blue-500" />}
                    {notification.category === "Request Accepted" && <FaCheck size={20} className="text-green-500" />}
                    {notification.category === "Request Cancelled" && <FaTimes size={20} className="text-red-500" />}

                    <div>
                      <h2 className="font-semibold">{notification.title}</h2>
                      <p className="text-gray-600 text-sm">{notification.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => toggleRead(notification.id)}
                    className={`text-sm font-medium ${notification.read ? "text-gray-400" : "text-blue-500"} hover:underline`}
                  >
                    {notification.read ? "Mark as Unread" : "Mark as Read"}
                  </button>
                  <a
                    href={notification.action}
                    className="text-sm font-medium text-blue-500 hover:underline"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
