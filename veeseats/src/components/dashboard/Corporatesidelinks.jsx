import React, { useRef } from 'react'
import { usePathname,  } from 'next/navigation';
import Link from 'next/link';

const Corporatesidelinks = ({testfunction}) => {
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
        
    <Link href="/corporate/dashboard" className={`dashflex ${pathname === '/corporate/dashboard' ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> Dashboard </span>
      </div>
      <div className="dashflextext">Dashboard </div>
    </Link>

    <Link href="#" className={`dashflex ${pathname === '/corporate/post-a-role' ||  pathname.startsWith('/view-role/')  ? 'active' : ''}`}  onClick={testfunction}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> post_add </span>
      </div>
      <div className="dashflextext">Post a role</div>
    </Link>

    <Link href="/corporate/applications" className={`dashflex ${pathname === '/corporate/applications' ||  pathname.startsWith('/corporate/applications/')   ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> lan </span>
      </div>
      <div className="dashflextext">Manage role posting</div>
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
      <Link href="#" className={`dashflex ${pathname.startsWith('/corporate/manage-applications')||  pathname === '/visitorslist' || pathname === '/find-a-role' ||  pathname.startsWith('/view-role/') ||  pathname === '/analytics' ? 'active' : ''}`}    onClick={dropdown}>
        <div className="dashflexicon">
          <span className="material-symbols-outlined"> settings_input_component </span>
        </div>
        <div className="dashflextext">Manage Applications</div>
    
        <span  className="ends material-symbols-outlined">
          expand_more
          </span>
      </Link>
      <div className="dropdowncontent" id="ddown" ref={dropdownContentRef}>
        <div className="innerdashflexs" >
          <Link href="/corporate/manage-applications/shopping-cart" className={`dashflex ${pathname === '/corporate/manage-applications/shopping-cart' ? 'activesub' : ''}`} >
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                nest_doorbell_visitor
                </span>
            </div>
            <div className="dashflextext">Shopping Cart</div>
          </Link>

          <Link href="/find-a-role" className={`dashflex ${pathname === '/find-a-role' ||  pathname.startsWith('/view-role/')  ? 'active' : ''}`}>
      <div className="dashflexicon">
        <span className="material-symbols-outlined"> search </span>
      </div>
      <div className="dashflextext">Find a role</div>
    </Link>

          <div href="#" className="dashflex">
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                store
                </span>
            </div>
            <div className="dashflextext"> Role Match </div>
          </div>
          
          <Link href="/services/ourservices" className={`dashflex ${pathname === '/services/ourservices' ? 'activesub' : ''}`}>
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                fact_check
                </span>
            </div>
            <div className="dashflextext">Our Services</div>
          </Link>
    
          <Link href="#" className="dashflex">
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                app_blocking
                </span>
            </div>
            <div className="dashflextext">BlackList Visitor</div>
          </Link>
    
          <Link href="/qrcode" className={`dashflex ${pathname === '/qrcode' ? 'activesub' : ''}`}>
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                qr_code_scanner
                </span>
            </div>
            <div className="dashflextext">ID Tags</div>
          </Link>

          <Link href="/auth/login" className={`dashflex ${pathname === '/auth/login' ? 'activesub' : ''}`}>
            <div className="dashflexicon">
              <span className="material-symbols-outlined">
                qr_code_scanner
                </span>
            </div>
            <div className="dashflextext">Analytics</div>
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

export default Corporatesidelinks