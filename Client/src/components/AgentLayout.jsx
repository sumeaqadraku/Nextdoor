import Agentbar from "./AgentBar";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const AgentLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <Agentbar />
      <main className="flex-grow overflow-auto">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </main>
    </div>
  );
};

export default AgentLayout;
