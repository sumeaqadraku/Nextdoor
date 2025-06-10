import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../../context/axiosInstance";
import { useParams } from "react-router-dom";

export default function ReviewsList() {
  const { id: agentId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        if (!agentId) throw new Error("Agent ID is undefined.");
        console.log("Fetching reviews for Agent ID:", agentId);

        const response = await axiosInstance.get(`/api/reviews?agentId=${agentId}`);
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Invalid response format from server.");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [agentId]);

  return (
    <div className="w-full mx-auto bg-gray-100 p-6 rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Agent Reviews</h1>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-center text-2xl font-bold my-4">
          {isLoading ? "Loading..." : `${reviews.length} ${reviews.length === 1 ? "Review" : "Reviews"}`}
        </h2>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : isLoading ? (
          <p className="text-center">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-md flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-gray-400 rounded-full w-14 h-14"></div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">
                      {review.user?.username || "Anonymous"}
                    </h3>
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <h4 className="text-[#008CB3] font-bold">{review.title}</h4>
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                  {review.createdAt && (
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
