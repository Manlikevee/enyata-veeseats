'use client'
import Rolecard from '@/components/Rolecard';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter'
import React, { useEffect, useRef , useState, useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import LazyJobcard from '../Lazyloading/LazyJobcard';






const generateRandomInvoices = (numInvoices) => {
  const invoices = [];
  for (let i = 0; i < numInvoices; i++) {
    const invoiceNumber = `#${Math.floor(Math.random() * 100000)}`;
    const date = new Date().toLocaleDateString();
    const plan = ['Basic Plan', 'Premium Plan', 'Pro Plan'][Math.floor(Math.random() * 3)];
    const amount = `$${(Math.random() * 1000 + 200).toFixed(2)}`;
    const status = ['Paid', 'Unpaid'][Math.floor(Math.random() * 2)];
    invoices.push({ invoiceNumber, date, plan, amount, status });
  }
  return invoices;
};


const generateRandomJobs = (numInvoices) => {
  const applications = [];

  for (let i = 0; i < numInvoices; i++) {
    const applicationID = `#${Math.floor(Math.random() * 100000)}`;
    const applicationDate = new Date().toLocaleDateString();
    const jobTitle = ['Software Developer', 'Product Manager', 'UX Designer'][Math.floor(Math.random() * 3)];
    const location = ['New York, NY', 'San Francisco, CA', 'Austin, TX'][Math.floor(Math.random() * 3)];
    const applicationStatus = ['Pending', 'Accepted', 'Rejected'][Math.floor(Math.random() * 3)];
    
    applications.push({ applicationID, applicationDate, jobTitle, location, applicationStatus });
    
  }
  return applications;
};

const Userapplications = () => {
  const { test,allJobs, loadingcards, allSavedJobs, savejob, individualsdata, applications } = useContext(VeeContext);
    const invoices = generateRandomInvoices(10);
    const [activeTab, setActiveTab] = useState(0); // Set the first tab as active by default

    const tabs = [
      { id: 0, label: 'Saved Roles' },
      { id: 1, label: 'Applied Roles' },
    ];


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
      {/* <Rolefilter /> */}

      <>
        {activeTab === 0 && (
            <div className="rolegrid">
{ allSavedJobs?.length > 0 && (
<>
{allSavedJobs.map((job, index) => (
        <Rolecard  job={job} key={index}  savejob={savejob} individualsdata={individualsdata} />
      ))}
      </>) }

      {loadingcards &&  <><LazyJobcard />  <LazyJobcard />  <LazyJobcard /></>}
                
            </div>
        )}
        {activeTab === 1 && <div>
          <div>
               {/* <h4>My Applied Roles</h4> */}
               <div className="overview-text-subheader">
          
               </div>
               </div>
<br />
<div className="invoicetableflex">
<div className="invoicetable tablehead">
                <div className="invdata">Application ID</div>
                <div className="invdata">Application Date</div>
                <div className="invdata">Job Title</div>
                <div className="invdata">Location</div>
                <div className="invdata">Application Status</div>
               </div>

 




               {applications.map((app, index) => (
                <div key={index} className="invoicetable invoicebody appss">
  <div className="invdata">
    <div className="key">Application ID</div> 
    <div className="keyval">{app?.application_id}</div>
  </div>
  <div className="invdata">
    <div className="key">Date</div> 
    <div className="keyval">{new Date(app.created_at).toISOString().split('T')[0]}</div>
  </div>
  <div className="invdata">
    <div className="key">Job Title</div> 
    <div className="keyval">{app?.jobapplied?.jobtitle}</div>
  </div>
  <div className="invdata">
    <div className="key">Location</div> 
    <div className="keyval">Lagos</div>
  </div>
  <div className="invdata">
    <div className="key">Application Status</div> 
    <span className="unpaid">{app?.application_status}</span>
  </div>
</div>
      ))}
               
</div>
          
          </div>}
      </>



    </div>
    </Layout>
  )
}

export default Userapplications