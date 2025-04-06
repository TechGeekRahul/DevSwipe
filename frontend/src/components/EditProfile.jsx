import React, { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import Card from "./Card"

const EditProfile = ({user}) => {
const [firstName , setFirstName] = useState(user.firstName);
const [lastName, setLastName] = useState(user.lastName);
const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
const [age,setAge] = useState(user.age);
const [about,setAbout] = useState(user.about);
const [gender,setGender] = useState(user.gender);
const [skills, setSkills] = useState(user.skills || []);
const [newSkill, setNewSkill] = useState("");
const [error,setError] = useState("");
const [showToast,setShowToast] = useState(false)
const dispatch = useDispatch();
const navigate = useNavigate();

const handleAddSkill = () => {
  if (!newSkill.trim()) return;
  
  // Check if skill already exists (case insensitive)
  if (skills.some(skill => skill.toLowerCase() === newSkill.toLowerCase())) {
    setError("This skill is already added");
    return;
  }
  
  // Check if max limit reached
  if (skills.length >= 10) {
    setError("You can't add more than 10 skills");
    return;
  }
  
  setSkills([...skills, newSkill.trim()]);
  setNewSkill("");
  setError("");
};

const handleRemoveSkill = (skillToRemove) => {
  setSkills(skills.filter(skill => skill !== skillToRemove));
};

const handleEdit = async() => {
    setError("");
    try {
        const res = await axios.patch(BASE_URL + "/profile/edit", {
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl,
            skills
        }, {withCredentials:true});
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    } catch (error) {
        setError(error?.response?.data);
    }
}
  return (
    <div className='flex justify-center'>
      <div className=' flex justify-center mr-8'>
    <div className="card bg-base-300 w-96 shadow-sm my-10 ">
    <h1 className=' flex justify-center pt-5 text-3xl font-bold'>Edit Profile</h1>
      
    <div className="card-body">
      <p>FirstName</p>
    <input type="text" className="input" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder="First Name" />
    <p>LastName</p>
    <input type="text" className="input" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder="Enter Your Last Name" />
    <p>PhotoUrl</p>
    <input type="text" className="input" value={photoUrl} onChange={(e)=>{setPhotoUrl(e.target.value)}} placeholder="First Name" />
    <p>Age</p>
    <input type="number" className="input" value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder="Enter Age" />
    <div className='flex'><span className='mt-3'>Gender</span>
    <details className="dropdown">
  <summary className="btn m-1">{gender}</summary>
  <ul className="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
  <li><a onClick={() => setGender("male")}>male</a></li>
<li><a onClick={() => setGender("female")}>female</a></li>
<li><a onClick={() => setGender("others")}>others</a></li>

  </ul>
</details>
</div>
    <p>About</p>
    <textarea className="textarea" value={about} onChange={(e)=>{setAbout(e.target.value)}} placeholder="Write About Yourself"></textarea>
    
    <div className="mt-4">
      <p>Skills ({skills.length}/10)</p>
      <div className="flex gap-2 mb-2">
        <input 
          type="text" 
          className="input flex-grow" 
          value={newSkill} 
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill" 
          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <button 
          className="btn btn-primary" 
          onClick={handleAddSkill}
          disabled={skills.length >= 10}
        >
          Add
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <div key={index} className="badge badge-primary gap-1">
            {skill}
            <button 
              className="btn btn-xs btn-circle" 
              onClick={() => handleRemoveSkill(skill)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
    
    <p className='text-red-500'>{error}</p>
      <div className="card-actions flex justify-center mt-0">
        <button className="btn btn-primary" onClick={handleEdit}>Submit</button>
      </div>
    </div>
  </div>
  </div>
  <Card className="my-10" user={{firstName,lastName,age,gender,about,photoUrl,skills}}/>
 {showToast &&  (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Successfully</span>
  </div>
</div>)}
    </div>
  )
}

export default EditProfile
