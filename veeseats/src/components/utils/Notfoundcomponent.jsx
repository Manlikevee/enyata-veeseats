'use client'
import React from 'react'
import Lottie from "lottie-react";
import * as animationData from './animate1.json'

const Notfoundcomponent = () => {
  return (
    <div className="notfound">
   
  


<Lottie animationData={animationData} loop={true}  style={{  width: '300px' }}  />

    <div className="messageflextitle ">
    There's nothing to display right now. 
  
    </div>
  </div>
  )
}

export default Notfoundcomponent