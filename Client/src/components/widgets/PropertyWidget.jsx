import { useState } from "react";
import apartament1 from "../../assets/images/apartament1.jpg";
import { SlSizeActual } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";

const PropertyWidget = ({ id, title, size, bedrooms, city , price, imageUrl, onRemove, isSavedPage = false  }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white w-[97%] h-40 flex shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && isSavedPage && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove(id);
          }}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
          title="Remove from saved"
        >
          <FaTimes size={12} />
        </button>
      )}

      <div className="bg-gray-50 m-3 w-[35%] rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt="first property"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col m-3 justify-between">
        <h1 className="text-[20px] font-semibold">{title}</h1>

        <div className="flex gap-2 text-sm mt-1">
          <div className="flex items-center gap-1">
            <SlSizeActual className="text-xl" />
            <p className="text-[14px] font-semibold">{size}</p>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineBedroomParent className="text-xl" />
            <p className="text-[14px] font-semibold">{bedrooms} rooms</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm mt-1">
          <IoLocationSharp className="text-xl" />
          <p>{city}</p>
        </div>

        <h2 className="text-[18px] font-bold mt-1 text-[#1275A4]">
          EUR {price} <span className="text-black font-light">/monthly</span>
        </h2>
      </div>
    </div>
  );
};

export default PropertyWidget;
