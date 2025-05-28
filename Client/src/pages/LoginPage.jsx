import React, { useState } from 'react';
import LogoImage from '../assets/images/Logo.png';
import KeysImage from '../assets/images/keys.jpg';
import GmailImage from '../assets/images/gmail.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const validateForm = (email, password) => {
  const errors = {};
  
  if (!email) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Invalid email format';
  
  if (!password) errors.password = 'Password is required';
  else if (!validatePassword(password)) errors.password = 'Password must be at least 8 characters';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(formData.email, formData.password);
    if (!validation.isValid) {
    console.warn('Form validation failed:', validation.errors);
    return;
   }
    
    if (validation.isValid) {
      setIsLoading(true);
      try {
        
        const response = await axios.post('http://localhost:5000/api/auth/login', formData);
        const { token, user} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        switch (user.role) {
          case 'buyer':
            navigate('/user/home');
            break;
          case 'admin':
            navigate('/admin/dashboard');
          case 'agent':
            navigate('/agent/dashboard');
            break;
          default:
            navigate('/login');
        }
      } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        setErrors({ submit: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validation.errors);
    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img src={LogoImage} alt="Logo" className="h-12 w-12" />
              <div>
                <h2 className="text-2xl font-bold text-[#1175a3]">Welcome to NextDoor Real Estate</h2>
                <p className="text-sm text-gray-600">Sign In now to start browsing properties</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-center mb-6 text-lg font-medium text-gray-900">Sign In</h3>

            {errors.submit && (
              <div className="text-center mb-4 text-red-500 text-sm">
                {errors.submit}
              </div>
            )}

            <div className="mb-6 relative">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type your email..." 
                className={`w-full p-3 border rounded-md text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#1175a3] focus:ring-2 focus:ring-[#1175a3]/10 focus:outline-none`}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input 
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Type your password..." 
                className={`w-full p-3 border rounded-md text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#1175a3] focus:ring-2 focus:ring-[#1175a3]/10 focus:outline-none`}
              />
              <button 
                type="button"
                className="absolute right-3 top-[60%] text-gray-500"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
            </div>

            <div className="flex items-center mb-4">
              <input 
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
            </div>

            <div className="text-right mb-4">
              <a href="#" className="text-sm font-medium text-[#1175a3] hover:text-[#0e5f85] hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className={`w-full bg-[#1175a3] text-white p-3 rounded-lg font-semibold text-sm hover:bg-[#0e5f85] transition-all duration-200 ${isLoading ? 'relative bg-[#93c5fd] cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-t-white border-transparent rounded-full animate-spin"></span>
                </span>
              ) : 'Sign In'}
            </button>

            <div className="text-center mt-6 text-sm text-gray-600">
              <p>Don't have an account? <Link to="/register" className="text-[#1175a3] font-medium hover:text-[#0e5f85] hover:underline">Sign Up now</Link></p>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 mb-2">You can also Log In with:</p>
              <div className="flex justify-center gap-4">
                <button 
                  type="button"
                  className="bg-white border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
                  onClick={() => console.log('Login with Google')}
                >
                  <img src={GmailImage} alt="Google" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Property showcase */}
      <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-100 hidden md:flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-10">
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <img src={KeysImage} alt="Property 1" className="w-full h-32 rounded-lg object-cover shadow-sm hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="w-1/2">
                <img src={KeysImage} alt="Property 2" className="w-full h-32 rounded-lg object-cover shadow-sm hover:scale-102 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <img src={KeysImage} alt="Property 3" className="w-full h-32 rounded-lg object-cover shadow-sm hover:scale-102 transition-transform duration-300" />
            </div>
          </div>

          <div className="text-center px-4">
            <h2 className="text-2xl font-bold text-[#1175a3]">Discover Your Perfect Home</h2>
            <p className="text-sm text-gray-600 mt-2">
              Sign up with NextDoor to access exclusive listings and personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;