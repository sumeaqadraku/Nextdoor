import React from "react";

const Select = ({ label, name, value, onChange, options = [], width = "w-[32%]" }) => {
  return (
    <div className={`flex flex-col gap-1 ${width}`}>
      <label className="text-[19px] font-semibold">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="bg-[#F6F6F6] p-2 px-3 text-[17px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
