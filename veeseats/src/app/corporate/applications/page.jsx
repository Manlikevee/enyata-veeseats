'use client'
import Applicationtable from '@/components/Table/Applicationtable';
import { VeeContext } from '@/components/context/Chatcontext';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter';
import React, { useState, useContext } from 'react'

const page = () => {
  const [activeTab, setActiveTab] = useState(0); // Set the first tab as active by default
  // const applications = generateRandomJobs(19);;
  const { fetchcompanyJobs, companyJobs, individualsdata, axiosInstance } = useContext(VeeContext);



  const tabs = [
    { id: 0, label: 'All' },
    { id: 1, label: 'Open Roles' },
    { id: 2, label: 'Unpublished Roles' },
    { id: 3, label: 'All Applications' },

  ];
  return (
    <Layout>

    <div className="dashboard">
        <p></p>
   <p></p>
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
        {activeTab === 0 && (
        <div>
        <div>
             {/* <h4 cl>My Applied Roles</h4> */}
             <div className="overview-text-subheader">
             {/* Effortlessly handle your billing and invoices right here. */}
             </div>
             </div>

<div className="invoicetableflex">
<div className="invoicetable tablehead">
              <div className="invdata">Role Title</div>
              <div className="invdata">date created</div>
              <div className="invdata">Role status</div>
              <div className="invdata">Location</div>
              <div className="invdata">Application Status</div>
             </div>
             {companyJobs.length > 0 && (
  <>
    {companyJobs.map((item) => (
     
      <Applicationtable
        key={item.ref} // Use a unique key like 'item.ref'
        jobtitle={item.jobtitle}
        myref={item.ref}
        axiosInstance={axiosInstance}
        userdata={individualsdata}
        jobservice={item.jobservice}
        location_state={item.joblocation}
        location_lga={item.selected_lga}
        status={item.is_paidfor}
      />
    ))}
  </>
)}



             <div className="invoicetable">
              <div className="invdata">
                <div className="twostep">
                  <div className="stepone">Director</div>
                  <div className="dservice">Financial Services</div>
                </div>
              </div>
              <div className="invdata">
              <div className="twostep">
                  <div className="stepone">15-April-2024</div>
                 
                </div>
              </div>
              <div className="invdata">
              <div className="twostep">
                  <div className="stepone tablepill failed"><span className="material-symbols-outlined">
radio_button_checked
</span>  Open</div>
                  <div className="dservice">15-April-2024</div>
                </div>
              </div>
              <div className="invdata">              
               <div className="twostep">
                  <div className="stepone">Lagos</div>
                  <div className="dservice">Nigeria</div>
                </div>
                </div>
              <div className="invdata">
                <button className='mybtn'>Close Role</button>
              </div>
             </div>
             
</div>
        
        </div>
        )}
        {activeTab === 1 && 
        
        <div>
          <div>
               {/* <h4>My Applied Roles</h4> */}
               <div className="overview-text-subheader">
               {/* Effortlessly handle your billing and invoices right here. */}
               </div>
               </div>

<div className="invoicetableflex">
<div className="invoicetable tablehead">
                <div className="invdata">Role Title</div>
                <div className="invdata">date created</div>
                <div className="invdata">Role status</div>
                <div className="invdata">Location</div>
                <div className="invdata">Application Status</div>
               </div>

               {companyJobs.length > 0 && (
  <>   
    {companyJobs
      .filter(item => item.is_paidfor === true)  // Filter jobs where is_paidfor is true
      .map((item, index) => (
        <Applicationtable 
          jobtitle={item.jobtitle} 
          jobservice={item.jobservice} 
          location_state={item.joblocation} 
          location_lga={item.selected_lga} 
          status={item.is_paidfor}  
          key={index}
          userdata={individualsdata}
          axiosInstance={axiosInstance}
          myref = {item.ref}
        />
      ))
    }
  </>
)}


               
</div>
          
          </div>}

          {activeTab === 2 && 
        
        <div>
          <div>
               {/* <h4>My Applied Roles</h4> */}
               <div className="overview-text-subheader">
               {/* Effortlessly handle your billing and invoices right here. */}
               </div>
               </div>

<div className="invoicetableflex">
<div className="invoicetable tablehead">
                <div className="invdata">Role Title</div>
                <div className="invdata">date created</div>
                <div className="invdata">Role status</div>
                <div className="invdata">Location</div>
                <div className="invdata">Application Status</div>
               </div>

               {companyJobs.length > 0 && (
  <>   
    {companyJobs
      .filter(item => item.is_paidfor === false)  // Filter jobs where is_paidfor is true
      .map((item, index) => (
        <Applicationtable 
          jobtitle={item.jobtitle} 
          jobservice={item.jobservice} 
          location_state={item.joblocation} 
          location_lga={item.selected_lga} 
          myref = {item.ref}
          status={item.is_paidfor}  
          key={index}
          userdata={individualsdata}
          axiosInstance={axiosInstance}
        />
      ))
    }
  </>
)}


               
</div>
          
          </div>}


          {activeTab === 3 && 
        
        <div>
          <div>
               {/* <h4>My Applied Roles</h4> */}
               <div className="overview-text-subheader">
               {/* Effortlessly handle your billing and invoices right here. */}
               </div>
               </div>

<div className="invoicetableflex">
<div className="invoicetable tablehead">
                <div className="invdata">Role Title</div>
                <div className="invdata">date created</div>
                <div className="invdata">Role status</div>
                <div className="invdata">Location</div>
                <div className="invdata">Application Status</div>
               </div>

               <div className="invoicetable">
                <div className="invdata">
                  <div className="twostep">
                    <div className="stepone">Director</div>
                    <div className="dservice">Financial Services</div>
                  </div>
                </div>
                <div className="invdata">
                <div className="twostep">
                    <div className="stepone">15-April-2024</div>
                   
                  </div>
                </div>
                <div className="invdata">
                <div className="twostep">
                    <div className="stepone tablepill failed"><span className="material-symbols-outlined">
radio_button_checked
</span>  Open</div>
                    <div className="dservice">15-April-2024</div>
                  </div>
                </div>
                <div className="invdata">              
                 <div className="twostep">
                    <div className="stepone">Lagos</div>
                    <div className="dservice">Nigeria</div>
                  </div>
                  </div>
                <div className="invdata">
                  <button className='mybtn'>Close Role</button>
                </div>
               </div>


               
</div>
          
          </div>}
      </>
        </div>
        </Layout>
        
        )
}

export default page