import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="flex h-lvh">
    <Sidebar admin />
    <div className="w-full">
      <Topbar showLocationFilter={false} />
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;