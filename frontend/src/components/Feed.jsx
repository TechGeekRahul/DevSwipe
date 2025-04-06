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

  if (isLoading) return <div className='flex justify-center my-10'>Loading...</div>;
  if (!feed) return <div className='flex justify-center my-10'>Loading...</div>;
  
  if (!feed.data || feed.data.length === 0) {
    return (
      <div className='flex flex-col items-center my-10'>
        <h1 className='mb-4'>No users found</h1>
        <button 
          className='btn btn-primary' 
          onClick={() => getFeed(true)}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    );
  }

  return (
    <div className='flex justify-center my-10'>
      <Card user={feed.data[0]} />
    </div>
  )
}

export default Feed
