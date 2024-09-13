import React, { useRef } from 'react'
import { usePathname,  } from 'next/navigation';
import Link from 'next/link';


const Individualsidelinks = ({testfunction}) => {
    const pathname = usePathname();
    const dropdownContentRef = useRef(null);
    const dropdown = () => {
  
        const dropdownContent = dropdownContentRef.current;
        dropdownContent.classList.toggle('dropdownshow');
    
        // Calculate the height of the dropdown content based on its actual content
        if (dropdownContent.classList.contains('dropdownshow')) {
          dropdownContent.style.height = dropdownContent.scrollHeight + 'px';
        } else {
          dropdownContent.style.height = '0px';
        }
      };
  return (
    <div className="sidebardatasflex">
        
    <Link href="/Individual/dashboard" className={`dashflex ${pathname === '/Individual/dashboard' ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> Dashboard </span>
      </div>
      <div className="dashflextext">Dashboard </div>
    </Link>

    <Link href="/find-a-role" className={`dashflex ${pathname === '/find-a-role' ||  pathname.startsWith('/view-role/')  ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> search </span>
      </div>
      <div className="dashflextext">Find a role</div>
    </Link>

    <Link href="/user-applications" className={`dashflex ${pathname === '/user-applications' ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> stacks </span>
      </div>
      <div className="dashflextext">Applications</div>
    </Link>
    <div>


    </div>

    {/* <Link href="/integrations" className={`dashflex ${pathname === '/integrations' ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> headset_mic
</span>
      </div>
      <div className="dashflextext">Services</div>
    </Link> */}

    <div>
      <Link href="#" className={`dashflex ${pathname.startsWith('/services')||  pathname === '/visitorslist' ||  pathname === '/analytics' ? 'active' : ''}`}    onClick={dropdown}>
        <div className="dashflexicon">
          <span className="material-symbols-outlined"> headset_mic </span>
        </div>
        <div className="dashflextext">Services Module</div>
    
        <span  className="ends material-symbols-outlined">
          expand_more
          </span>
      </Link>
      <div className="dropdowncontent" id="ddown" ref={dropdownContentRef}>
        <div className="innerdashflexs" >
          <Link href="/ai/interviewprep" className="dashflex" >
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                nest_doorbell_visitor
                </span>
            </div>
            <div className="dashflextext">Interview Prep (Beta)</div>
          </Link>
          <Link href="/services/role-match" className={`dashflex ${pathname === '/services/role-match' ? 'activesub' : ''}`}>
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                store
                </span>
            </div>
            <div className="dashflextext"> Role Match </div>
          </Link>
          
          <Link href="/services/ourservices" className={`dashflex ${pathname === '/services/ourservices' ? 'activesub' : ''}`}>
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                fact_check
                </span>
            </div>
            <div className="dashflextext">Our Services</div>
          </Link>
    

    

      
        </div>
      
      </div>
    </div>

    <Link href="/inbox" className={`dashflex ${pathname === '/inbox' ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> chat_bubble </span>
      </div>
      <div className="dashflextext">Inbox</div>
    </Link>
    
    <Link href="/user-profile" className={`dashflex ${pathname === '/user-profile' ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> person </span>
      </div>
      <div className="dashflextext">Profile</div>
    </Link>



    <Link href="/settings" className={`dashflex ${pathname.startsWith('/settings') || pathname.startsWith('/subscription') ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> settings </span>
      </div>
      <div className="dashflextext">Settings</div>
    </Link>
  </div>
  )
}

export default Individualsidelinks