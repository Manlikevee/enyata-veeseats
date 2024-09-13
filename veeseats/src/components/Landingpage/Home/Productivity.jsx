import Productivitybox from '@/components/Productivitybox'
import React from 'react'

const Productivity = () => {
  return (
    <div className='productivity'>
        <div className="prodone">Our Productivity Performance</div>
        <div className="prodtwo"> 
        <Productivitybox title='Jobs' number={200}/>   <Productivitybox title='Start Ups' number={100}/>   <Productivitybox title='Recruitment' number={500}/>
        </div>
    </div>
  )
}

export default Productivity