'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { usePathname,  } from 'next/navigation';
import { VeeContext } from '../context/Chatcontext';
const Landingnav = ({hidelinks}) => {
  const { userprofile } = useContext(VeeContext);
  const [isActive, setIsActive] = useState(false);
  const handleOverlayClick = () => {
    setIsActive(!isActive);
    console.log('hellloooooooo')
  };
  const pathname = usePathname();
  return (

    <>
        <header >
    <div className="herocontainer" id="header">
      <Link href="/" className="mylogo">
      <img src= '/logo1.png' alt=""  /> <div className='pbs'>Vee<span>Seats</span></div>  
      </Link>
      <div className="menu-toggle" >
      <span className="material-symbols-outlined" onClick={handleOverlayClick}>
density_medium
</span>
      </div>
      {!hidelinks && (
              <div className={`links ${isActive ? 'linksactive' : 'links'}`}>
              <Link href="/veeseats/about-us"  className={` ${pathname === '/veeseats/about-us' ? 'navlinkactive' : ''}`}>About </Link>
          
        
              <Link href="/veeseats/service"  className={` ${pathname === '/veeseats/service' ? 'navlinkactive' : ''}`} >
                  Businesses
                  {/* <img className="arrow" src="./assets/arrowdown.svg" alt="" /> */}
                </Link>
     
          
              <a href="#" >Careers</a>
              <Link href="/veeseats/pricing" className={` ${pathname === '/veeseats/pricing' ? 'navlinkactive' : ''}`}>Pricing </Link>
              <Link href="/veeseats/insights" className={` ${pathname === '/veeseats/insights' ||  pathname.startsWith('/veeseats/insights')  ?   'navlinkactive' : ''}`} >Research</Link>
              <Link href="/veeseats/Training" className={` ${pathname === '/veeseats/Training' ? 'navlinkactive' : ''}`}>Trainings</Link>
              <Link href="/veeseats/contact-us" className={` ${pathname === '/veeseats/contact-us' ? 'navlinkactive' : ''}`}>Contact-Us</Link>
             
             
              <Link href={'/auth/login'} className="login restrict">
              {userprofile.user ? (userprofile?.user?.first_name + ' ' + userprofile?.user?.last_name) : 'Login' }
              </Link>
      
            </div>
      )}

{!hidelinks && (
      <Link href={'/auth/login'} className="login restrict">
         {userprofile.user ? (userprofile?.user?.first_name) : 'Login' }
      </Link>
)}
    </div>
  </header>
       <div className={`overlay ${isActive ? 'overlayshow ovvvvvvs' : ''}`} onClick={handleOverlayClick} />
    
    </>

  
  )
}

export default Landingnav