import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) return;

    try {
      const decoded = jwtDecode.default(token);
      if (Date.now() >= decoded.exp * 1000) {
        logout();
      } else {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      logout();
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
