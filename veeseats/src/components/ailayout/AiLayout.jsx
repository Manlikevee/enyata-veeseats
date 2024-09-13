'use client'
import React, { useRef , useState, useContext, useEffect} from 'react'
import Landingnav from '../Landingpage/Landingnav';

const AiLayout = ({children, hidelinks, nooverflow}) => {
    const [windowHeight, setWindowHeight] = useState(); // Initial state set to 0

    const divStyle = {
      height: `${windowHeight}px`,
      ...(nooverflow ? { overflow: 'hidden' } : {}) // Conditionally add overflow
    };

      useEffect(() => {
        // Function to update the height
        const handleResize = () => {
          setWindowHeight(window.innerHeight);
        };
    
        // Set the initial height when the component mounts
        handleResize();
    
        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return (
    <div className='ailayout' style={divStyle}>
          <Landingnav hidelinks={hidelinks} />
        {children}
    </div>
  )
}

export default AiLayout