import React from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const Card = ({user}) => {
  const dispatch = useDispatch();
  
  const handleSendRequest = async(status, userId) => {
    try {
      console.log("Sending request with status:", status, "for user:", userId);
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId, 
        {}, 
        {withCredentials: true}
      );
      console.log("Request response:", res);
      
      dispatch(removeUserFromFeed(userId));
      console.log("User removed from feed");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  const {_id, firstName, lastName, about, photoUrl, age, gender, skills} = user;
  
  return (
    <div className="dev-card bg-card-bg max-w-md w-full mx-auto overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-primary to-secondary opacity-80"></div>
        <img 
          src={photoUrl} 
          alt={`${firstName}'s profile`} 
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold code-text">{firstName} {lastName}</h2>
          <div className="flex items-center text-sm opacity-75">
            <span>{age}</span>
            <span className="mx-1">•</span>
            <span>{gender}</span>
          </div>
        </div>
        
        <p className="mb-4 text-sm opacity-90 line-clamp-3">{about}</p>
        
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wide opacity-70 mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="dev-badge bg-primary/20 text-white text-xs px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-4">
          <button 
            className="dev-button flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition-all"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Pass
          </button>
          <button 
            className="dev-button flex-1 bg-gradient-to-r from-primary to-secondary text-white py-2 rounded transition-all"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
