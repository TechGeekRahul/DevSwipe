import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connectionData = useSelector((store)=>store.connections)
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchConnections =async ()=>{
        setIsLoading(true);
        try {
            const res = await axios.get(BASE_URL + "/user/connections",{withCredentials : true});
            dispatch(addConnections(res.data.data))
        } catch (error) {
            console.error("Error fetching connections:", error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg opacity-70">Loading connections...</p>
                </div>
            </div>
        );
    }
    
    if(!connectionData) return;
    if(connectionData.length === 0) return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="bg-card-bg rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-4 code-text">No Connections Yet</h1>
                <p className="opacity-70 mb-6">Start connecting with other developers to build your network.</p>
                <a href="/" className="dev-button bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-md inline-block">
                    Find Developers
                </a>
            </div>
        </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center code-text">
            <span className="text-primary">Your</span> Developer <span className="text-secondary">Network</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connectionData.map((connection, index) => {
                const {firstName,lastName,photoUrl,age,gender,about,skills} = connection;
                return(
                    <div key={index} className="dev-card bg-card-bg overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/3 overflow-hidden">
                            <img className="w-full h-40 md:h-full object-cover" src={photoUrl} alt={`${firstName}'s profile`} />
                        </div>
                        
                        <div className="p-6 md:w-2/3">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold code-text">{firstName} {lastName}</h2>
                                {age && gender && <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{age} • {gender}</span>}
                            </div>
                            
                            <p className="opacity-80 text-sm mb-4 line-clamp-2">{about}</p>
                            
                            {skills && skills.length > 0 && (
                                <div className="mt-auto">
                                    <h3 className="text-xs uppercase tracking-wide opacity-70 mb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {skills.slice(0, 5).map((skill, i) => (
                                            <span key={i} className="text-xs bg-primary/20 px-2 py-1 rounded-full">{skill}</span>
                                        ))}
                                        {skills.length > 5 && (
                                            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">+{skills.length - 5} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Connections
