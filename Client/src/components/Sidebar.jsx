import { IoHomeOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="bg-gradient-to-b from-[#1275A4] to-[#072C3E] h-full w-[270px] flex flex-col justify-between py-5 px-8">
            <div>
                <h1 className="text-[24px] text-white font-bold ">NextDoor</h1>
                <div className="flex flex-col mt-20  gap-5 text-white">
                    <div className="flex gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-[#1E4E65]">
                        <IoHomeOutline className="text-2xl"/>
                        <p>Discover</p>
                    </div>
                    <div className="flex gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-[#1E4E65]">
                        <FaUserTie className="text-2xl"/>
                        <h2>Agents</h2>
                    </div>
                    <div className="flex gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-[#1E4E65]">
                        <IoBookmarkOutline className="text-2xl"/>
                        <h2>Saved</h2>
                    </div>
                    <div className="flex gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-[#1E4E65]">
                        <FiBell className="text-2xl"/>
                        <h2>Notifications</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 text-white">
                <div className="flex gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-[#1E4E65]">
                    <GoGear className="text-2xl"/>
                    <h2>Settings</h2>
                </div>
                <div className="flex gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-[#1E4E65]">
                    <IoLogInOutline className="text-2xl"/>
                    <h2>Log Out</h2>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;