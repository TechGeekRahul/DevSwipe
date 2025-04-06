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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
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
    }
  }

  return (
    <div className='flex justify-center'>
      <div className="card bg-base-300 w-96 shadow-sm my-10">
        <h1 className='flex justify-center pt-5 text-3xl font-bold'>Signup</h1>
        <div className="card-body">
          <p>First Name</p>
          <input 
            type="text" 
            className="input" 
            value={firstName} 
            onChange={(e) => { setFirstName(e.target.value) }} 
            placeholder="Enter First Name (min 5 characters)" 
          />
          
          <p>Last Name</p>
          <input 
            type="text" 
            className="input" 
            value={lastName} 
            onChange={(e) => { setLastName(e.target.value) }} 
            placeholder="Enter Last Name" 
          />
          
          <p>Email</p>
          <input 
            type="email" 
            className="input" 
            value={emailId} 
            onChange={(e) => { setEmailId(e.target.value) }} 
            placeholder="Enter Email" 
          />
          
          <p>Password</p>
          <input 
            type="password" 
            className="input" 
            value={password} 
            onChange={(e) => { setPassword(e.target.value) }} 
            placeholder="Enter Password (must be strong)" 
          />
          
          <p className='text-xs'>Password must contain uppercase, lowercase, number, and special character</p>
          <p className='text-red-500'>{error}</p>
          
          <div className="card-actions flex justify-center mt-0">
            <button onClick={handleSignup} className="btn btn-primary">Sign Up</button>
          </div>
          
          <div className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup; 