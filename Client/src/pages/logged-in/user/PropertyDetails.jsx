import { FaLocationArrow } from "react-icons/fa";
import MapComponent from "../../../components/widgets/MapComponent";
import { useParams } from "react-router-dom";
import {  use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../context/axiosInstance";
import Logo from "../../../assets/images/logo.png";
import View1 from "../../../assets/images/view1.jpg";
import View2 from "../../../assets/images/view2.jpg";
import View3 from "../../../assets/images/view3.jpg";
import View4 from "../../../assets/images/view4.jpg";
import useCheckRole from "../../../context/checkRole";
import BookingModal from "../../../components/forms/BookingModal";

const PropertyDetails = () => {
    useCheckRole(['buyer', 'admin', 'agent'], '/login');
    const { id } = useParams();
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [bookingModal, setBookingModal] = useState(false);
    const baseUrl = "http://localhost:5000";



    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axiosInstance.get(`/properties/${id}`);
                setPropertyDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleSaveProperty = async () => {
        try {   
            const token = localStorage.getItem('token');
            await axiosInstance.post(`/saved/save/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Property saved successfully!");

        } catch (error) {
            console.error("Error saving property:", error);
            toast.error("Failed to save property. Please try again.");
        }
    }
    if (!propertyDetails) {
    return <div className="p-6">Loading property details...</div>;
  }

    return (
        <div className="w-full bg-[#F6F6F6] flex justify-center">
            <div className="w-[87%] bg-white min-h-screen pb-4">
                {/* Header */}
             <div className="sticky top-0 z-50 bg-white flex justify-between items-center px-6 py-3 shadow-sm mb-3">
                <div className="flex text-xl text-[#1275A4] font-semibold items-center gap-2">
                    <img  className="size-10" src={Logo} alt="" />
                        NextDoor
                    </div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1275A4]">Property Details</h1>
                    <button className="bg-[#1275A4] px-4 py-2 rounded-xl text-white text-sm font-medium">Go Back</button>
             </div>


                <div className="flex justify-center">
                    <div className="w-full md:w-[95%]">
                        {/* Location Header */}
                        <div className="flex flex-wrap justify-between items-center mb-5 px-2">
                            <div className="flex items-center gap-2 text-sm md:text-lg">
                                <FaLocationArrow className="text-[#008CB3]" />
                                <h1 className="font-semibold">{propertyDetails.location.city}</h1>
                            </div>
                            <button
                            onClick={handleSaveProperty}
                            className="w-24 md:w-28 bg-[#008CB3] h-9 rounded-md text-white text-sm font-medium cursor-pointer">Save</button>
                        </div>

                        {/* Image Grid */}
                        <div className="flex flex-col md:flex-row gap-4 bg-gray-100 p-2 rounded-lg">
                            {/* Primary image section */}
                            <div className="w-full md:w-2/3 h-52 md:h-[380px] bg-gray-300 flex items-center overflow-hidden justify-center text-white text-lg font-bold rounded-md">
                                <img
                                className="w-full h-full object-cover"
                                src={`${baseUrl}${propertyDetails.images[0]?.imageUrl.replace(/\\/g, '/')}` || "/placeholder.jpg"}
                                alt="Primary"
                                />
                            </div>

                            {/* Thumbnails section */}
                            <div className="w-full md:w-1/3 grid grid-cols-2 grid-rows-2 gap-3">
                                {propertyDetails.images.slice(1, 5).map((img) => (
                                <div key={img.id} className="bg-gray-300 flex items-center overflow-hidden justify-center h-28 md:h-[180px] rounded-md">
                                    <img className="w-full h-full object-cover" src={`${baseUrl}${img.imageUrl.replace(/\\/g, '/')}`} alt={`Image ${img.id}`} />
                                </div>
                                ))}
                            </div>
                            </div>


                        {/* Title and Price */}
                        <div className="flex justify-between items-center mt-6 px-2">
                            <h1 className="text-xl md:text-2xl font-bold">{propertyDetails.title}</h1>
                            <p className="text-lg md:text-xl text-[#008CB3] font-semibold">${propertyDetails.price}/month</p>
                        </div>

                        {/* Highlights */}
                        <div className="mt-4 flex flex-wrap gap-3 px-2">
                            {[`Size: ${propertyDetails.features.size}m2`, `Status: ${propertyDetails.status}`, `Type: ${propertyDetails.type}`, `For ${propertyDetails.listingTypes}`, `Has Certificate: ${propertyDetails.features.certificates} `].map((item, i) => (
                                <div key={i} className="p-2 border-2 w-full sm:w-[30%] md:w-[20%] text-center text-sm font-semibold border-[#008CB3] rounded-md">
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Description & Info */}
                        <div className="w-full flex flex-wrap gap-12 mt-6 px-2">
                            <div className="w-full md:w-[60%]">
                                <h2 className="text-xl md:text-2xl font-bold mb-2">Description:</h2>
                                <p className="text-sm font-light leading-relaxed">
                                    {propertyDetails.description || "This property is a beautiful and spacious apartment located in the heart of the city. It features modern amenities, a large living area, and stunning views of the skyline. Perfect for families or professionals looking for a comfortable and convenient living space."}
                                </p>

                                <div className="mt-5">
                                    <h2 className="text-xl md:text-2xl font-bold mb-2">Property Info:</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {[`Bedrooms: ${propertyDetails.features.bedrooms}`, `Elevator: ${propertyDetails.features.elevator}`].map((info, i) => (
                                            <div key={i} className="p-2 border-2 w-full sm:w-[45%] md:w-[30%] text-center text-sm font-semibold border-[#008CB3] rounded-md">
                                                {info}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Map */}
                        <div className="mt-8 px-2 z-0">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">Location in map:</h2>
                            <MapComponent latitude={propertyDetails.location.latitude} longitude={propertyDetails.location.latitude} address={propertyDetails.location.address}/>
                        </div>

                        {/* CTA */}
                        <div className="flex justify-center md:justify-start mt-8 px-2">
                            <button
                            onClick={() => setBookingModal(true)}
                             className="w-36 md:w-44 bg-[#008CB3] h-10 rounded-lg text-white text-sm font-medium">Book It</button>
                        </div>
                        {/* Booking Modal */}
                        <BookingModal
                            isOpen={bookingModal}
                            onClose={() => setBookingModal(false)}
                            propertyId={id}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
