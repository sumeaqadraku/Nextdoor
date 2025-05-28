import { useState,useEffect } from "react";
import PropertyWidget from "../../../components/widgets/PropertyWidget";
import Pagination from "../../../components/ui/Pagniations";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useCheckRole from "../../../context/checkRole";

const SavedItems = () => {
      useCheckRole(['buyer', 'admin', 'agent'], '/login');
  const [savedItems, setSavedItems] = useState([]);
      useEffect(() => {
      const fetchSavedData = async () => {
        try {
          const user = JSON.parse(localStorage.getItem('userData'))
          const userId = user.id;
          
          const response = await axios.get(`http://localhost:5000/api/saved/fetch/${userId}`);
          setSavedItems(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };
  
      fetchSavedData();
      }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = savedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(savedItems.length / itemsPerPage);

  const handleRemove = async (id) => {
        try {   
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/saved/remove`, { propertyId: id }, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
         });


            setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id));

            toast.success("Unsaved property!");

        } catch (error) {
            console.error("Error unsaving property:", error);
            toast.error("Failed to unsave property.");
        }
    }

  return (
    <div className="flex h-lvh">
      <div className="w-full">
        <div className="w-full h-full bg-[#f6f6f6]">
          <div className="px-10 py-2 w-full">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Your Saved Properties</h1>
              <Pagination
                totalItems={savedItems.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 h-[670px] overflow-y-auto mt-3 pb-4">
             {currentProperties.map((property) => (
              <Link
                key={property.id}
                to={`/user/properties/${property.id}`}
                className="block"
              >
              <PropertyWidget
              id={property.id}
              title={property.title}
              size={property.features?.size}
              bedrooms={property.features?.bedrooms}
              city={property.location?.city}
              price={property.price}
              imageUrl={property.images?.[0]?.imageUrl}
              isSavedPage={true}
              onRemove={handleRemove} />
              </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedItems;
