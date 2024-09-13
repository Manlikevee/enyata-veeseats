import Link from 'next/link'
import React from 'react'

const Mylogocomponent = ({hidetext}) => {
  return (
    <Link href="/" className="mylogo">
    <img src= '/logo1.png' alt=""  /> {!hidetext && ( <div className='pbs'>Vee<span>Seats</span></div>)}  
    </Link>
  )
}

export default Mylogocomponent