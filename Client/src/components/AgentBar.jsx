import { MdDashboard } from "react-icons/md";          // Dashboard
import { MdAddBusiness } from "react-icons/md";        // Add Property
import { MdEdit } from "react-icons/md";               // Edit Property
import { MdRequestPage } from "react-icons/md";        // Requests
import { FaUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useLogout from "../context/logout";

const Agentbar = () => {
    const logout = useLogout();

    return (
        <div className="bg-gradient-to-b from-[#1275A4] to-[#072C3E] h-full w-[230px] flex flex-col justify-between py-4 px-5">
            <div>
                <h1 className="text-[20px] text-white font-semibold">NextDoor</h1>
                <div className="flex flex-col mt-10 gap-3 text-white text-sm">
                    <Link
                        to="/agent/dashboard"
                        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <MdDashboard className="text-xl" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/agent/management"
                        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <MdAddBusiness className="text-xl" />
                        <span>Management</span>
                    </Link>
                    <Link
                        to="/agent/requests"
                        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <MdRequestPage className="text-xl" />
                        <span>Requests</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-white text-sm">
                <Link
                    to="/agent/edit-proifle"
                    className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                >
                    <FaUser className="text-xl" />
                    <span>Profile</span>
                </Link>
               <button
                  onClick={logout}
                  className="flex items-center gap-2 p-2 rounded-md w-full text-left transition-colors duration-200 hover:bg-[#1E4E65]"
                >
                <IoLogInOutline className="text-xl" />
                <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Agentbar;
