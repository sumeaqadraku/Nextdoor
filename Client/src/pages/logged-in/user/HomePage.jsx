import { useState,useEffect } from "react";
import Topbar from "../../../components/Topbar";
import PropertyWidget from "../../../components/widgets/PropertyWidget";
import Pagination from "../../../components/ui/Pagniations";
import axiosInstance from "../../../context/axiosInstance";
import { Link } from "react-router-dom";
import PropertyTypeSelector from "../../../components/ui/RadioType";
import useCheckRole  from "../../../context/checkRole";



const HomePage = () => {
  useCheckRole(['buyer', 'admin', 'agent'], '/login');

  const [propertyType, setPropertyType] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [otherFilter, setOtherFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [PropertyData, setPropertyData] = useState([]);

 
  useEffect(() => {
  const fetchPropertyData = async () => {

    try {
      const hasFilters =
        propertyType || priceFilter || roomFilter || otherFilter || searchTerm || locationFilter;

      const params = {
        ...(propertyType && { type: propertyType }),
        ...(priceFilter && { price: priceFilter }),
        ...(roomFilter && { bedrooms: roomFilter }),
        ...(otherFilter && { certified: otherFilter }),
        ...(searchTerm && { search: searchTerm }),
        ...(locationFilter && { location: locationFilter }),
      };

      const endpoint = "/properties";

      const response = await axiosInstance.get(endpoint, { params });

      // Normalize image URLs and update property data
      const updatedProperties = response.data.map(property => {
        const normalizedImageUrl = property.imageUrl
          ? `http://localhost:5000${property.imageUrl.replace(/\\/g, '/')}`
          : '';

          console.log(normalizedImageUrl)
        return {
          ...property,
          imageUrl: normalizedImageUrl,
        };
      });
      setPropertyData(updatedProperties);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  fetchPropertyData();
}, [propertyType, priceFilter, roomFilter, otherFilter, searchTerm, locationFilter]);



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = PropertyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(PropertyData.length / itemsPerPage);
 


  return (
    <div className="flex h-lvh">
      <div className="w-full">
        <Topbar onSearchChange={setSearchTerm} onLocationChange={setLocationFilter} />
        <div className="w-full h-[88%] bg-[rgb(246,246,246)]">
          <div className="w-full flex justify-between py-3 px-10">
            
            <div className="flex flex-col w-[25%] border-x-2 rounded-2xl border-gray-200 px-3 py-2 bg-white">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="Select type" disabled >Select type:</option>
              <option value="house">Home</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>

            {/* Filters */}
            <div className="bg-white flex justify-center gap-2 items-center rounded-2xl p-1 w-[30%]">
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select 
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}>
                  <option value="">Price</option>
                  <option value="350">{"< 350"}</option>
                  <option value="350">{"> 350"}</option>
                </select>
              </div>
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select
                 value={roomFilter}
                 onChange={(e) => setRoomFilter(e.target.value)}>
                  <option value="" disabled>Rooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select
                  value={otherFilter}
                  onChange={(e) => setOtherFilter(e.target.value)}
                >
                  <option value="">Certified</option>
                  <option value="Yes">With Contract</option>
                  <option value="No">Without Contract</option>
                </select>

              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div className="px-10 py-2 w-full">
          <h1 className="text-2xl font-semibold">Top Apartment Rooms</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 h-[470px] overflow-y-auto mt-3 pb-4">
            {currentProperties.map((property) => (
              <Link
                key={property.id}
                to={`/user/properties/${property.id}`}
                className="block"
              >
                <PropertyWidget {...property} isSavedPage={false} />
              </Link>
            ))}
          </div>

            <div className="w-full flex justify-center">
               <Pagination
                totalItems={PropertyData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                />
            </div>
            {/* Pagination */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
