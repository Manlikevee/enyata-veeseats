'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import PlainTextRenderer from './PlainTextRenderer';
import Tooltip from './utils/Tooltip';




const Rolecard = ({job, footer, savejob, individualsdata }) => {

  const [isLoading, setIsLoading] = useState(false);
  
  // Function to toggle loading state
  const toggleLoading = () => {
    setIsLoading(prev => !prev);
  };
  const userId = individualsdata?.user_id;
  const isSaved = job.likes.includes(userId);

  const handleSaveJob = async (id) => {
    console.log(id)

    setIsLoading(true); // Start loading
    try {
      await savejob(id); // Call savejob from context with the job ID
    } catch (error) {
      console.error("Error saving the job:", error);
    } finally {
      setIsLoading(false); // Stop loading after the request is complete
    }
  };

  return (
    <div  className="rolecard" >
    <div className="roleheader">
      <div className="rolelogo">
        <Tooltip>
        <img src={job.organization.logo} alt='logo' />
        </Tooltip>
   
      </div>
      <div className="rolelocal fdc">
        <div className="gap">
          <img src="/lod.png" alt="" width="10px" height="13" />
          <small>Lagos</small>
        </div>
        <div className="rtype">{job.jobservice || 'Tech'}</div>
      </div>
    </div>
    <div className="dtitle">
      <div className="job-card-title">{job.jobtitle}</div>
      <div className="dservice">{job.jobcategory || 'Tech'}</div>
    </div>
    <Link href={`/view-role/${job.ref}`} className="dcontent">
      
    {job.jobdescription && ( <PlainTextRenderer content={job.jobdescription} />)}
      {/* {job.jobdescription} */}
    </Link>
    <div className="dfooter">
        <div className="pill">{job?.jobcategory || 'Tech'}</div> 
        
          
    </div>
    {
      !footer && (
        <>
                {job.roleMatch && (
          <small className='rolematch'>
            <span className="material-symbols-outlined">check</span> This role matches your profile
          </small>
        )}
        </>

      )
    }



    {
      !footer && (
        <div className="rolefoot">

          <small onClick={() => handleSaveJob(job.ref)} style={{ cursor: 'pointer' }}>
            {isLoading ? (  <span className='loading-spinner'></span>  ) : (
              <>
                    {isSaved ? (
          <small>
            <span className="material-symbols-outlined">bookmark_added</span> Saved
          </small>
        ) : (
          <small>
            <span className="material-symbols-outlined">bookmark_add</span> Save
          </small>
        )}
              </>
            )}
          </small>
        
        <small>{job.savedTime}</small>
      </div>
      )
    }

  </div>
  )
}

export default Rolecard