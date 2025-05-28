import React from "react";
import ReviewsSection from "../../../components/widgets/Reviews";
import useCheckRole from "../../../context/checkRole";

import { FaStar } from "react-icons/fa";

const properties = [
    { id: 1, name: "Property 1" },
    { id: 2, name: "Property 2" },
    { id: 3, name: "Property 3" },
    { id: 4, name: "Property 4" },
    { id: 5, name: "Property 5" },
    { id: 6, name: "Property 6" },
    { id: 7, name: "Property 7" },
];

const AgentDetails = () => {
    useCheckRole(['buyer', 'admin', 'agent'], '/login');
    return (
        <>

            <div className="bg-[#f5f5f5] flex justify-center min-h-screen w-full p-6">
                <div className="w-full md:w-[90%] mt-10">
                    <div className="shadow-lg bg-amber-100 w-full h-auto md:h-60 rounded-2xl overflow-hidden">
                        <div className="h-[25%] bg-gray-400 relative flex justify-center">
                            <div className="size-16 md:size-19 bg-gray-500 rounded-full absolute top-5"></div>
                        </div>
                        <div className="h-auto md:h-[75%] bg-white flex flex-col md:flex-row justify-between items-center p-6 md:p-9">
                            <div className="text-center md:text-left">
                                <h1 className="text-xl md:text-2xl font-medium">Erris Binxhija</h1>
                                <p className="text-[#008CB3] text-sm">Estate Agent</p>
                                <p className="font-bold">Email: <a className="font-normal" href="">ee11@gmail.com</a></p>
                                <p className="font-bold">Contact: <a className="font-normal" href="">044-565-455</a></p>
                            </div>
                            <div className="text-center mt-4 md:mt-0">
                                <h1 className="text-xl md:text-2xl font-medium">Rating</h1>
                                <div className="text-2xl md:text-3xl flex text-amber-400 gap-1 mb-2">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                                <p className="text-gray-600 text-sm">Excellent</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-4">Agent Properties:</h1>

                    <div className="w-full h-[400px] flex flex-col gap-3 items-center overflow-y-auto scrollbar-hide">
                        {properties.map((property) => (
                            <div key={property.id} className="h-16 bg-white w-full sm:w-[97%] flex flex-col sm:flex-row justify-between shadow-lg items-center p-2">
                                <div className="bg-amber-200 h-14 w-16 lm:hidden"></div>
                                <div className="w-full flex justify-between items-center px-4 mt-2 sm:mt-0">
                                    <h2 className="text-lg md:text-xl font-medium">{property.name}</h2>
                                    <button className="bg-[#008CB3] text-white font-medium h-9 w-[30%] sm:w-[20%] p-1 rounded-[6px]">
                                        View
                                    </button>
                                </div>
                            </div>

                        ))}

                    </div>
                    <br></br>
                    <hr></hr>

                    <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-4">Agent Reviews:</h1>
                    <ReviewsSection />
                </div>
            </div>
        </>
    );
}

export default AgentDetails;