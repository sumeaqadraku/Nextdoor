import apartament1 from "../../assets/images/apartament1.jpg";
import { SlSizeActual } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const PropertyWidget = () => {
  return (
    <div className="bg-white w-[45%] h-40 flex shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="bg-gray-50 m-4 w-[35%] rounded-2xl overflow-hidden">
        <img
          src={apartament1}
          alt="first property"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col m-4">
        <h1 className="text-[22px] font-semibold">Apartament Emshir</h1>

        <div className="flex gap-4 font-regular mt-2">
          <div className="flex items-center gap-1">
            <SlSizeActual className="text-2xl" />
            <p>67m²</p>
          </div>

          <div className="flex items-center gap-1">
            <MdOutlineBedroomParent className="text-2xl" />
            <p>2 rooms</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <IoLocationSharp className="text-2xl" />
          <p>Prishtine</p>
        </div>

        <h2 className="text-[22px] font-bold mt-4 text-[#1275A4]">
          EUR 350.00
          <span className="text-black font-light">/monthly</span>
        </h2>
      </div>
    </div>
  );
};

export default PropertyWidget;
