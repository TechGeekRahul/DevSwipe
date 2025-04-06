import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addRequest, removeRequest} from "../utils/requestSlice"

const Requests = () => {
    const dispatch = useDispatch();
    const requestData = useSelector((store)=>store.requests)
    const [isLoading, setIsLoading] = useState(true);
    const [actionInProgress, setActionInProgress] = useState(null);
    
    const fetchRequests =async ()=>{
        setIsLoading(true);
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved",{withCredentials : true});
            dispatch(addRequest(res.data.data))
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const reviewRequests = async(status,_id)=>{
        setActionInProgress(_id);
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{}, {withCredentials : true});
            dispatch(removeRequest(_id))
        } catch (error) {
            console.error("Error reviewing request:", error);
        } finally {
            setActionInProgress(null);
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg opacity-70">Loading requests...</p>
                </div>
            </div>
        );
    }

    if (!requestData || requestData.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="bg-[#182333] rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-4 code-text">No Connection Requests</h1>
                    <p className="opacity-70 mb-6">You don't have any pending connection requests at the moment.</p>
                    <a href="/" className="dev-button bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-md inline-block">
                        Discover Developers
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-10 text-center code-text">
                <span className="text-primary">Connection</span> Requests
            </h1>
            
            <div className="space-y-6">
                {requestData.map((request)=>{
                    const {firstName,lastName,photoUrl,age,gender,about,skills} = request.fromUserId;
                    return(
                        <div 
                            key={request._id} 
                            className="bg-[#182333] rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="p-1 bg-gradient-to-r from-primary to-secondary"></div>
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="sm:w-1/4 flex justify-center">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
                                            <img 
                                                className="w-full h-full object-cover" 
                                                src={photoUrl} 
                                                alt={`${firstName}'s profile`} 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="sm:w-3/4">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                                            <h2 className="text-xl font-bold code-text">{firstName} {lastName}</h2>
                                            {age && gender && <span className="text-xs bg-gray-700 px-2 py-1 rounded-full mt-1 sm:mt-0">{age} • {gender}</span>}
                                        </div>
                                        
                                        <p className="opacity-80 text-sm mb-4">{about}</p>
                                        
                                        {skills && skills.length > 0 && (
                                            <div className="mb-4">
                                                <h3 className="text-xs uppercase tracking-wide opacity-70 mb-2">Skills</h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {skills.map((skill, i) => (
                                                        <span key={i} className="text-xs bg-primary/20 px-2 py-1 rounded-full">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button 
                                                className="dev-button bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded"
                                                onClick={()=>{reviewRequests("rejected",request._id)}}
                                                disabled={actionInProgress === request._id}
                                            >
                                                {actionInProgress === request._id ? 'Processing...' : 'Decline'}
                                            </button>
                                            <button 
                                                className="dev-button bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 rounded"
                                                onClick={()=>{reviewRequests("accepted",request._id)}}
                                                disabled={actionInProgress === request._id}
                                            >
                                                {actionInProgress === request._id ? 'Processing...' : 'Accept'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Requests;
