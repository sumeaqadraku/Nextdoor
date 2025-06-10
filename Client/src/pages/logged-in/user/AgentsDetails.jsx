import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewsSection from "../../../components/widgets/Reviews";
import useCheckRole from "../../../context/checkRole";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../../../context/axiosInstance";
import { useNavigate } from 'react-router-dom';



const AgentDetails = () => {
  useCheckRole(['buyer', 'admin', 'agent'], '/login');
  const { id } = useParams();
    const navigate = useNavigate();


  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
    try {
        setLoading(true);
        const [agentRes, propsRes] = await Promise.all([
        axiosInstance.get(`/buyers/${id}`),
        axiosInstance.get(`/buyers/props/${id}`)
        ]);
        setAgent(agentRes.data);
        setProperties(propsRes.data || []);
    } catch (err) {
        setError("Failed to load agent details.");
    } finally {
        setLoading(false);
    }
    };


  fetchAgentDetails();
}, [id]);

  if (loading) return <p className="text-center mt-20">Loading agent details...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!agent) return <p className="text-center mt-20">Agent not found.</p>;

  const { username, role, email, phoneNumber, rating, ratingText } = agent;

  return (
    <div className="bg-[#f5f5f5] flex justify-center min-h-screen w-full p-6">
      <div className="w-full md:w-[90%] mt-10">
        <div className="shadow-lg bg-amber-100 w-full h-auto md:h-60 rounded-2xl overflow-hidden">
          <div className="h-[25%] bg-gray-400 relative flex justify-center">
            <div className="size-16 md:size-19 bg-gray-500 rounded-full absolute top-5"></div>
          </div>
          <div className="h-auto md:h-[75%] bg-white flex flex-col md:flex-row justify-between items-center p-6 md:p-9">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-medium">{username}</h1>
              <p className="text-[#008CB3] text-sm">{role || 'Estate Agent'}</p>
              <p className="font-bold">
                Email: <a href={`mailto:${email}`} className="font-normal">{email}</a>
              </p>
              <p className="font-bold">
                Contact: <a href={`tel:${phoneNumber}`} className="font-normal">{phoneNumber}</a>
              </p>
            </div>
            <div className="text-center mt-4 md:mt-0">
              <h1 className="text-xl md:text-2xl font-medium">Rating</h1>
              <div className="text-2xl md:text-3xl flex text-amber-400 gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < (rating || 5) ? "#FBBF24" : "#D1D5DB"} />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{ratingText || 'Excellent'}</p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-4">Agent Properties:</h1>

        <div className="w-full h-[400px] flex flex-col gap-3 items-center overflow-y-auto scrollbar-hide">
          {properties.length === 0 ? (
            <p>No properties found for this agent.</p>
          ) : (
            properties.map((props) => (
              <div
                key={props.id}
                className="h-16 bg-white w-full sm:w-[97%] flex flex-col sm:flex-row justify-between shadow-lg items-center p-2"
              >
                <div className="bg-amber-200 h-14 w-16 lm:hidden"></div>
                <div className="w-full flex justify-between items-center px-4 mt-2 sm:mt-0">
                  <h2 className="text-lg md:text-xl font-medium">{props.title}</h2>
                  <button 
                    onClick={() => navigate(`/user/properties/${props.id}`)}
                  className="bg-[#008CB3] text-white font-medium h-9 w-[30%] sm:w-[20%] p-1 rounded-[6px]">
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <br />
        <hr />

        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-4">Agent Reviews:</h1>
        <ReviewsSection agentId={id} />
      </div>
    </div>
  );
};

export default AgentDetails;
