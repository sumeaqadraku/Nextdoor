import { useState, useEffect } from "react";
import View1 from "../../assets/images/view1.jpg";
import RemovePropertyModal from "../../components/confirmModals/removeProp";
import EditPropertyModal from "../forms/EditPropertyModal";
import axiosInstance from "../../context/axiosInstance";
import toast from "react-hot-toast";
import Pagination from "../../components/ui/Pagniations";

const statusColors = {
  Active: "bg-green-200 text-green-800",
  Sold: "bg-gray-300 text-gray-700",
  Rented: "bg-sky-200 text-sky-800",
};

const PropertyTable = ({ properties: propProperties }) => {
  const [properties, setProperties] = useState(propProperties || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setProperties(propProperties || []);
  }, [propProperties]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`/agents/deleteProperty/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Property ${id} deleted successfully.`);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete property ${id}.`);
    }
  };

    const handleStatusChange = async (id, newStatus) => {
      try {
        const response = await axiosInstance.patch(`/agents/updatePropertyStatus/${id}`, {
          status: newStatus,
        });

        // Update local state after successful API response
        setProperties((prev) =>
          prev.map((property) =>
            property.id === id ? { ...property, status: newStatus } : property
          )
        );

        console.log(`Status for property ${id} updated to ${newStatus}`);
        toast.success(`Status updated to "${newStatus}"`);
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update status");
      }
    };



  return (
    <>
      <div className="w-full bg-white rounded-xl px-10 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-[#f9f9f9] text-gray-600 uppercase text-xs">
              <th className="px-4 py-3 rounded-tl-xl">Id</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 rounded-tr-xl">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">{item.id}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-300">
                    <img src={View1} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span>{item.title}</span>
                </td>
               <td className="px-4 py-3">
                  <div className="relative inline-block w-32">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`w-full appearance-none px-4 py-1 pr-8 rounded-full text-xs font-semibold focus:outline-none transition duration-150 ease-in-out cursor-pointer ${
                        statusColors[item.status] || "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {["Active", "Rented", "Sold"].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">{item.owner}</td>
                <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => {
                      setSelected(item);
                      setEditModalOpen(true);
                    }}
                    className="text-blue-600 border border-blue-400 rounded-full px-3 py-1 text-xs hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelected(item);
                      setModalOpen(true);
                    }}
                    className="text-red-600 border border-red-400 rounded-full px-3 py-1 text-xs hover:bg-red-100"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          totalItems={properties.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {editModalOpen && <EditPropertyModal onClose={() => setEditModalOpen(false)} />}

      <RemovePropertyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleRemove}
        property={selected || {}}
      />
    </>
  );
};

export default PropertyTable;
