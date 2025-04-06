import React, { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    if (!emailId || !password) {
      setError("Email and password are required");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, {withCredentials: true});
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 code-text">
            <span className="text-primary">&#60;</span>
            DevSwipe
            <span className="text-primary">/&#62;</span>
          </h1>
          <p className="text-sm opacity-70">Connect with developers who match your tech stack</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="dev-input w-full" 
              value={emailId} 
              onChange={(e) => setEmailId(e.target.value)} 
              placeholder="your@email.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="dev-input w-full" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </div>
          
          {error && <div className="text-error text-sm py-2">{error}</div>}
          
          <button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="dev-button w-full bg-primary hover:bg-primary-focus text-white py-2 mt-2"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="text-center text-sm mt-6">
            New to DevSwipe? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;