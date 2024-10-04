'use client'
import Dashboardroles from '@/components/Dashboardroles'
import Layout from '@/components/dashboard/Layout'
import React, { useEffect, useRef , useState, useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Messagecard from '@/components/Messagecard';
import Dashboardrolematch from '@/components/Dashboardrolematch';
import Lazytext from '@/components/Lazyloading/Lazytext';
import Roleloader from '@/components/utils/Roleloader';
import Notfoundcomponent from '@/components/utils/Notfoundcomponent';
const page = () => {
  const { jobupdate , Loadingjobupdate, userprofile, published,filled, openroles} = useContext(VeeContext);
  
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
          <div className="dashboarddetails ">
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
  <div className="dashcard">
                <div className="dashicon">
                <span className="material-symbols-outlined yellow"> stacks </span> 
                </div>
                <div className="dashtext">
<div className="num">

{jobupdate && !Loadingjobupdate ? (published) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Open Roles</div>
                </div>
              </div>
  </SwiperSlide>

  <SwiperSlide  className="pillxx">
  <div className="dashcard">
                <div className="dashicon">
                <span className="material-symbols-outlined purple"> draft </span> 
                </div>

                <div className="dashtext">
<div className="num">
{jobupdate && !Loadingjobupdate ? (filled) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Unpublished Roles</div>
                </div>
              </div>
  </SwiperSlide>



  <SwiperSlide className="pillxx">
  <div className="dashcard">
                <div className="dashicon">
            
                <span className="material-symbols-outlined blue">conversion_path </span> 
                </div>
                <div className="dashtext">
<div className="num">
{jobupdate && !Loadingjobupdate ? ('0') : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Filled Roles</div>
                </div>
              </div>
  </SwiperSlide>

</Swiper>

            <br />
            <div className="centered-text">Today</div>
            <br />
            <div className="dashroles">



            {
Loadingjobupdate && (
<>
<Roleloader/>

<Roleloader/>

<Roleloader/>
</>
  )
}

{jobupdate?.length <= 0 && !Loadingjobupdate &&  (
<Notfoundcomponent/>
)}

            {jobupdate?.length > 0 && (
              <>
              {jobupdate.map((job, index) => (
  (!Loadingjobupdate && (<Dashboardrolematch job={job} key={index}  />))  
  ))}
              </>


            )}

            
            {/* <Dashboardrolematch/>
            <Dashboardrolematch/>
  <Dashboardrolematch/>
  <Dashboardrolematch/>
            <Dashboardrolematch/>
  <Dashboardrolematch/> */}
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
      {/* <Messagecard/>
      <Messagecard/> */}

      </div>


    </div>
   </div>
          </div>
        </div>

        </div>

    </Layout>

  )
}

export default page