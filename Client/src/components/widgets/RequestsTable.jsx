import { useState,useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import AppointmentModal from "../forms/AppointmentForm";
import DeclineRequest from "../confirmModals/declineRequests";
import toast from "react-hot-toast";
import axios from "axios";

export default function RequestsMailPanel( {requestss}) {

  const [requests, setRequests]     = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [showModal, setShowModal]       = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [selected,   setSelected]       = useState(null);

  const pageCount = Math.ceil(requests.length / pageSize);
  const startIdx  = (currentPage - 1) * pageSize;
  const endIdx    = startIdx + pageSize;
  const pageItems = requests.slice(startIdx, endIdx);

  useEffect(() => {
  setRequests(requestss || []);
}, [requestss]);

  const handleRemove = async (clientRequestId) => {
  try {

    await axios.put('http://localhost:5000/api/notifications/decline', {clientRequestId});

    setRequests((prev) => prev.filter((p) => p.clientRequestId !== clientRequestId));
    
    toast.success(`Request ${clientRequestId} has been declined`);

    if (pageItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  } catch (error) {
    console.error('Failed to decline request:', error);
    toast.error('Failed to decline request. Please try again.');
  }
};


  return (
    <div className="bg-white shadow rounded-2xl opacity-80 border border-[#D9D9D9] mx-10 px-10 py-4 flex flex-col h-[600px]">
      {/* Header */}
      <div className="h-10 bg-[#F6F6F6] flex justify-between items-center px-6 rounded-2xl w-full">
        <button className="text-[#b4b3b3] cursor-pointer">Mark all as read</button>
        <div className="flex items-center gap-5">
          <p className="text-[#b4b3b3] text-[18px]">
            {startIdx + 1}–{Math.min(endIdx, requests.length)} of {requests.length}
          </p>
          <div className="flex">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="cursor-pointer p-2 rounded-full hover:bg-[#ffffff] disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="cursor-pointer p-2 rounded-full hover:bg-[#ffffff] disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Request Rows */}
      <div className="overflow-y-auto mt-1 h-[500px]">
        <div className="flex flex-col mx-3">
          {pageItems.map((req) => (
            <div
              key={req.id}
              className="w-full flex items-center py-1 px-5 justify-between border-b border-[#D9D9D9] hover:bg-[#F6F6F6] transition duration-200"
            >
              {/* client + message */}
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 py-2">
                  <FiUser className="text-[#b2b0b0] rounded-full p-2 bg-gray-100 text-[45px]" />
                  <div>
                    <p className="text-xs  text-gray-500 leading-tight">Client:</p>
                    <h1 className="leading-5 font-medium">{req.username}</h1>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 leading-tight">Message:</p>
                  <h1 className="leading-5">{req.message}</h1>
                </div>
              </div>

              {/* actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelected(req);
                    setShowModal(true)
                  }}
                  className="text-blue-600 border border-blue-400 rounded-full px-3 py-1 text-xs hover:bg-blue-100 transition duration-200 transform hover:scale-105"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    setSelected(req);
                    setModalOpen(true);
                  }}
                  className="text-red-600 border border-red-400 rounded-full px-3 py-1 text-xs hover:bg-red-100 transition duration-200 transform hover:scale-105"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}

          {/* Accept Modal */}
          {showModal && <AppointmentModal clientRequestId={selected?.clientRequestId}  propertyId={selected?.propertyId} onClose={() => setShowModal(false)} />}
        </div>
      </div>

      {/* Decline Modal */}
      <DeclineRequest
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={()=>handleRemove(selected?.clientRequestId)}
        request={selected || {}}
      />
    </div>
  );
}
