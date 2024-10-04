import Link from 'next/link'
import React from 'react'

const Landingpagecard = ({title, subtitle, image, reverse, cta, listitems, keypoints}) => {
  return (
    < div className={`twopiece twopiecetwo`}>
    <div className={`${reverse ? 'flexrev' : ''} heroflex`}>
          <div className="heroflexone">
 
            <h2 className='landingtitle lht'>{title}</h2>
          <div className="landing-text-sub">
{subtitle}
          </div>
        


{keypoints && (
  <div className="btlows">
  <div  className="myli story"><span className="material-symbols-outlined">
        radio_button_checked
        </span>Receive exclusive bonuses and incentives for successful referrals</div>
        <div  className="myli story"><span className="material-symbols-outlined">
        radio_button_checked
        </span>Help your friends find leadership roles that align with their skills and passions.</div>

        <div  className="myli story"><span className="material-symbols-outlined">
        radio_button_checked
        </span>Build a network of high-quality candidates and contribute to the growth of diverse boards.</div>
  </div>

)}

          {listitems && (
           <div className="minigrid">
            <div className="markbox">
            <div className="mark"><img src="illus/mark.png" alt="" /></div>
              <div className="marktext">Access Top Board-Ready Talent</div>
            </div>
            <div className="markbox">
            <div className="mark"><img src="illus/mark.png" alt="" /></div>
              <div className="marktext">Tailored Board Formation Services</div>
            </div>
            <div className="markbox">
              <div className="mark"><img src="illus/mark.png" alt="" /></div>
              <div className="marktext">Expert Guidance for Startups</div>
            </div>
            <div className="markbox">
            <div className="mark"><img src="illus/mark.png" alt="" /></div>
              <div className="marktext">Enhance Governance Efficiency</div>
            </div>
           </div>
          )} 

{cta &&   (
<Link href={'/auth/login'} className="login">
          {cta}
 </Link>
          )} 

          </div>
          <div className="heroflextwo">
            <img src={image} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Landingpagecard