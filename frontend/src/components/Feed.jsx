import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios'
import Card from './Card'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  console.log(feed.data);
const getFeed = async()=>{
  if(feed) return;
try {
  const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
  // console.log(res.data)
    dispatch(addFeed(res.data))
}catch(error) {
  console.error(error)
}  
}

useEffect(()=>{
  getFeed()
},[])

  return (
    feed && (<div className='flex justify-center my-10'>
      <Card user={feed.data[0]} />
    </div>)
  )
}

export default Feed
