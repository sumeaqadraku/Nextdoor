import React, { useState } from "react";
import { motion } from "framer-motion";
import FormInput from "../ui/LabelInput";
import toast from "react-hot-toast";
import axiosInstance from "../../context/axiosInstance";

const AppointmentModal = ({ onClose, propertyId, clientRequestId }) => {
  const [formData, setFormData] = useState({
    date: "",
    note: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.note) {
      toast.error("Both date and description are required.");
      return;
    }

    const dateISO = new Date(formData.date).toISOString();

    try {
      const token = localStorage.getItem('token')

      await axiosInstance.post("/appointments/create", {
        date: dateISO,
        propertyId,
        note: formData.note
      },{
        headers: {
           Authorization: `Bearer ${token}`
        }
      });


       if (clientRequestId) {
      await axiosInstance.put("/notifications/accept", {
        clientRequestId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

      toast.success("Appointment created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-white w-[35%] rounded-xl overflow-auto h-100 shadow-lg relative"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-full p-1 flex text-center">
          <h2 className="text-xl px-10 pt-3 font-bold mb-4">Schedule the appointment</h2>
        </div>

        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="w-full px-10">
            <FormInput
              width="w-full"
              label={"Date:"}
              type={"date"}
              name={"date"}
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex px-10 flex-col gap-1">
            <label>Description:</label>
            <textarea
              className="bg-[#F6F6F6] text-[17px] rounded-lg h-30 px-3 py-2"
              placeholder="Leave some more information about the appointment..."
              rows={10}
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          <div className="flex px-5 pt-5 justify-end">
            <button
              type="submit"
              className="bg-[#42ABDD] py-2 px-4 rounded-lg text-white mx-10 hover:bg-[#2D9CDB] cursor-pointer transition duration-200 transform hover:scale-105">
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#F6F6F6] py-2 px-4 rounded-lg text-gray-500 cursor-pointer transition duration-200 transform hover:scale-105">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AppointmentModal;
