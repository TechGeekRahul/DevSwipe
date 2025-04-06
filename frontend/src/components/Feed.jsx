import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios'
import Card from './Card'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  const [isLoading, setIsLoading] = useState(false);
  const [noUsersAvailable, setNoUsersAvailable] = useState(false);
  
  const getFeed = async(forceRefresh = false) => {
    // Reset the no users flag if force refreshing
    if (forceRefresh) {
      setNoUsersAvailable(false);
    }
    
    // Don't fetch if we already know there are no users available
    if (noUsersAvailable && !forceRefresh) return;
    
    // Always fetch if feed is empty or has no data
    if (forceRefresh || !feed || !feed.data || feed.data.length === 0) {
      setIsLoading(true);
      try {
        const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(res.data));
        
        // If we got data but it's empty, set the flag to prevent further calls
        if (!res.data || !res.data.data || res.data.data.length === 0) {
          setNoUsersAvailable(true);
        }
      } catch(error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    getFeed();
  }, [feed]); 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg opacity-70">Finding developers...</p>
        </div>
      </div>
    );
  }
  
  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg opacity-70">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!feed.data || feed.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 code-text">No Matches Found</h1>
          <p className="mb-6 opacity-70">We couldn't find any developers matching your profile right now.</p>
          <button 
            className="dev-button bg-primary text-white px-6 py-2"
            onClick={() => getFeed(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center code-text">
        <span className="text-primary">Find</span> Your Next Dev <span className="text-secondary">Connection</span>
      </h1>
      <Card user={feed.data[0]} />
    </div>
  );
}

export default Feed
