'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topnav from '../Topnav'

const Loginlayout = ({children, isSidebarOpen, isOverlayOpen, setIsSidebarOpen, setIsOverlayOpen}) => {


  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    setIsOverlayOpen((prevState) => !prevState);
  };

  return (
    <div>
         <div className={`overlay ${isOverlayOpen ? 'overlayshow' : ''}`} onClick={toggleSidebar} />
        <div className="container logincont">
        <Sidebar isSidebarOpen={isSidebarOpen} isOverlayOpen={isOverlayOpen} toggleSidebar={toggleSidebar} />

<div className="mydata">

  
{/* <Topnav isSidebarOpen={isSidebarOpen} isOverlayOpen={isOverlayOpen} toggleSidebar={toggleSidebar}/> */}


    {children}


</div>
        </div>

    </div>
  )
}

export default Loginlayout