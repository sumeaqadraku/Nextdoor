import React, {useState} from "react";
import { motion } from "framer-motion";
import FormInput from "../ui/LabelInput";
import ImageUploadPreview from "../ui/imageInput";
import toast from "react-hot-toast";    
const PropertyModal = ({ onClose }) => {

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
        onClose();
        toast.success("Property added successfully!");

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
        <div className="w-full bg-[#f6f6f6] p-1 flex text-center ">
            <h2 className="text-xl px-10 pt-3 font-bold mb-4">Add New Property</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-95 overflow-y-scroll gap-4 mt-2">
            <div className="flex  flex-wrap gap-2 px-10">
                <FormInput label={"Property Name:"} placeholder={"Enter property name"} name={"name"} type={"text"} onChange={handleChange} />
                <FormInput label={"Type:"} placeholder={"Choose type..."} name={"type"} type={"text"} onChange={handleChange}/>
                <FormInput label={"Price:"} placeholder={"Enter price... (300.00)"} name={"price"} type={"number"} onChange={handleChange}/>
                <FormInput label={"City:"} placeholder={"Enter city name..."} name={"city"} type={"text"} onChange={handleChange}/>
                <FormInput label={"Address:"} placeholder={"Enter property address..."} name={"address"} type={"text"} onChange={handleChange}/>
                <FormInput label={"Latitude:"} placeholder={"Enter latitude value..."} name={"latitude"} type={"number"} onChange={handleChange}/>
                <FormInput label={"Longitude:"} placeholder={"Enter longitude value..."} name={"longitude"} type={"number"} onChange={handleChange}/>

                <div className="w-full flex flex-col gap-1">
                    <label>Property Description:</label>
                    <textarea className="bg-[#F6F6F6] text-[17px] rounded-lg h-10 px-3 py-2"
                    placeholder="Enter a description about the property..." name="description" onChange={handleChange} id=""></textarea>
                </div>

                <div className="w-full">
                    <h1 className="text-xl font-bold">Features</h1>
                </div>

                <FormInput label={"Bedrooms"} placeholder={"Enter amount..."} name={"bedrooms"} type={"number"} onChange={handleChange}/>
                <FormInput label={"Bathrooms"} placeholder={"Enter amount..."} name={"bathrooms"} type={"number"} onChange={handleChange}/>
                <FormInput label={"Size"} placeholder={"Enter size..."} name={"size"} type={"number"} onChange={handleChange}/>
                <FormInput label={"Year-built"} placeholder={"Enter the year"} name={"yearBuilt"} type={"number"} onChange={handleChange}/>
                <FormInput label={"Has Certificate"} placeholder={"Certificated or not?"} name={"certificate"} type={"text"} onChange={handleChange}/>

                <div className="w-full">
                    <h1 className="text-xl font-bold">Upload Images</h1>
                </div>

                <ImageUploadPreview
                images={formData.images}
                setImages={(files) => setFormData({ ...formData, images: files })}/>
            </div>
            <button 
            type="submit"
            className="bg-[#42ABDD] py-2 px-4 rounded-lg text-white mx-10 hover:bg-[#2D9CDB] cursor-pointer transition duration-200 transform hover:scale-105 ">Create</button>
        </form>
        <div className="flex px-10 pt-5 gap-2 justify-end">
            <button
            onClick={onClose}
            className="bg-[#F6F6F6] py-2 px-4 rounded-lg text-gray-500  cursor-pointer transition duration-200 transform hover:scale-105">Cancel</button>
        </div>

        {/* Close (X) */}
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

export default PropertyModal;
