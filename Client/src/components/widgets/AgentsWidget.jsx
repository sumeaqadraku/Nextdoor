import { FaStar } from "react-icons/fa";

const AgentsWidget = ({ username, role, phoneNumber, email, rating=2, properties=0}) => {
  return (
    <div className="bg-white w-[320px] h-45 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 flex items-center gap-4">
      <div className="bg-[#1275A4] rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold">
        {name.charAt(0)}
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{username}</h2>
        <p className="text-sm text-gray-500 mb-1">{role}</p>

        <div className="flex items-center gap-1 text-amber-400 mb-1">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < rating ? "" : "text-gray-300"} size={14} />
          ))}
          <span className="text-xs text-gray-600 ml-2">
            {rating >= 4 ? "Excellent" : rating >= 3 ? "Good" : "Average"}
          </span>
        </div>

        <div className="text-xs text-gray-600 space-y-0.5">
          <p>
            <span className="font-semibold">Phone:</span> {phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Properties:</span> {properties}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentsWidget;
