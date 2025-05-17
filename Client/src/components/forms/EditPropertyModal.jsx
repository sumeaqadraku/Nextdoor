import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FormInput from "../ui/LabelInput";
import ImageUploadPreview from "../ui/imageInput";
import toast from "react-hot-toast";

const EditPropertyModal = ({ onClose}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    yearBuilt: "",
    certificate: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    toast.success("Property updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-white w-[70%] max-w-2xl rounded-xl overflow-auto h-130 shadow-lg relative"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-full bg-[#f6f6f6] p-1 flex text-center">
          <h2 className="text-xl px-10 pt-3 font-bold mb-4">Edit Property</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-95 overflow-y-scroll gap-4 mt-2">
          <div className="flex flex-wrap gap-2 px-10">
            <FormInput label="Property Name:" name="name" value={formData.name} type="text" onChange={handleChange} placeholder="Enter property name" />
            <FormInput label="Type:" name="type" value={formData.type} type="text" onChange={handleChange} placeholder="e.g. Apartment, House" />
            <FormInput label="Price:" name="price" value={formData.price} type="number" onChange={handleChange} placeholder="Enter price in €" />
            <FormInput label="City:" name="city" value={formData.city} type="text" onChange={handleChange} placeholder="Enter city name" />
            <FormInput label="Address:" name="address" value={formData.address} type="text" onChange={handleChange} placeholder="Enter street address" />
            <FormInput label="Latitude:" name="latitude" value={formData.latitude} type="number" onChange={handleChange} placeholder="e.g. 42.6611" />
            <FormInput label="Longitude:" name="longitude" value={formData.longitude} type="number" onChange={handleChange} placeholder="e.g. 21.1589" />

            <div className="w-full flex flex-col gap-1">
              <label>Property Description:</label>
              <textarea
                className="bg-[#F6F6F6] text-[17px] rounded-lg h-10 px-3 py-2"
                placeholder="Enter a description about the property..."
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <h1 className="text-xl font-bold">Features</h1>
            </div>

            <FormInput label="Bedrooms" name="bedrooms" value={formData.bedrooms} type="number" onChange={handleChange} placeholder="Number of bedrooms" />
            <FormInput label="Bathrooms" name="bathrooms" value={formData.bathrooms} type="number" onChange={handleChange} placeholder="Number of bathrooms" />
            <FormInput label="Size" name="size" value={formData.size} type="number" onChange={handleChange} placeholder="Size in m²" />
            <FormInput label="Year Built" name="yearBuilt" value={formData.yearBuilt} type="number" onChange={handleChange} placeholder="e.g. 2020" />
            <FormInput label="Has Certificate" name="certificate" value={formData.certificate} type="text" onChange={handleChange} placeholder="Yes / No" />

            <div className="w-full">
              <h1 className="text-xl font-bold">Upload Images</h1>
            </div>

            <ImageUploadPreview
              images={formData.images}
              setImages={(files) => setFormData({ ...formData, images: files })}
            />
          </div>

          <button
            type="submit"
            className="bg-[#42ABDD] py-2 px-4 rounded-lg text-white mx-10 hover:bg-[#2D9CDB] cursor-pointer transition duration-200 transform hover:scale-105"
          >
            Save Changes
          </button>
        </form>

        <div className="flex px-10 pt-5 gap-2 justify-end">
          <button
            onClick={onClose}
            className="bg-[#F6F6F6] py-2 px-4 rounded-lg text-gray-500 cursor-pointer transition duration-200 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>

        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </motion.div>
    </div>
  );
};

export default EditPropertyModal;
