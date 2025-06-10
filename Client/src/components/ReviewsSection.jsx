import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../context/axiosInstance";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ReviewsSection() {
  const { id: agentId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    comment: "",
    rating: 5
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/api/reviews?agentId=${agentId}`);
        console.log(response.data);
        setReviews(response.data);
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
        console.error("Fetch reviews error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (agentId) fetchReviews();
  }, [agentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setFormData(prev => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.comment) {
      setError("Title and comment are required");
      return;
    }

    if (!user) {
      setError("You must be logged in to submit a review");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/reviews", {
        ...formData,
        userId: user.id,
        agentId: parseInt(agentId),
      });

      setReviews([response.data, ...reviews]);
      setFormData({ title: "", comment: "", rating: 5 });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
      console.error("Submit review error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-100 p-6 rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Agent Reviews</h1>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="bg-gray-400 rounded-full w-14 h-14"></div>
          </div>
          
          <div className="flex-grow">
            <div className="flex gap-1 text-xl mb-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`cursor-pointer transition-colors ${
                    i < formData.rating ? "text-amber-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(i + 1)}
                />
              ))}
            </div>
            
            <input
              type="text"
              name="title"
              placeholder="Review Title"
              className="border p-2 rounded w-full mb-2"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            
            <textarea
              name="comment"
              placeholder="Your Review"
              className="border p-2 rounded w-full resize-none"
              rows="3"
              value={formData.comment}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-[#008CB3] text-white px-4 py-2 rounded-md hover:bg-[#007399] transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post Review"}
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-center text-2xl font-bold my-4">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </h2>
        
        {isLoading && reviews.length === 0 ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
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