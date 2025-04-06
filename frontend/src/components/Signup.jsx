import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstName || !lastName || !emailId || !password) {
      setError("All fields are required");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
        skills: []
      }, { withCredentials: true });
      
      dispatch(addUser(res.data.data));
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
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2 code-text">
            <span className="text-primary">&#60;</span>
            DevSwipe
            <span className="text-primary">/&#62;</span>
          </h1>
          <p className="text-sm opacity-70">Join the developer community</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input 
                type="text" 
                className="dev-input w-full" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="John" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input 
                type="text" 
                className="dev-input w-full" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Doe" 
              />
            </div>
          </div>
          
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
            <p className="text-xs mt-1 opacity-70">
              Password must contain uppercase, lowercase, number, and special character
            </p>
          </div>
          
          {error && <div className="text-error text-sm py-2">{error}</div>}
          
          <button 
            onClick={handleSignup} 
            disabled={isLoading}
            className="dev-button w-full bg-primary hover:bg-primary-focus text-white py-2 mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
          
          <div className="text-center text-sm mt-4">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 