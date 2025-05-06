import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import HomePage from './pages/logged-in/HomePage';  // Importimi i HomePage nga vendndodhja e saktë
import Agents from './pages/logged-in/Agents';
import SavedItems from './pages/logged-in/SavedProps';
import Notifications from './pages/logged-in/Notifications';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/agents" element={<Agents/>} />
        <Route path="/saved" element={<SavedItems/>} />
        <Route path="/notifications" element={<Notifications/>} />
        
        {/* Opsionale: Një rrugë default për faqen kryesore ose ridrejtim */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
