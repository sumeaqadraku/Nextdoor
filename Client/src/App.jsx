import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import UserLayout from './components/UserLayout';
import AgentLayout from './components/AgentLayout';
import HomePage from './pages/logged-in/user/HomePage';
import Agents from './pages/logged-in/user/Agents';
import SavedItems from './pages/logged-in/user/SavedProps';
import Notifications from './pages/logged-in/user/Notifications';
import AgentDasboard from './pages/logged-in/agent/AgentDashboard';
import AddProperty from './pages/logged-in/agent/AddProperty';
import PropertyDetails from './pages/logged-in/user/PropertyDetails';
import Requests from './pages/logged-in/agent/Requests';
import AgentDetails from './pages/logged-in/user/AgentsDetails';
import UnauthorizedPage from './pages/Unathorized';
import EditProfile from './pages/logged-in/EditProfile';
import AdminDashboard from './pages/logged-in/admin/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import UsersTable from "./pages/logged-in/admin/UsersTable";
import AgentsTable from "./pages/logged-in/admin/AgentsTable";
import AppointmentsTable from "./pages/logged-in/admin/AppointmentsTable";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff" }
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="agents" element={<Agents />} />
          <Route path="saved" element={<SavedItems />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="agents/:id" element={<AgentDetails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>

        <Route path="/agent" element={<AgentLayout />}>
          <Route path="dashboard" element={<AgentDasboard />} />
          <Route path="management" element={<AddProperty />} />
          <Route path="requests" element={<Requests />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="agents" element={<AgentsTable />} />
          <Route path="appointments" element={<AppointmentsTable />} />
        </Route>
        
        
      

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;