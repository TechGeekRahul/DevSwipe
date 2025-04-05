import React from 'react';


const Card = ({user}) => {
  const {firstName,lastName,about,photoUrl,age,gender,skills} = user;
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title flex justify-center">{firstName + " " + lastName}</h2>
    <p className=' flex justify-center mb-1'>{about}</p>

    <div className="card-actions justify-around">
    <button className="btn btn-primary">Ignore</button>
      <button className="btn bg-pink-500">Interested</button>
    </div>
  </div>
</div>
  )
}

export default Card
