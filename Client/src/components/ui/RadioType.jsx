import { useState } from "react";

const PropertyTypeSelector = ({ onFilterChange }) => {
  const [selected, setSelected] = useState(null);

  const handleToggle = (value) => {
    const newValue = selected === value ? null : value;
    setSelected(newValue);
    onFilterChange(newValue);
  };

  return (
    <div className="bg-white rounded-full p-1 flex w-fit gap-2">
      <input
        type="checkbox"
        id="apartments"
        className="hidden peer"
        checked={selected === "apartments"}
        onChange={() => handleToggle("apartments")}
      />
      <label
        htmlFor="apartments"
        className="inline-block px-5 py-2 rounded-full font-medium cursor-pointer peer-checked:bg-[#1275A4] peer-checked:text-white"
      >
        Apartments
      </label>

      <input
        type="checkbox"
        id="house"
        className="hidden peer"
        checked={selected === "house"}
        onChange={() => handleToggle("house")}
      />
      <label
        htmlFor="house"
        className="inline-block px-5 py-2 rounded-full font-medium cursor-pointer peer-checked:bg-[#1275A4] peer-checked:text-white"
      >
        House
      </label>
    </div>
  );
};

export default PropertyTypeSelector;