// hooks/useCheckRole.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const useCheckRole = (allowedRoles = [], redirectPath = '/login') => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      navigate('/login', { replace: true });
      return;
    }

    if (!storedUser) {
      navigate('/login', { replace: true });
      return;
    }

    const user = JSON.parse(storedUser);
    const userRole = user?.role;

    if (!allowedRoles.includes(userRole)) {
      switch (userRole) {
        case 'admin':
          navigate('/unauthorized', { replace: true });
          break;
        case 'agent':
          navigate('/unauthorized', { replace: true });
          break;
        case 'buyer':
          navigate('/', { replace: true });
          break;
        default:
          navigate(redirectPath, { replace: true });
      }
    }
  }, [allowedRoles, navigate, redirectPath]);
};

export default useCheckRole;
