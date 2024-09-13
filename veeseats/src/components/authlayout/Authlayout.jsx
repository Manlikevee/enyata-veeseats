import React from 'react'

const Authlayout = ({children}) => {
  return (
    <div className='authpage'>
        <div className="authbox">
        {children}
        </div>
        </div>
  )
}

export default Authlayout