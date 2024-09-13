import React from 'react'

const Productivitybox = ({title, number}) => {
  return (
    <div className='prodbx'>
        <div className="prodt">{title}</div>
        <div className="prodbody">
           <span>+</span>  {number}K
        </div>
    </div>
  )
}

export default Productivitybox