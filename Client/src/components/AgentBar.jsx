import { MdDashboard } from "react-icons/md";          // Dashboard
import { MdAddBusiness } from "react-icons/md";        // Add Property
import { MdEdit } from "react-icons/md";               // Edit Property
import { MdRequestPage } from "react-icons/md";        // Requests
import { IoSettingsOutline } from "react-icons/io5";   // Settings
import { IoLogOutOutline } from "react-icons/io5";     // Log Out
import { Link } from "react-router-dom";

const Agentbar = () => {
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
                        to="/agent/add-property"
                        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <MdAddBusiness className="text-xl" />
                        <span>Add Property</span>
                    </Link>
                    <Link
                        to="/agent/edit-property"
                        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <MdEdit className="text-xl" />
                        <span>Edit Property</span>
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
                    to="/agent/settings"
                    className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                >
                    <IoSettingsOutline className="text-xl" />
                    <span>Settings</span>
                </Link>
                <Link
                    to="/agent/logout"
                    className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                >
                    <IoLogOutOutline className="text-xl" />
                    <span>Log Out</span>
                </Link>
            </div>
        </div>
    );
};

export default Agentbar;
