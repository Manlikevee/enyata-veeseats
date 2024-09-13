import Productivitybox from '@/components/Productivitybox'
import React from 'react'

const Heropage = () => {
  return (
    <div className='hero'>
      <div className="herocontainer">
      <div className="heroflex">
        <div className="heroflexone">
          <div className="herotagline">
            #The world's leading Board Recruitment Platform
          </div>
          <h2 className='landingtitle'>Where Leading Agencies Recruit <span>Pre-verified</span> Board Members</h2>
        <div className="landing-text-sub">
        Optimize your board recruitment with VeeCruiter. Tap into a diverse pool of board-ready professionals. Position yourself effectively for the board role you seek. Achieve your leadership goals with ease
        </div>

        <div className="login">
          Get Started
        </div>
        </div>
        <div className="heroflextwo">
          <img src="/macbook.png" alt="" />
        </div>
      </div>
      </div>

    </div>
  )
}

export default Heropage