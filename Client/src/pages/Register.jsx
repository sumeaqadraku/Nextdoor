import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css'; // Make sure this file exists in the same directory
import GmailIcon from '../assets/images/gmail.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));s
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your registration logic here
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.mainTitle}>Create an account to get started</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.formTitle}>Create an account</h2>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Type your full name..."
              value={formData.fullName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Type your email..."
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Type your password..."
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.inputField}
            >
              <option value="">Pick your role...</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <div className={styles.termsCheckbox}>
            <input
              type="checkbox"
              id="termsCheckbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="termsCheckbox">Please agree to our Terms and Services</label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Create
          </button>

          <div className={styles.loginLink}>
            Already have an account? <Link to="/login">Sign in now</Link>
          </div>
        </form>

        <div className={styles.footer}>
          <h3>Discover Your Perfect Home—Just Around the Corner</h3>
          <p>
            Sign up with NextDoor to access exclusive listings, get personalized recommendations,
            and take the next step toward the life you've been dreaming of.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;