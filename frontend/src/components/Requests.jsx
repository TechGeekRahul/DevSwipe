import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addRequest} from "../utils/requestSlice"

const Requests = () => {
    const dispatch = useDispatch();
    const requestData = useSelector((store)=>store.requests)
    // console.log(requestData)
    const fetchRequests =async ()=>{
        const res = await axios.get(BASE_URL + "/user/requests/recieved",{withCredentials : true});
        // console.log(res);
        dispatch(addRequest(res.data.data))
    }
    useEffect(()=>{
        fetchRequests();
    },[])
    if(!requestData) return;
    if(requestData.length === 0) return <h1>No requests found</h1>

  return (
    <div className='justify-between text-center my-10'>
     <h1 className='text-bold text-2xl'>Requests</h1>
     {requestData.map((request)=>{
        const {firstName,lastName,photoUrl,age,gender,about} = request.fromUserId;
        return(
            <div className='flex justify-around m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto '>
                <div><img className='w-16 h-16 rounded-full' src={photoUrl} alt='photo' /></div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + "," + gender}</p>}
                    <p>{about}</p>
                </div>
                <div className=' flex '>
                <button className="btn btn-primary mx-2 mt-2.5">Primary</button>
                <button className="btn btn-secondary mt-2.5">Secondary</button>
                </div>
            </div>
        )
     })}
    </div>
  )
}

export default Requests;
