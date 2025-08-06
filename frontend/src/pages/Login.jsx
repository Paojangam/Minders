import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import api from '../api';
import { useAuth } from '../context/AuthContext'; // ✅ import AuthContext

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use the login function from context

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isSignUp) {
        response = await api.post('/auth/register', {
          name: fullName,
          email,
          password,
        });
      } else {
        response = await api.post('/auth/login', {
          email,
          password,
        });
      }

      if (response.data.token) {
        // ✅ Call the login function from context (stores token + sets auth)
        login(response.data.token);
        navigate('/dashboard');
      } else {
        setError('No token received. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div id="Login" className="login-page">
      <div className="login-card">
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isSignUp ? 'Sign up to start journaling' : 'Log in to continue your journey'}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="toggle-text">
          {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
          <span onClick={toggleForm}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
