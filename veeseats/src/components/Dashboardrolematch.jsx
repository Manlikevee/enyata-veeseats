import Link from 'next/link'
import React from 'react'

const Dashboardrolematch = ({job}) => {
  return (
    <Link href={`/corporate/applications/job-applications/${job.ref}`} className='drolecard corp' >
   
   <div className="dtitle">
        <div className="rtitle">Job Application</div>
    </div>
    <div className="dservice">You have {job?.applied?.length} candidate profile that matches your role    </div>
        <div className="drmbody">
            
            <div className="dcontent">
            {job?.jobtitle} ({job?.jobservice})
            </div>
            <div className="gap"><img src="/lod.png" alt="" width="10px" height="13"/><small>{job?.joblocation}, {job?.selected_lga}</small> </div>
          </div>
    </Link>
  )
}

export default Dashboardrolematch