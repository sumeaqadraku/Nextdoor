import { FaStar } from "react-icons/fa";

const AgentsWidget = ({ name, title, rating, phone, email, properties }) => {
  return (
    <div className="bg-white w-[40%] h-45 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer relative">
      <div className="bg-[#1275A4] w-full h-12 relative">
        <div className="bg-[#FAFAFA] size-16 rounded-full absolute top-4 left-7"></div>
      </div>

      <div className="flex">
        <div className="w-[50%] mt-7 px-3 border-r">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="font-light">{title}</p>
          <div className="flex text-amber-300">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className={i < rating ? "" : "text-gray-300"} />
            ))}
          </div>
          <p>{rating >= 4 ? "Excellent" : rating >= 3 ? "Good" : "Average"}</p>
        </div>

        <div className="w-[50%] mt-7 px-3">
          <p className="font-semibold">
            Phone: <span className="font-light">{phone}</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-light">{email}</span>
          </p>
          <p className="font-semibold">
            Properties Owned: <span className="font-light">{properties}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentsWidget;
