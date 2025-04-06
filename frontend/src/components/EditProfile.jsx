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
const [isLoading, setIsLoading] = useState(false)
const dispatch = useDispatch();
const navigate = useNavigate();

const handleAddSkill = () => {
  if (!newSkill.trim()) return;
  

  if (skills.some(skill => skill.toLowerCase() === newSkill.toLowerCase())) {
    setError("This skill is already added");
    return;
  }
  

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
    setIsLoading(true);
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
    } finally {
        setIsLoading(false);
    }
}
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 code-text">
        <span className="text-primary">Edit</span> Your Profile
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card-bg rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input 
                  type="text" 
                  className="dev-input w-full" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="First Name" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="dev-input w-full" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder="Last Name" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image URL</label>
              <input 
                type="text" 
                className="dev-input w-full" 
                value={photoUrl} 
                onChange={(e) => setPhotoUrl(e.target.value)} 
                placeholder="https://..." 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input 
                  type="number" 
                  className="dev-input w-full" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  placeholder="Enter Age" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <div className="relative">
                  <select
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                    className="dev-input w-full appearance-none pr-8"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0L10 10.405l2.908-2.857c.533-.481 1.141-.446 1.576 0 .436.445.408 1.197 0 1.642l-3.692 3.633c-.533.481-1.141.446-1.576 0L5.516 9.19c-.408-.445-.436-1.197 0-1.642z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">About</label>
              <textarea 
                className="dev-input w-full min-h-[100px]" 
                value={about} 
                onChange={(e) => setAbout(e.target.value)} 
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Skills <span className="text-xs opacity-70">({skills.length}/10)</span>
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="dev-input flex-grow" 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)} 
                  placeholder="Add a skill" 
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button 
                  className="bg-primary hover:bg-primary-focus text-white px-4 py-2 rounded transition dev-button"
                  onClick={handleAddSkill}
                  disabled={skills.length >= 10}
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-700 rounded-full px-3 py-1 text-sm flex items-center">
                    {skill}
                    <button 
                      className="ml-2 text-gray-400 hover:text-white focus:outline-none"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {error && <div className="text-error text-sm py-2">{error}</div>}
            
            <div className="flex justify-center">
              <button 
                className="dev-button bg-gradient-to-r from-primary to-secondary text-white px-8 py-2 rounded-md"
                onClick={handleEdit}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Card user={{firstName, lastName, age, gender, about, photoUrl, skills}} />
        </div>
      </div>
      
      {showToast && (
        <div className="fixed top-4 right-4 bg-success text-white px-4 py-2 rounded shadow-lg">
          Profile updated successfully
        </div>
      )}
    </div>
  )
}

export default EditProfile
