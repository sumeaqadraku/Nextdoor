import { useState,useEffect } from "react";
import Topbar from "../../../components/Topbar";
import PropertyWidget from "../../../components/widgets/PropertyWidget";
import Pagination from "../../../components/ui/Pagniations";
import axios from "axios";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [PropertyData, setPropertyData] = useState([]);
    useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties");
        setPropertyData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchPropertyData();
    }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = PropertyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(PropertyData.length / itemsPerPage);
  const user = JSON.parse(localStorage.getItem('userData'))
 


  return (
    <div className="flex h-lvh">
      <div className="w-full">
        <Topbar name={user.username} />
        <div className="w-full h-[88%] bg-[rgb(246,246,246)]">
          <div className="w-full flex justify-between py-3 px-10">
            {/* Radio Buttons */}
            <div className="bg-white rounded-full p-1 flex w-fit gap-2">
              <input type="radio" name="property" id="apartments" className="hidden peer/apartments" defaultChecked />
              <label htmlFor="apartments" className="px-5 py-2 rounded-full font-medium cursor-pointer peer-checked/apartments:bg-[#1275A4] peer-checked/apartments:text-white">
                Apartments
              </label>
              <input type="radio" name="property" id="house" className="hidden peer/house" />
              <label htmlFor="house" className="px-5 py-2 rounded-full font-medium cursor-pointer peer-checked/house:bg-[#1275A4] peer-checked/house:text-white">
                House
              </label>
            </div>

            {/* Filters */}
            <div className="bg-white flex justify-center gap-2 items-center rounded-2xl p-1 w-[30%]">
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select>
                  <option value="">Price</option>
                  <option value="350">{"< 350"}</option>
                  <option value="350">{"> 350"}</option>
                </select>
              </div>
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select>
                  <option value="">Rooms</option>
                  <option value="">2</option>
                </select>
              </div>
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select>
                  <option value="">Other</option>
                  <option value="">2</option>
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
