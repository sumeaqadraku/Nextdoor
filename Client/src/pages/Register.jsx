import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoImage from '../assets/images/Logo.png';
import KeysImage from '../assets/images/keys.jpg';
import GmailImage from '../assets/images/gmail.png';``
import axiosInstance from '../context/axiosInstance';

// Validimi i email-it
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validimi i fjalëkalimit
const validatePassword = (password) => {
  if (password.length < 8) return { isValid: false, message: 'Të paktën 8 karaktere' };
  if (!/[A-Z]/.test(password)) return { isValid: false, message: 'Të paktën një shkronjë të madhe' };
  if (!/[0-9]/.test(password)) return { isValid: false, message: 'Të paktën një numër' };
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return { isValid: false, message: 'Të paktën një simbol' };
  return { isValid: true, message: '' };
};

// Validimi i formularit
const validateForm = (data) => {
  const errors = {};
  if (!data.username) errors.username = 'Emri i plotë është i detyrueshëm';
  if (!data.email) errors.email = 'Email-i është i detyrueshëm';
  else if (!validateEmail(data.email)) errors.email = 'Format i pavlefshëm i email-it';
  if (!data.password) errors.password = 'Fjalëkalimi është i detyrueshëm';
  else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) errors.password = passwordValidation.message;
  }
  if (!data.role) errors.role = 'Zgjidh një rol';
  if (!data.agreeTerms) errors.agreeTerms = 'Duhet të pranosh kushtet';
  return { isValid: Object.keys(errors).length === 0, errors };
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validation = validateForm(formData);
  if (!validation.isValid) {
    console.warn('Form validation failed:', validation.errors);
    return;
  }

  
  try {
    console.log('Submitting registration form:', formData);
    const response = await axiosInstance.post('auth/register', formData);
    console.log('Registration success:', response.data);
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
  }
};


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Anën e majtë - Formulari */}
      <div className="w-full md:w-1/2 flex justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
              <img src={LogoImage} alt="Logo" className="w-10 h-10" />
              <div>
                <h2 className="text-xl font-bold text-[#1175a3]">Welcome to NextDoor Real Estate</h2>
                <p className="mt-1 text-sm text-gray-600">Create an account to get started</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-center text-gray-900">Create an Account</h3>

            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="fullName"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Type your full name..."
                className={`w-full p-3 border rounded-md text-sm ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:border-[#1175a3] focus:outline-none`}
              />
              {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type your email..."
                className={`w-full p-3 border rounded-md text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#1175a3] focus:outline-none`}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type your password..."
                  className={`w-full p-3 border rounded-md text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#1175a3] focus:outline-none`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md text-sm ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:border-[#1175a3] focus:outline-none`}
              >
                <option value="">Pick your role...</option>
                <option value="buyer">Buyer</option>  
                <option value="agent">Agent</option>
              </select>
              {errors.role && <span className="text-red-500 text-xs mt-1">{errors.role}</span>}
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-700"> Agree to Terms and Services</label>
              {errors.agreeTerms && <span className="text-red-500 text-xs mt-1">{errors.agreeTerms}</span>}
            </div>

            <button
              type="submit"
              className="w-full p-3 text-white bg-[#1175a3] rounded-lg font-semibold text-sm hover:bg-[#0f6790] transition-colors"
            >
              Create
            </button>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Already have an account? <Link to="/login" className="text-[#1175a3] font-medium hover:underline">Sign In now</Link></p>
            </div>

           
          </form>
        </div>
      </div>

      {/* Anën e djathtë - Shfaqja e pronave */}
      <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-100 hidden md:flex justify-center items-center">
        <div className="w-full max-w-md mt-[-2rem]">
          <div className="mb-10">
            <div className="flex gap-4 mb-4">
              <img src={KeysImage} alt="Property 1" className="w-1/2 h-32 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform" />
              <img src={KeysImage} alt="Property 2" className="w-1/2 h-32 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform" />
            </div>
            <img src={KeysImage} alt="Property 3" className="w-full h-32 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1175a3]">Discover Your Perfect Home</h2>
            <p className="mt-2 text-sm text-gray-600">Sign up with NextDoor to access exclusive listings and personalized recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;