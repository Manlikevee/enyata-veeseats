'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import Toggleicon from './Toggleicon';
import Mylogocomponent from './Mylogocomponent';

const Topnav = ({isSidebarOpen, isOverlayOpen, toggleSidebar, hidesidebartoggle} ) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleOverlayClick = () => {
    toggleSidebar();
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  
  return (
<div className="header">

      <div className='toplayer'>
      <div className="sidebarlogo topnavlogo">
      <div className='mybglogoimg'>   <Mylogocomponent hidetext /></div> 

      </div>
      <div className="searchbar">
    <span className="material-symbols-outlined">search</span>{" "}
    <input type="text" placeholder="Search anything here" />
  </div>
      </div>

  <div className="extraicons" >
    <div className="noti" >
      <span className="material-symbols-outlined">notifications</span>
    </div>

    <div className="avatar" onClick={toggleFullscreen}>
      <div className="pphoto">
        <img
          src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=626&ext=jpg"
          alt=""
        />
      </div>
    </div>

    <div className="noti grd" onClick={handleOverlayClick}>

<Toggleicon/>
    </div>

  </div>
</div>

  )
}

export default Topnav