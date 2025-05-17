import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const UserLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow overflow-auto">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </main>
    </div>
  );
};

export default UserLayout;
