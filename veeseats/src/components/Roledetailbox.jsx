import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown';
import MarkdownWithHTML from './MarkdownWithHTML';

const Roledetailbox = ({profileimg, roleTitle, jobdescriptiondata , selectedState, selectedLga, industry, skills, requirements}) => {
  
  return (
    <div className="viewroledata">
    <div className="vrdtop">
      <div className="vrtop">
      <div className="roleheader">
      <div className="rolelogo">
        {profileimg && (  <img src={profileimg}  />  )}
        
           <div className="dtitle">
      <div className="job-card-title">{roleTitle}</div>
      <div className="dservice">{industry}</div>
      <div className="rolelocal fdc">
        <div className="gap">
          <img src="/lod.png" alt="" width="10px" height="13" />
          <small>{selectedState}, {selectedLga}</small>
        </div>
        <div className="rtype">{industry}</div>
      </div>
    </div>
      </div>
 
    </div>

      </div>
      {/* <div className="vrbtm">
        <div className="threeicons">
        <div className="whitebtn"><span className="material-symbols-outlined">
        share
</span></div>
          <div className="whitebtn"><span className="material-symbols-outlined">
bookmark
</span></div>
<Link href={'/view-role/role-application/Senior%20UX%20Designer'}>
<button>Apply</button>
</Link>
          
        </div>
      </div> */}
    </div>
    <div className="vrdbottom">
      <div className="overview-text-header">
      Overview
      </div>
      <div className="overview-text-subheader mup" style={{color:'#424243'}}>

  
      {jobdescriptiondata && ( <MarkdownWithHTML content={jobdescriptiondata} />)}

<br />

{ requirements && requirements.length > 0 ? (
  <>
    <h3>Key Responsibilities:</h3>
        <ul>
          {requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
  </>

      ) : (
       ''
      ) }

{ skills && skills.length > 0 ? (
  <>
    <h3>Required Skills and Qualifications:</h3>
        <ul>
          {skills.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
  </>

      ) : (
       ''
      ) }



      </div>

    </div>
  </div>
  )
}

export default Roledetailbox