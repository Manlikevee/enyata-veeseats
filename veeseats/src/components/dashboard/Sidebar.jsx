
import React, { useRef , useState, useContext, useEffect} from 'react'
import { usePathname,  } from 'next/navigation';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import Postrole from '../Postrole';
import Individualsidelinks from './Individualsidelinks';
import Corporatesidelinks from './Corporatesidelinks';
import Toggleicon from '../Toggleicon';
import { toast } from 'sonner'
import { VeeContext } from '../context/Chatcontext';
import Mylogocomponent from '../Mylogocomponent';
import Profileupdatesidebar from './Profileupdatesidebar';
import { jwtDecode } from 'jwt-decode';
import Eventssidelink from './Eventssidelink';
const Sidebar = ({isSidebarOpen,  toggleSidebar}) => {
    const pathname = usePathname();
    const [windowHeight, setWindowHeight] = useState(); // Initial state set to 0
    const [isLoading, setIsloading] = useState(false);
    const { userdata , axiosInstance, optimizeBusinessDescription, individualsdata, userprofile, profileloaded} = useContext(VeeContext);
    const router = useRouter()
    const logout = () => {
      // alert('hjello')
      const allCookies = Cookies.get();
    
      // Remove each cookie
      for (const cookie in allCookies) {
        Cookies.remove(cookie);
      }
  
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      toast.success(`See You Soon`);
      
      router.replace('/auth/login')
      window.location.href = '/auth/login';
      
    }

    useEffect(() => {
      let accessToken = Cookies.get("access_token");
      const decodedToken = jwtDecode(accessToken);
      if (pathname !== '/accounts/accountupdate' && userprofile && !userprofile.profile_verified && userdata && !userdata.is_corporate && profileloaded && accessToken && !decodedToken.is_corporate   ) {
        console.log(userdata)
        router.replace('/accounts/accountupdate');
        toast.info('Kindly Complete Your Profile Update')
      }
    }, [ profileloaded]);


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
  
    const divStyle = {
      height: `${windowHeight}px`,
       // Add any other styling you need
    };
function testfunction(){
  setIsloading(!isLoading);
  if(isSidebarOpen){
    toggleSidebar()
  }

}

  return (
    <>
    {isLoading && (<Postrole testfunction={testfunction}/> )}
    <div className={`sidebar ${isSidebarOpen ? 'sidebarshow' : ''}`} id="sidebar" style={divStyle}>
          <div className="close" onClick={toggleSidebar}>
          <Toggleicon/>
    </div>
            <div className="sidebardatas">
      {/* <div className="sidebarlogo">


  
      </div> */}

      <div className='mybglogoimg'>   <Mylogocomponent /></div> 
    </div>


        <div className="sidebardatas">

        {pathname.startsWith('/accounts/accountupdate') ? (
  <Profileupdatesidebar />
) : pathname.startsWith('/corporate/events') ? (
  <Eventssidelink testfunction={testfunction} />
) : (
  <>
    {(pathname.startsWith('/corporate') || individualsdata?.is_corporate) ? (
      <Corporatesidelinks testfunction={testfunction} />
    ) : (
      <Individualsidelinks testfunction={testfunction} />
    )}
  </>
)}
 



    </div>

    <div className="messagesettings">
      <div className="logoutbtn" onClick={logout}>
        <div className="dashflex">
          <div className="icon">
            <span className="material-symbols-outlined"> logout </span>
          </div>
          <div className="messagetext">Logout</div>
        </div>
      </div>
    </div>

    </div>
    </>
  
  )
}

export default Sidebar