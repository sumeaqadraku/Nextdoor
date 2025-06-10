import { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaHome } from "react-icons/fa";
import Topbar from "../../../components/Topbar";
import useCheckRole from "../../../context/checkRole";
import axiosInstance from "../../../context/axiosInstance";

const NotificationsPage = () => {
  useCheckRole(["buyer", "admin", "agent"], "/login");

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

        useEffect(() => {
          const fetchNotifications = async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await axiosInstance.get("/notifications/getNotifs", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              console.log("Fetched notifications:", response.data);

            const formatted = response.data.map((notif) => {
            let category = "Notification";
            let title = "You have a new notification.";
            let message = "Check your dashboard for details.";
            let action = "#";

        if (notif.type === "new_listing" && notif.newListing) {
          category = "New Property";
          title = "New Property Listing";
          message = `New listing in ${notif.newListing.city} (${notif.newListing.listingType})`;
          action = `properties/${notif.newListing.propertyId}`;
        } else if (notif.type === "client_request" && notif.clientRequest) {
          const status = notif.clientRequest.approved;

          if (status === "approved") {
            category = "Request Accepted";
            title = "Your Request Was Accepted";
            message = "Congratulations! Your request was accepted.";
          } else if (status === "declined") {
            category = "Request Cancelled";
            title = "Your Request Was Cancelled";
            message = "Unfortunately, your request was cancelled.";
          } else {
            category = "Request Update";
            title = "Your Request Was Reviewed";
            message = `Your request status is: ${status}`;
          }
        }

        return {
          id: notif.id,
          read: notif.is_read,
          category,
          title,
          message,
          time: new Date(notif.createdAt).toLocaleString(),
          action,
        };
    });

        setNotifications(formatted);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

 const toggleRead = async (id, currentReadStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/notifications/updateReadStatus",
        { id, read: !currentReadStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
      );
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };


 const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/notifications/markAllAsRead",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const clearAll = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/notifications/removeNotification",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <div className="flex h-lvh">
      <div className="w-full">
        <Topbar showLocationFilter={false} />
        <div className="bg-[#f6f6f6] h-[88%] px-10 py-6 overflow-y-auto">
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

          {loading ? (
            <p className="text-gray-600 text-center mt-20">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-600 text-center mt-20">No notifications to show.</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl shadow-sm transition ${
                    notification.read ? "bg-gray-100" : "bg-white border-l-4 border-blue-500"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {notification.category === "New Property" && (
                        <FaHome size={20} className="text-blue-500" />
                      )}
                      {notification.category === "Request Accepted" && (
                        <FaCheck size={20} className="text-green-500" />
                      )}
                      {notification.category === "Request Cancelled" && (
                        <FaTimes size={20} className="text-red-500" />
                      )}
                      <div>
                        <h2 className="font-semibold">{notification.title}</h2>
                        <p className="text-gray-600 text-sm">{notification.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => toggleRead(notification.id, notification.read)}
                      className={`text-sm font-medium ${
                        notification.read ? "text-gray-400" : "text-blue-500"
                      } hover:underline`}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
