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
      
      // Dispatch the removeUserFromFeed action to update Redux store
      dispatch(removeUserFromFeed(userId));
      console.log("User removed from feed");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  const {_id, firstName, lastName, about, photoUrl, age, gender, skills} = user;
  
  return (
    <div className="card bg-base-300 w-80 shadow-sm h-4/5 mt-10">
      <figure>
        <img src={photoUrl} alt={`${firstName}'s photo`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-center">{firstName + " " + lastName}</h2>
        <div>
          <span className=''>{age + " ,"}</span>
          <span className=''>{gender}</span>
        </div>
        <p className='flex justify-center mb-1'>{about}</p>
        
        {skills && skills.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <span key={index} className="badge badge-primary badge-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions justify-around mt-2">
          <button 
            className="btn btn-primary" 
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button 
            className="btn bg-pink-500" 
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
