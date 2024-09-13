import React from 'react'

const Registerlayout = ({children}) => {
  return (
    <div className='authpage'>
    <div className="authbox registerbox">
    {children}
    </div>
    <br />
    <br />
    </div>
  )
}

export default Registerlayout