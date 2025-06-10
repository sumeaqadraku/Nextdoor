import { useState } from "react";
import axiosInstance from "../../context/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.85, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.2 } },
};

const BookingModal = ({ isOpen, onClose, onConfirm, propertyId }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        `/requests/makeABooking`, // Make sure this matches your route
        { message, propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("");
        onConfirm?.(); // Optional success callback
        onClose();
      }
    } catch (error) {
      console.error("Booking request failed:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl w-80 p-6 shadow-lg space-y-4"
          >
            <h2 className="text-lg font-semibold">Request a booking</h2>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="message">Message:</label>
              <textarea
                className="bg-[#F6F6F6] text-[17px] rounded-lg h-25 px-3 py-2"
                placeholder="Enter a short message..."
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-1 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
