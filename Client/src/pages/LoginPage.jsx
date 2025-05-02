import React, { useState } from 'react';

import styles from '../assets/login.module.css';
import LogoImage from '../assets/images/Logo.png';
import KeysImage from '../assets/images/keys.jpg';
import GmailImage from '../assets/images/gmail.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
    
    // Clear error when user starts typing
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
    
    if (validation.isValid) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Login successful', formData);
        
        if (formData.remember) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect or handle successful login here
      } catch (error) {
        console.error('Login failed', error);
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
    <div className={styles['login-container']}>
      {/* Left side - Login form */}
      <div className={styles['login-form-side']}>
        <div className={styles['login-content']}>
          <div className={styles['login-header']}>
            <div className={styles['login-brand']}>
              <img src={LogoImage} alt="Logo" className={styles['login-logo']} />
              <div>
                <h2 className={styles['login-title']}>Welcome to NextDoor Real Estate</h2>
                <p className={styles['login-subtitle']}>Sign In now to start browsing properties</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles['login-form-box']}>
            <h3 className={styles['login-form-title']}>Sign In</h3>

            {errors.submit && (
              <div className={styles['error-message']} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {errors.submit}
              </div>
            )}

            <div className={styles['login-input-group']}>
              <label htmlFor="email" className={styles['login-label']}>Email</label>
              <input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type your email..." 
                className={`${styles['login-input']} ${errors.email ? styles['input-error'] : ''}`}
              />
              {errors.email && <span className={styles['error-message']}>{errors.email}</span>}
            </div>

            <div className={styles['login-input-group']}>
              <label htmlFor="password" className={styles['login-label']}>Password</label>
              <input 
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Type your password..." 
                className={`${styles['login-input']} ${errors.password ? styles['input-error'] : ''}`}
              />
              <button 
                type="button"
                className={styles['password-toggle']}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <span className={styles['error-message']}>{errors.password}</span>}
            </div>

            <div className={styles['login-remember']}>
              <input 
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <div className={styles['login-forgot']}>
              <a href="#" className={styles['login-link']}>Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className={`${styles['login-button']} ${isLoading ? styles['login-button-loading'] : ''}`}
              disabled={isLoading}
            >
              {isLoading ? '' : 'Sign In'}
            </button>

            <div className={styles['login-signup']}>
  <p>Don't have an account? <Link to="/register" className={styles['login-link']}>Sign Up now</Link></p>
</div>

            <div className={styles['login-social']}>
              <p className={styles['login-social-title']}>You can also Log In with:</p>
              <div className={styles['login-social-buttons']}>
                <button 
                  type="button"
                  className={styles['login-social-button']}
                  onClick={() => console.log('Login with Google')}
                >
                  <img src={GmailImage} alt="Google" className={styles['login-social-icon']} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Property showcase */}
      <div className={styles['login-showcase-side']}>
        <div className={styles['login-content']}>
          <div className={styles['login-showcase-images']}>
            <div className={styles['login-image-row']}>
              <div className={styles['login-half-image']}>
                <img src={KeysImage} alt="Property 1" className={styles['login-image']} />
              </div>
              <div className={styles['login-half-image']}>
                <img src={KeysImage} alt="Property 2" className={styles['login-image']} />
              </div>
            </div>
            <div className={styles['login-image-row']}>
              <img src={KeysImage} alt="Property 3" className={styles['login-image']} />
            </div>
          </div>

          <div className={styles['login-showcase-text']}>
            <h2 className={styles['login-title']}>Discover Your Perfect Home</h2>
            <p className={styles['login-subtitle']}>
              Sign up with NextDoor to access exclusive listings and personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;