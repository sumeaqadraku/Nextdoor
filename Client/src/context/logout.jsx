
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };
};

export default useLogout;
