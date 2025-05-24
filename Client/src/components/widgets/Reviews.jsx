import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewsSection() {
    const [reviews, setReviews] = useState([
        { name: "Erris Binxhija", title: "Best Agent Ever!", text: "I'm very pleased with this agent, he has helped me a lot on getting my apartment.", rating: 5 }
    ]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = () => {
        if (title && text) {
            setReviews([...reviews, { name: "Anonymous", title, text, rating }]);
            setTitle("");
            setText("");
            setRating(5);
        }
    };

    return (
        <div className="w-full  mx-auto bg-gray-100 p-6 rounded-lg ">
            {/* Comment Box */}
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-gray-400 rounded-full w-14 h-14"></div>
                    <div className="flex flex-col w-full">
                        <div className="flex gap-1 text-xl mb-2 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`cursor-pointer transition-colors ${i < rating ? "text-amber-400" : "text-gray-300"}`}
                                    onClick={() => setRating(i + 1)}
                                />
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Comment Title"
                            className="border p-2 rounded w-full mb-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Comment Text"
                            className="border p-2 rounded w-full resize-none"
                            rows="3"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end items-center mt-3">
                    <button className="bg-[#008CB3] text-white px-4 py-2 rounded-md hover:bg-[#007399] transition-all" onClick={handleSubmit}>
                        Post
                    </button>
                </div>
            </div>

            {/* Total Reviews */}
            <h2 className="text-center text-2xl font-bold my-6">Total Reviews: {reviews.length}</h2>

            {/* Reviews List */}
            <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start gap-4">
                        <div className="bg-gray-400 rounded-full w-14 h-14"></div>
                        <div className="w-full">
                            <h3 className="font-semibold">{review.name}</h3>
                            <h4 className="text-[#008CB3] font-bold">{review.title}</h4>
                            <p className="text-gray-700">{review.text}</p>
                        </div>
                        <div className="flex text-amber-400">
                            {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}