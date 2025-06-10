import Topbar from "./Topbar";
import AdminDashboardSidebar from "./AdminDashboardSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-lvh">
      <AdminDashboardSidebar />
      <div className="w-full">
        <Topbar showLocationFilter={false} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;