import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connectionData = useSelector((store)=>store.connections)
    console.log(connectionData)
    const fetchConnections =async ()=>{
        const res = await axios.get(BASE_URL + "/user/connections",{withCredentials : true});
        // console.log(res);
        dispatch(addConnections(res.data.data))
    }
    useEffect(()=>{
        fetchConnections();
    },[])
    if(!connectionData) return;
    if(connectionData.length === 0) return <h1>No connections found</h1>

  return (
    <div className='justify-center text-center my-10'>
     <h1 className='text-bold text-2xl'>Connections</h1>
     {connectionData.map((connection)=>{
        const {firstName,lastName,photoUrl,age,gender,about} = connection;
        return(
            <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                <div><img className='w-20 h-20 rounded-full' src={photoUrl} alt='photo' /></div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + "," + gender}</p>}
                    <p>{about}</p>
                </div>
            </div>
        )
     })}
    </div>
  )
}

export default Connections
