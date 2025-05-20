import React from "react";

const FormInput = ({ label, placeholder,type, value, onChange, name, width = "w-[32%]" }) => {
  return (
    <div className={`flex flex-col gap-1 ${width}`}>
      <label className="text-[19px] font-semibold">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="bg-[#F6F6F6] p-2 px-3 text-[17px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default FormInput;
