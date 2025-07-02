
import React from "react";
import { useParams } from "react-router-dom";
import useCheckRole from "../../context/checkRole"; 
import ReviewsList from "./ReviewList";
import ReviewsSection from "../ReviewsSection"; 
const AgentReviews = ({ editable = false }) => {
  useCheckRole(['agent'], '/login');
  const { agentId } = useParams();

  return (
    <div className="bg-[#f5f5f5] flex justify-center min-h-screen w-full p-6">
      <div className="w-full md:w-[90%]">
        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-4">
          {editable ? "Manage Reviews" : "My Reviews"}
        </h1>
        {editable ? (
          <ReviewsSection agentId={agentId} />
        ) : (
          <ReviewsList agentId={agentId} />
        )}
      </div>
    </div>
  );
};

export default AgentReviews;