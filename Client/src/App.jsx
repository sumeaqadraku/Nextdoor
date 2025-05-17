import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import HomePage from './pages/logged-in/ClientDashboard/HomePage';  // Importimi i HomePage nga vendndodhja e saktë
import Agents from './pages/logged-in/ClientDashboard/Agents';
import SavedItems from './pages/logged-in/ClientDashboard/SavedProps';
import Notifications from './pages/logged-in/ClientDashboard/Notifications';
import AgentDasboard from './pages/logged-in/AgentDashboard/AgentDashboard';
import AddProperty from './pages/logged-in/AgentDashboard/AddProperty';
import PropertyDetails from './pages/logged-in/ClientDashboard/PropertyDetails';

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
        <Route path="/home" element={<HomePage />} />
        <Route path="/agents" element={<Agents/>} />
        <Route path="/saved" element={<SavedItems/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/agent-dashboard" element={<AgentDasboard/>}/>
        <Route path="/add-property" element={<AddProperty/>}/>
        <Route path="/property-details" element={<PropertyDetails/>}/>
        
        {/* Opsionale: Një rrugë default për faqen kryesore ose ridrejtim */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
