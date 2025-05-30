import PropertyTable from "../../../components/widgets/PropertyTable";
import PropertyModal from "../../../components/forms/AddPropModal";
import axios from "axios";
import { useEffect, useState } from "react";
import useCheckRole from "../../../context/checkRole";
import { FiSearch } from "react-icons/fi";

const AddProperty = () => {
useCheckRole(['agent','admin'], '/login');

const [showModal, setShowModal] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [properties, setProperties] = useState([])

useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No access token");

        const response = await axios.get("http://localhost:5000/api/agents/my-properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched properties:", response.data);

        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        toast.error("Could not load properties.");
        if (err?.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };

    fetchMyProperties();
  }, []);

  const handlePropertyAdded = (newProperty) => {
    setProperties((prevProps) => [newProperty, ...prevProps]);
    setShowModal(false);
  };

  const amountOfProperties = properties.length;

  const filteredProperties = properties.filter(
  (property) =>
    property.title &&
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
);



  return (
    <div className="flex h-screen bg-gray-100">

      <main className="w-full overflow-y-auto">
        <div className="bg-white px-10 py-2 flex justify-between items-center">
            <div className="">
                <h1 className="text-2xl font-medium leading-tight">Property Management</h1>
                <p className="text-[20px] font-light leading-5">Manage all your properties here</p>
            </div>
            <div className="flex items-center gap-1">
                <div className="bg-gray-200 size-10 rounded-full"></div>
                <h1 className="font-semibold">Erris Binxhija</h1>
            </div>
        </div>
        <div className="px-10 w-full mt-5 flex gap-1">
            <h1 className="text-xl font-medium">All Properties: </h1>
            <div className="bg-gray-300 w-7 flex items-center justify-center rounded-full">
                <h1>{amountOfProperties}</h1>
            </div>
        </div>
        <section className="w-full px-10 flex mt-3">
            <div className="bg-white h-122 w-full rounded-2xl opacity-80 border border-[#D9D9D9]">
                <div className="flex w-full px-10 py-5 justify-between">
                    <div className="relative w-[30%] max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        
                        <input
                            type="text"
                            name="search"
                            placeholder="Enter property name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#F6F6F6] pl-12 pr-4 py-2 font-light text-[19px] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#42ABDD] hover:bg-[#2D9CDB] rounded-xl text-white text-[16px] px-3 font-medium cursor-pointer transition duration-200 transform hover:scale-105 ">Add Property</button>
                    
                </div>
                <PropertyTable properties={filteredProperties} />

                <div className="w-full flex justify-center">
                    {showModal && <PropertyModal onClose={() => setShowModal(false)} onPropertyAdded={handlePropertyAdded} />}
                    

                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default AddProperty;
