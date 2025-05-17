import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import PropertyWidget from "../../../components/widgets/PropertyWidget";

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([
    { id: 1, name: "Modern Flat", size: "72m²", rooms: 3, location: "Prishtine", price: "430.00" },
    { id: 2, name: "Cozy Apartment", size: "55m²", rooms: 2, location: "Prishtine", price: "300.00" },
    { id: 3, name: "Luxury Condo ", size: "85m²", rooms: 4, location: "Prishtine", price: "600.00" },
    { id: 4, name: "Studio Room ", size: "40m²", rooms: 1, location: "Prishtine", price: "250.00" },
    { id: 5, name: "Family Home ", size: "100m²", rooms: 5, location: "Prishtine", price: "700.00" },
    { id: 6, name: "Penthouse ", size: "120m²", rooms: 4, location: "Prishtine", price: "850.00" },
    { id: 7, name: "Cozy Loft", size: "50m²", rooms: 1, location: "Prishtine", price: "280.00" },
    { id: 8, name: "Spacious Villa", size: "150m²", rooms: 6, location: "Shkup", price: "900.00" },
    { id: 9, name: "Urban Studio", size: "45m²", rooms: 1, location: "Ferizaj", price: "220.00" }
  ]);

  const handleRemove = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex h-lvh">
      <div className="w-full">
        <div className="w-full h-full bg-[#f6f6f6]">
          <div className="w-full flex justify-between py-3 px-10">
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
          </div>
          <div className="px-10 py-2 w-full">
            <h1 className="text-2xl font-semibold">Your Saved Properties</h1>
            <div className="overflow-y-auto w-full h-[600px] flex pb-4 flex-wrap mt-3 gap-5">
              {savedItems.map((item) => (
                <PropertyWidget
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  size={item.size}
                  rooms={item.rooms}
                  location={item.location}
                  price={item.price}
                  onRemove={handleRemove}
                  isSavedPage={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedItems;
