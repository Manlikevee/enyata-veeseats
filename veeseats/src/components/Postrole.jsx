import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Postrole = ({testfunction}) => {
   const router = useRouter()
    const [activeSection, setActiveSection] = useState('');

    const handleSectionClick = (section) => {
      setActiveSection(section);
    };
    const handlecorp = () => {

        router.push('/corporate/post-a-role')
      }
  return (
<>
  {/* Post Vacant Roles */}
  <div className="loading-over2" style={{ display: "flex" }}>
    <div className="popup">
     <h5>Post A Role   <p id="close2" onClick={testfunction}>×</p></h5>
      <div className="secoact">
     
        {/* Boardseats Premium Posting */}


    <div 
          className={`titlediv ${activeSection === 'PostVacantRoles' ? 'active' : ''}`} 
          onClick={() => handleSectionClick('PostVacantRoles')}
        >
          <div className="profileflex">
            <div className="overview-text-header">Post Vacant Roles</div>
          </div>
          <div className="overview-text-subheader">
            <div className="box-border-cont">
              For corporates that require quicker candidate matching of best-fit executives using our enhanced auto-matching feature
              <div><b>Basic features</b></div>
              <div className='feature'>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Book a Consultation
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Discounted ads
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Industry wide Insights &amp; Resources
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Post Board Role
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Post first role for free{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Limited Matching
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Summarized Candidates details{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Boardseats Premium Posting */}
        <div 
          className={`titlediv ${activeSection === 'BoardseatsPremiumPosting' ? 'active' : ''}`} 
          onClick={() => handleSectionClick('BoardseatsPremiumPosting')}
        >
          <div className="profileflex">
            <div className="overview-text-header">Boardseats Premium Posting</div>
          </div>
          <div className="overview-text-subheader">
            <div className="box-border-cont">
              For corporates that require quicker candidate matching of best-fit executives using our enhanced auto-matching feature
              <div><b>All basic features plus</b></div>
              <div className='feature' >
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Discounted ads
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Message Candidates{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Fast &amp; Efficient recruitment{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Post Board Roles
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Candidates Background Check
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Outsource Your Recruitment */}
        <div 
          className={`titlediv ${activeSection === 'OutsourceYourRecruitment' ? 'active' : ''}`} 
          onClick={() => handleSectionClick('OutsourceYourRecruitment')}
        >
          <div className="profileflex">
            <div className="overview-text-header">Outsource Your Recruitment</div>
          </div>
          <div className="overview-text-subheader">
            <div className="box-border-cont">
              For corporates that require our expertise to manage the entire recruitment process
              <div><b>All Premium features plus</b></div>
              <div className='feature' >
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Featured Adverts on high traffic pages on our website
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Totally managed recruitment process{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  100% Board Recruitment Execution{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Psychometric Tests{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Post unlimited board Roles
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Competency Based Assessment{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Executive Leadership Assessments{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Set-up Your Board */}
        <div 
          className={`titlediv ${activeSection === 'SetupYourBoard' ? 'active' : ''}`} 
          onClick={() => handleSectionClick('SetupYourBoard')}
        >
          <div className="profileflex">
            <div className="overview-text-header">Set-up Your Board</div>
          </div>
          <div className="overview-text-subheader">
            <div className="box-border-cont">
              For corporates that require our expertise to setup a board from ground up
              <div><b>All Premium features plus</b></div>
              <div className='feature' >
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Featured Adverts on high traffic pages on our website
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Dedicated Corporate Governance Support
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  10% discount to use required features of the Digitral Cosec{" "}
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Psychometric Tests
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Competency Based Assessment
                </span>
                <span>
                  <svg
                    width={20}
                    height={11}
                    viewBox="0 0 20 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                      fill="#A91F2F"
                    />
                  </svg>
                  Executive Leadership Assessments{" "}
                </span>
                <svg
                  width={20}
                  height={11}
                  viewBox="0 0 20 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.394531 6.7418L5.13753 10.3618L12.7535 1.6578L11.2475 0.341797L4.86353 7.6378L1.60653 5.1518L0.394531 6.7418ZM19.7535 1.6578L18.2475 0.341797L11.8785 7.6208L11.1255 7.0188L9.87553 8.5808L12.1225 10.3788L19.7535 1.6578Z"
                    fill="#A91F2F"
                  />
                </svg>
                Corporate Governance Training
              </div>
            </div>
          </div>
        </div>



      </div>
      {
        activeSection &&(    <div className="proceedbtn">
        <button className='mybtn' onClick={handlecorp}>Proceed</button>
        </div>)
      }
  

    </div>
  </div>
</>

  )
}

export default Postrole