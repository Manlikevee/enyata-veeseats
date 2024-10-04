'use client'
import Dashboardroles from '@/components/Dashboardroles'
import Layout from '@/components/dashboard/Layout'
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Messagecard from '@/components/Messagecard';
import Link from 'next/link';
import Lazytext from '../Lazyloading/Lazytext';
import { VeeContext } from '../context/Chatcontext';
import Roleloader from '../utils/Roleloader';
import Notfoundcomponent from '../utils/Notfoundcomponent';

const Individualhomepage = () => {
  const {loadingsaves,loadingapplications ,allJobs,allSavedJobs,  applications, roleMatch, roleMatchLoading, loadingcards, joberror, userprofile } = useContext(VeeContext);

  const shuffledJobs = allJobs.sort(() => 0.5 - Math.random());

  // Step 2: Slice to get the first 8 jobs
  const selectedJobs = shuffledJobs.slice(0, 8);

  return (
<Layout>

<div className="dashboard">
        <br />
        <div className="sectiontitle col">
          <div>
            Welcome back, {userprofile?.user?.first_name + '' + userprofile?.user?.last_name}
          </div>
          <small>Here is what we have for you today</small>
        </div>

        <div className="dashboardflex">
          <div className="dashboarddetails">
          <div className="pendingtalk">

Your free trial is ending soon! Upgrade now to continue enjoying all our premium features without interruption.
</div>
          <Swiper

spaceBetween={10}
breakpoints={{
    // when window width is >= 640px
    240: {
      slidesPerView: 1.35,
    },
    // when window width is >= 768px
    568: {
      slidesPerView: 2.0,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
    },
  }}
centeredSlides={false}
grabCursor={true}
loop={false}
>


  <SwiperSlide  className="pillxx">
  <Link href='/user-applications' className="dashcard">
                <div className="dashicon">
                <span className="material-symbols-outlined yellow"> stacks </span> 
                </div>
                <div className="dashtext">
<div className="num">
{applications && !loadingapplications ? (applications.length) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }

</div>
<div className="label">Application</div>
                </div>
              </Link>
  </SwiperSlide>

  <SwiperSlide  className="pillxx">
  <Link href='/user-applications' className="dashcard">
                <div className="dashicon">
                <span className="material-symbols-outlined purple"> draft </span> 
                </div>

                <div className="dashtext">
                <div className="num">
{allSavedJobs  && !loadingsaves ?  (allSavedJobs.length) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }

</div>
<div className="label">Saved Roles</div>
                </div>
                </Link>
  </SwiperSlide>


  <SwiperSlide className="pillxx">
  <Link href={'/services/role-match'} className="dashcard">
                <div className="dashicon">
            
                <span className="material-symbols-outlined blue">conversion_path </span> 
                </div>
                <div className="dashtext">
<div className="num">
{roleMatch  && !  roleMatchLoading ?  (roleMatch.length) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Role Matches</div>
                </div>
              </Link>
  </SwiperSlide>

</Swiper>

            <br />
            <div className="centered-text">Today</div>
       
            <div className="dashroles">
  
            <div className="justflex jfs">
  <div className="filterbox">
    <div className="filtersearch">
      <input placeholder="Find roles" type="text" />{" "}
      <span className="material-symbols-outlined">search</span>
    </div>
  </div>
</div>

{selectedJobs?.length <= 0 && !loadingcards &&  (
<Notfoundcomponent/>
)}


{
loadingcards && (
<>
<Roleloader/>

<Roleloader/>

<Roleloader/>
</>
  )
}


 <>
      {selectedJobs?.length > 0 && !loadingcards && (
        <>
          {selectedJobs.map((job, index) => (
            !joberror && (
              <Dashboardroles
                key={job.id || index} // Use job.id if available, otherwise fallback to index
                job={job}
              />
            )
          ))}
        </>
      )}
    </>



  {/* <Dashboardroles/>
  <Dashboardroles/>
  <Dashboardroles/>
  <Dashboardroles/>
  <Dashboardroles/> */}
  
            </div>
          </div>
          <div className="messaging">
   <div className="messagingbox">
    <div className="messageflex">
      <div className="messageflextitle">Messages</div>
      <p></p>
      <div className="messagesflx">
      <Messagecard title={'Veeseats'} body={'Getting Started With Veeseats'} mylink='/inbox'  />
      <Messagecard title={'Veeseats Ai'} body={'Hello There Testing 1..2...3'} />


      </div>


    </div>
   </div>
          </div>
        </div>

        </div>

    </Layout>

  )
}

export default Individualhomepage