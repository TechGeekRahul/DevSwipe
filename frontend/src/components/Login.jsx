import React, { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';



const Login = () => {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const [error,setError] = useState("")
const dispatch = useDispatch();
const navigate = useNavigate()

  const handleLogin = async()=>{
  try {
    const res = await axios.post(BASE_URL + "/login",{
      emailId,
      password
    },{withCredentials: true})
    dispatch(addUser(res.data))
    navigate("/");

  } catch (error) {
    setError(error?.response?.data || "Something went wrong")
    console.error(error)
  }

  }


  return (
    <div className=' flex justify-center'>
    <div className="card bg-base-300 w-96 shadow-sm my-10 ">
    <h1 className=' flex justify-center pt-5 text-3xl font-bold'>Login</h1>
      
    <div className="card-body">
      <p>Email</p>
    <input type="text" className="input" value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} placeholder="Enter Email" />
    <p>Password</p>
    <input type="password" className="input" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" />
    <p className='text-red-500'>{error}</p>
      <div className="card-actions flex justify-center mt-0">
        <button onClick={handleLogin} className="btn btn-primary ">Login</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login;