import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoImage from '../assets/images/Logo.png';
import KeysImage from '../assets/images/keys.jpg';
import GmailImage from '../assets/images/gmail.png';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters'
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character'
    };
  }
  return {
    isValid: true,
    message: ''
  };
};

const validateForm = (data) => {
  const errors = {};
  if (!data.fullName) errors.fullName = 'Full name is required';
  if (!data.email) errors.email = 'Email is required';
  else if (!validateEmail(data.email)) errors.email = 'Invalid email format';
  if (!data.password) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }
  if (!data.role) errors.role = 'Please select a role';
  if (!data.agreeTerms) errors.agreeTerms = 'You must agree to the Terms and Services';
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(formData);
    if (validation.isValid) {
      console.log('Registration successful', formData);
    } else {
      setErrors(validation.errors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Register form */}
      <div className="w-full md:w-1/2 flex justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
              <img src={LogoImage} alt="Logo" className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold text-blue-600">Welcome to NextDoor Real Estate</h2>
                <p className="mt-1 text-sm text-gray-600">Create an account to get started</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="mb-6 text-lg font-medium text-center text-gray-900">Create an Account</h3>

            <div className="mb-6">
              <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Type your full name..."
                  className={`w-full p-3 border rounded-md text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-600 focus:outline-none`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">👤</span>
              </div>
              {errors.fullName && <span className="text-red-500 text-xs mt-1 block">{errors.fullName}</span>}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type your email..."
                  className={`w-full p-3 border rounded-md text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-600 focus:outline-none`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">✉️</span>
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type your password..."
                  className={`w-full p-3 border rounded-md text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-600 focus:outline-none`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md text-sm ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:border-blue-600 focus:outline-none`}
              >
                <option value="">Pick your role...</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="agent">Agent</option>
              </select>
              {errors.role && <span className="text-red-500 text-xs mt-1 block">{errors.role}</span>}
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
              <label htmlFor="agreeTerms" className="text-sm text-gray-700">Agree to Terms and Services</label>
              {errors.agreeTerms && <span className="text-red-500 text-xs mt-1 block">{errors.agreeTerms}</span>}
            </div>

            <button
              type="submit"
              className="w-full p-3 text-white bg-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Create
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In now</Link></p>
            </div>

            <div className="mt-6 text-center">
              <p className="mb-2 text-sm text-gray-600">You can also Log In with:</p>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 mx-auto bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:-translate-y-0.5 transition-all"
                onClick={() => console.log('Login with Google')}
              >
                <img src={GmailImage} alt="Google" className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Property showcase */}
      <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-100 hidden md:flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex gap-4 mb-4">
              <img src={KeysImage} alt="Property 1" className="w-1/2 h-32 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform" />
              <img src={KeysImage} alt="Property 2" className="w-1/2 h-32 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform" />
            </div>
            <img src={KeysImage} alt="Property 3" className="w-full h-32 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">Discover Your Perfect Home</h2>
            <p className="mt-2 text-sm text-gray-600">Sign up with NextDoor to access exclusive listings and personalized recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;