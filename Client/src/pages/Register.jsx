import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/register.module.css';
import LogoImage from '../assets/images/Logo.png';
import KeysImage from '../assets/images/keys.jpg';
import GmailImage from '../assets/images/gmail.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

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

  return (
    <div className={styles.container}>
      <div className={styles.formSide}>
        <div className={styles.formContent}>
          <div className={styles.header}>
            <div className={styles.brand}>
              <img src={LogoImage} alt="Logo" className={styles.logo} />
              <div>
                <h2 className={styles.title}>Welcome to NextDoor Real Estate</h2>
                <p className={styles.subtitle}>Create an account to get started</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Create an account</h3>

            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.inputLabel}>Full Name</label>
              <div className={styles.inputWrapper}>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Type your full name..."
                  className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                />
                <span className={styles.inputIcon}>👤</span>
              </div>
              {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>Email</label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type your email..."
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                <span className={styles.inputIcon}>✉️</span>
              </div>
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type your password..."
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                />
                <span className={styles.inputIcon}>🔑</span>
              </div>
              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="role" className={styles.inputLabel}>Role</label>
              <div className={styles.inputWrapper}>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.role ? styles.inputError : ''}`}
                >
                  <option value="">Pick your role...</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="agent">Agent</option>
                </select>
                <span className={styles.inputIcon}></span>
              </div>
              {errors.role && <span className={styles.errorMessage}>{errors.role}</span>}
            </div>

            <div className={styles.terms}>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">Please agree to our Terms and Services</label>
              {errors.agreeTerms && <span className={styles.errorMessage}>{errors.agreeTerms}</span>}
            </div>

            <button type="button" className={styles.submitButton}>
              Create
            </button>

            <div className={styles.signInLink}>
              <p>Already have an account? <Link to="/login">Sign in now</Link></p>
            </div>

            <div className={styles.socialLogin}>
              <p className={styles.socialTitle}>You can also Log in with:</p>
              <div className={styles.socialButtons}>
                <button
                  type="button"
                  className={styles.socialButton}
                  onClick={() => console.log('Login with Google')}
                >
                  <img src={GmailImage} alt="Google" className={styles.socialIcon} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.showcaseSide}>
        <div className={styles.showcaseContent}>
          <div className={styles.showcaseImages}>
            <div className={styles.imageRow}>
              <div className={styles.halfImage}>
                <img src={KeysImage} alt="Property 1" className={styles.image} />
              </div>
              <div className={styles.halfImage}>
                <img src={KeysImage} alt="Property 2" className={styles.image} />
              </div>
            </div>
            <div className={styles.imageRow}>
              <img src={KeysImage} alt="Property 3" className={styles.image} />
            </div>
          </div>

          <div className={styles.showcaseText}>
            <h2 className={styles.showcaseTitle}>Discover Your Perfect Home—Just Around the Corner</h2>
            <p className={styles.showcaseSubtitle}>
              Sign up with NextDoor to access exclusive listings, get personalized recommendations, and take the next step toward the life you've been dreaming of.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;