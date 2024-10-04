'use client'
import Rolecard from '@/components/Rolecard';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter'
import React, { useEffect, useRef , useState, useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import LazyJobcard from '@/components/Lazyloading/LazyJobcard';

import { useParams } from 'next/navigation';
import Lazytext from '@/components/Lazyloading/Lazytext';
const page = () => {
  const {LoadingApplication_detail, fetchApplication_detail } = useContext(VeeContext);
  const [Jdiscription, setJdescription] = useState([]);
    const [activeTab, setActiveTab] = useState(0); // Set the first tab as active by default

    const tabs = [
      { id: 0, label: 'Saved Roles' },
 
    ];
    const { id } = useParams();
  
    useEffect(() => {
      if (id) {
        const fetchjob = async () => {
          try {
            // setLoadingcards(true);
            const response = await fetchApplication_detail(id);
            console.log(response);
            setJdescription(response)
          } catch (error) {
            console.error("Error fetching job details:", error);
          } finally {
            // setLoadingcards(false);
          }
        };
  
        fetchjob();
      }
    }, [id]);

  return (
      <Layout>

<div className="dashboard">
 <p></p>
<h3></h3>

 <div className="tabs">
        {tabs.map((tab) => (
          <h4
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'activetab' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </h4>
        ))}
      </div>
  


  
      {/* <Rolefilter/> */}
      <>

      <div>
          <div>
               {/* <h3>My Applied Roles</h3> */}
               <div className="overview-text-subheader">
               Effortlessly handle your billing and invoices right here.
               </div>
               </div>
{/* <br /> */}
<div className="invoicetableflex">
<div className="invoicetable tablehead apptab">
                <div className="invdata invdatalarge">User</div>
                <div className="invdata">industry</div>
                <div className="invdata">location</div>
                <div className="invdata ">Date Applied</div>
                <div className="invdata invdatamed">match %</div>
                <div className="invdata"> Status</div>
                <div className="invdata invdatasmall"> <span className="material-symbols-outlined">
                more_horiz
</span> </div>
               </div>

{LoadingApplication_detail && (
                   <div className="invoicetable apptab">
                   <div className="invdata invdatalarge">
                   <div className="accflx">
     <img src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png' className="init"/>
     <div className="accnames">
       <div className="name"><div className='shimmer lngr '> <Lazytext size={3}/> </div> </div>
       <small className="emails"><div className='shimmer lngr'> <Lazytext size={3}/> </div></small>
     </div>
   </div>
   
                   </div>
                   <div className="invdata ">
                   <div className="eid"><div className='shimmer '> <Lazytext size={3}/> </div></div>
                   </div>
                   <div className="invdata">
                   <div className="accnames">
       <div className="name"><div className='shimmer '> <Lazytext size={3}/> </div> </div>
       <small className="email"><div className='shimmer '> <Lazytext size={3}/> </div></small>
     </div>
                   </div>
                   <div className="invdata "> 
                   <div className='shimmer '> <Lazytext size={3}/> </div></div>
                   <div className="invdata invdatamed"><div className='shimmer '> <Lazytext size={3}/> </div></div>
                   <div className="invdata"><span className='paid'><div className='shimmer '> <Lazytext size={3}/> </div></span></div>
                   <div className="invdata invdatasmall"><span className="material-symbols-outlined">
                   more_horiz
   </span></div>
                  </div>
)}

{Jdiscription?.length > 0 && (
  <>   
    {Jdiscription.map((item, index) => (
               <div className="invoicetable apptab" key={index}>
                <div className="invdata invdatalarge">
                <div className="accflx">
  <img src={item?.individual_profile?.avatar || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png'}  className="init"/>
  <div className="accnames">
    <div className="name">{item?.individual_profile?.user?.first_name || 'john'} { '  ' } {item?.individual_profile?.user?.last_name || 'doe'}   </div>
    <small className="emails">{item?.individual_profile?.user?.email || 'blank@blank.com'}</small>
  </div>
</div>

                </div>
                <div className="invdata "> <div className="eid">Technology</div>  </div>
                <div className="invdata">
                <div className="accnames">
    <div className="name">{item?.individual_profile?.city || 'Lagos'} </div>
    <small className="email">{item?.individual_profile?.region || 'Ikeja'}</small>
  </div>
                </div>
                <div className="invdata ">23-04-2024 {new Date(item?.created_at).toLocaleString('en-US', { month: 'short', year: 'numeric' })}  </div>
                <div className="invdata invdatamed"><progress value={item?.applicationreview?.matchscore || '0'} max="100"></progress>  {item?.applicationreview?.matchscore || '0'} %</div>
                <div className="invdata"><span className='paid'>{item?.application_status}</span></div>
                <div className="invdata invdatasmall"><span className="material-symbols-outlined">
                more_horiz
</span></div>
               </div>
      ))
    }
  </>
)}


               
</div>
          
          </div>
      </>



    </div>
    </Layout>
  )
}

export default page