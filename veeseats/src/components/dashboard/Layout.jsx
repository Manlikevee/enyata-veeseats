'use client'
import React, {useEffect, useState, useContext } from 'react'
import Sidebar from './Sidebar'
import Topnav from '../Topnav'
import Pageloader from '../Pageloader'
import { usePathname,  } from 'next/navigation';
import { VeeContext } from "@/components/context/Chatcontext";
const Layout = ({children}) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const {
    hideLoader, 
    setHideLoader,
    loaderVisible, 
    setLoaderVisible,
    userprofile,
    profileloaded
   } = useContext(VeeContext);



  useEffect(() => {
    if (!hideLoader) {
      const handlePageLoad = () => {
        // Start sliding out the loader
        setTimeout(() => {
          setHideLoader(true); // Slide out the loader
          setLoaderVisible(false); // Completely hide the loader after 3 seconds
        }, 3000);
      };

      // Check if the page has already loaded
      if (document.readyState === 'complete') {
        handlePageLoad();
      } else {
        // Listen for the load event if the page is still loading
        window.addEventListener('load', handlePageLoad);
      }

      // Cleanup the event listener
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [hideLoader]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    setIsOverlayOpen((prevState) => !prevState);
  };

  return (
    <div>
       {loaderVisible && profileloaded  && (

          <Pageloader  hideLoader={hideLoader} />
   
      )}
      
         <div className={`overlay ${isOverlayOpen ? 'overlayshow' : ''}`} onClick={toggleSidebar} />
        <div className="container">
        <Sidebar isSidebarOpen={isSidebarOpen} isOverlayOpen={isOverlayOpen} toggleSidebar={toggleSidebar} />

<div className="mydata">
 
    <Topnav isSidebarOpen={isSidebarOpen} isOverlayOpen={isOverlayOpen} toggleSidebar={toggleSidebar}/>

    {children}


</div>
        </div>

    </div>
  )
}

export default Layout