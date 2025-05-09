import { IoHomeOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="bg-gradient-to-b from-[#1275A4] to-[#072C3E] h-full w-[230px] flex flex-col justify-between py-4 px-5">
            <div>
                <h1 className="text-[20px] text-white font-semibold">NextDoor</h1>
                <div className="flex flex-col mt-10 gap-3 text-white text-sm">
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]">
                        <IoHomeOutline className="text-xl"/>
                        <span>Discover</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]">
                        <FaUserTie className="text-xl"/>
                        <span>Agents</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]">
                        <IoBookmarkOutline className="text-xl"/>
                        <span>Saved</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]">
                        <FiBell className="text-xl"/>
                        <span>Notifications</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-white text-sm">
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]">
                    <GoGear className="text-xl"/>
                    <span>Settings</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]">
                    <IoLogInOutline className="text-xl"/>
                    <span>Log Out</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
