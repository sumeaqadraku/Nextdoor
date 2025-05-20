import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import AppointmentModal from "../forms/AppointmentForm";
import DeclineRequest from "../confirmModals/declineRequests";
import toast from "react-hot-toast";


const mockRequests = [
  { id: 1, client: 'Erris Binxhija', message: 'Has made a request for appointment for Banese Lipjan' },
  { id: 2, client: 'Ava Thompson', message: 'Would like to schedule a viewing for 123 Maple St.' },
  { id: 3, client: 'Liam Smith', message: 'Interested in a virtual tour of the downtown loft.' },
  { id: 4, client: 'Olivia Brown', message: 'Sent documents for pre‑approval—ready to book a viewing.' },
  { id: 5, client: 'Sophia Miller', message: 'Needs more photos of the backyard area.' },
  { id: 7, client: 'James Taylor', message: 'Requested late‑evening showing on Friday.' },
  { id: 8, client: 'James Taylor', message: 'Requested late‑evening showing on Friday.' },
  { id: 9, client: 'James Taylor', message: 'Requested late‑evening showing on Friday.' },
  { id: 10, client: 'James Taylor', message: 'Requested late‑evening showing on Friday.' },
  { id: 11, client: 'James Taylor', message: 'Requested late‑evening showing on Friday.' },
  { id: 12, client: 'James Taylor', message: 'Requested late‑evening showing on Friday.' },
];


export default function RequestsMailPanel() {
  const [requests, setRequests]     = useState(mockRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [showModal, setShowModal]       = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [selected,   setSelected]       = useState(null);

  const pageCount = Math.ceil(requests.length / pageSize);
  const startIdx  = (currentPage - 1) * pageSize;
  const endIdx    = startIdx + pageSize;
  const pageItems = requests.slice(startIdx, endIdx);

  const handleRemove = (id) => {
    setRequests((prev) => prev.filter((p) => p.id !== id));
    toast.success(`Request ${id} has been declined`);
    // if last item on last page removed, go back a page
    if (pageItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
                    <p className="text-xs leading-tight">Client:</p>
                    <h1 className="leading-5 font-medium">{req.client}</h1>
                  </div>
                </div>
                <div>
                  <p className="text-xs leading-tight">Message:</p>
                  <h1 className="leading-5">{req.message}</h1>
                </div>
              </div>

              {/* actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
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
          {showModal && <AppointmentModal onClose={() => setShowModal(false)} />}
        </div>
      </div>

      {/* Decline Modal */}
      <DeclineRequest
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleRemove}
        request={selected || {}}
      />
    </div>
  );
}
