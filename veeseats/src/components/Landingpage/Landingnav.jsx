'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname,  } from 'next/navigation';
const Landingnav = ({hidelinks}) => {
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
              <div className="menu">
        
              <Link href="/veeseats/service"  className={` ${pathname === '/veeseats/service' ? 'navlinkactive' : ''}`} >
                  Businesses
                  {/* <img className="arrow" src="./assets/arrowdown.svg" alt="" /> */}
                </Link>
                <div className="dropDown">
                  <a href="ical.html">iCal</a>
                  <a href="iamlhome.html">Iaml</a>
                </div>
              </div>
              <a href="#" >Careers</a>
              <Link href="/veeseats/pricing" className={` ${pathname === '/veeseats/pricing' ? 'navlinkactive' : ''}`}>Pricing </Link>
              <Link href="/veeseats/insights" className={` ${pathname === '/veeseats/insights' ||  pathname.startsWith('/veeseats/insights')  ?   'navlinkactive' : ''}`} >Research</Link>
              <Link href="/veeseats/contact-us" className={` ${pathname === '/veeseats/contact-us' ? 'navlinkactive' : ''}`}>Contact-Us</Link>
              <Link href={'/auth/login'} className="login">Login</Link>
      
            </div>
      )}

{!hidelinks && (
      <Link href={'/auth/login'} className="login">Login</Link>
)}
    </div>
  </header>
       <div className={`overlay ${isActive ? 'overlayshow ovvvvvvs' : ''}`} onClick={handleOverlayClick} />
    
    </>

  
  )
}

export default Landingnav