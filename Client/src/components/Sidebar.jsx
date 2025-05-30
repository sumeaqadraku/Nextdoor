import { IoHomeOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useLogout from "../context/logout";

const Sidebar = () => {
    const logout = useLogout();
    return (
        <div className="bg-gradient-to-b from-[#1275A4] to-[#072C3E] h-full w-[230px] flex flex-col justify-between py-4 px-5">
            <div>
                <h1 className="text-[20px] text-white font-semibold">NextDoor</h1>
                <div className="flex flex-col mt-10 gap-3 text-white text-sm">
                    <Link 
                      to="/user/home" 
                      className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <IoHomeOutline className="text-xl" />
                        <span>Home</span>
                    </Link>
                    <Link 
                      to="/user/agents" 
                      className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <FaUserTie className="text-xl" />
                        <span>Agents</span>
                    </Link>
                    <Link 
                      to="/user/saved" 
                      className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <IoBookmarkOutline className="text-xl" />
                        <span>Saved</span>
                    </Link>
                    <Link 
                      to="/user/notifications" 
                      className="flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-[#1E4E65]"
                    >
                        <FiBell className="text-xl" />
                        <span>Notifications</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-white text-sm">
                <Link 
                  to="/user/edit-profile" 
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
}

export default Sidebar;
