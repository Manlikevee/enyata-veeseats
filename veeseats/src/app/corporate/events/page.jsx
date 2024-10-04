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
import Visitorstable from '@/components/utils/Visitorstable';


const mydata = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phonenumber: "123-456-7890",
      event: {
        title: "Alice",
        last_name: "Smith"
      },
      status: "pending",
      clock_in: "2024-09-30T08:30:00Z",
      ref: "abc123"
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phonenumber: "987-654-3210",
      event: {
        title: "Alice",
        last_name: "Smith"
      },
      status: "confirmed",
      clock_in: "2024-10-01T09:15:00Z",
      ref: "def456"
    }
  ];


const page = () => {
  const { jobupdate , Loadingjobupdate, userprofile, published,filled, openroles, togglevisitorbar,  visitors, visitordataloaded,  myevents,loadingevents} = useContext(VeeContext);
  
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
          <div className="dashboarddetails fwidth">
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
                <span className="material-symbols-outlined yellow"> confirmation_number </span> 
                </div>
                <div className="dashtext">
<div className="num">

{myevents && !loadingevents ? (myevents.length) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Events</div>
                </div>
              </div>
  </SwiperSlide>

  <SwiperSlide  className="pillxx">
  <div className="dashcard">
                <div className="dashicon">
                <span className="material-symbols-outlined purple"> person_pin </span> 
                </div>

                <div className="dashtext">
<div className="num">
{visitors && visitordataloaded ? (visitors?.length) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Users</div>
                </div>
              </div>
  </SwiperSlide>



  {/* <SwiperSlide className="pillxx">
  <div className="dashcard">
                <div className="dashicon">
            
                <span className="material-symbols-outlined blue">conversion_path </span> 
                </div>
                <div className="dashtext">
<div className="num">
{jobupdate && !Loadingjobupdate ? (published) : (<div className='shimmer '>   <Lazytext size={3}/> </div>) }
</div>
<div className="label">Filled Roles</div>
                </div>
              </div>
  </SwiperSlide> */}

</Swiper>

            <br />
            <div className="centered-text">Today</div>
    
            <div className="dashroles">










            {/* {jobupdate?.length > 0 && (
              <>
              {jobupdate.map((job, index) => (
  (!Loadingjobupdate && (<Dashboardrolematch job={job} key={index}  />))  
  ))}
              </>


            )} */}
      <div
        id="allEmployeesContent"
        className='eventtable'
        // className={
        //   activeTag === "allEmployeesContent" ? "content active" : "content"
        // }
      >
        <div className="mytablesearch">
          <div className="searchbar">
            <span className="material-symbols-outlined"> search </span>
            <input
              type="text"
              placeholder="Search Visitor by name"
              id="searchinput"
            />
          </div>
          <div className="tabicons">
            <div className="ticonone">
              <span className="material-symbols-outlined"> list </span>
            </div>
            <div className="ticonone">
              <span className="material-symbols-outlined"> grid_view </span>
            </div>
          </div>
        </div>

        <div className="mytable">
          <div className="ttable visit mdt">
            <div className="tablerow">
      
              <div className="acc">Name</div>
              <div className="acc">Email</div>
              <div className="acc initialize">Phone Number</div>
              <div className="acc initialize">Event?</div>
              <div className="acc initialize">Status</div>
              <div className="acc initialize">Time</div>
            </div>
            <div id="displaydatahere">
            
            { visitors && visitordataloaded ? <Visitorstable mydata={visitors} togglevisitorbar={togglevisitorbar}  /> : 
            
            <>
<Roleloader/>

<Roleloader/>

<Roleloader/>
</>
            }


            

            </div>
          </div>
        </div>

        
      </div>
      {visitors?.length <= 0 && visitordataloaded &&  (
<Notfoundcomponent/>
)} 
            {/* <Dashboardrolematch/>
            <Dashboardrolematch/>
  <Dashboardrolematch/>
  <Dashboardrolematch/>
            <Dashboardrolematch/>
  <Dashboardrolematch/> */}
            </div>
          </div>

        </div>

        </div>

    </Layout>

  )
}

export default page