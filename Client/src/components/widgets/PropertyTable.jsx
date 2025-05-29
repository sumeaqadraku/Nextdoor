import { useState, useEffect } from "react";
import View1 from "../../assets/images/view1.jpg";
import RemovePropertyModal from "../../components/confirmModals/removeProp";
import EditPropertyModal from "../forms/EditPropertyModal";
import axios from "axios";
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
      await axios.delete(`http://localhost:5000/api/agents/deleteProperty/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Property ${id} deleted successfully.`);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete property ${id}.`);
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[item.status] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
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
