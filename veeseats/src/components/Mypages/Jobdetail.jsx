'use client'
import React, { useEffect, useRef , useState, useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter'
import Rolecard from '@/components/Rolecard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import LazyJobcard from '../Lazyloading/LazyJobcard';
import MarkdownWithHTML from '../MarkdownWithHTML';
import Lazytext from '../Lazyloading/Lazytext';
const Jobdetail = () => {
  const { test,allJobs, loadingcards, fetchJobdetail } = useContext(VeeContext);
  const [Jdiscription, setJdescription] = useState([]);
  const [jobdetailloading, setjobdetailloading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      const fetchjob = async () => {
        try {
          // setLoadingcards(true);
          const response = await fetchJobdetail(id);
          console.log(response);
          setJdescription(response?.jobdetail)
          setjobdetailloading(false)
        } catch (error) {
          console.error("Error fetching job details:", error);
        } finally {
          // setLoadingcards(false);
        }
      };

      fetchjob();
    }
  }, [id]);



console.log(id)
  return (
    <Layout>

<div className="dashboard">

<h4></h4>
{/* <Rolefilter/> */}
<div className="viewroleflex">
  <div className="viewrolecards">
  <div id="top" ></div>
  <div className='justflex jfs'>
<div className='filterbox'>
        <div className="filtersearch">
            <input type="text" placeholder='Find roles'/>  <span className="material-symbols-outlined">
search
</span>
        </div>
     


    </div>

</div>

  {allJobs.slice(0, 7).map((job, index) => (
  <Rolecard job={job} footer={true} key={index}/>
))}
       {loadingcards &&  <><LazyJobcard />  <LazyJobcard />  <LazyJobcard /></>}

       {!loadingcards && (
            <a href="#top" id="scroll-to-top-btn">
            <span className="material-symbols-outlined">
        arrow_upward
        </span>
        </a>
       )}
  </div>

<div className="responsiverowflex">

<Swiper

spaceBetween={10}
breakpoints={{
    // when window width is >= 640px
    240: {
      slidesPerView: 1,
    },
    // when window width is >= 768px
    568: {
      slidesPerView: 2.35,
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




{allJobs.slice(0, 7).map((job, index) => (
     
     <SwiperSlide  className="pillxx" key={index}>
     <Rolecard job={job} footer={true}/>
     </SwiperSlide>
     ))}

 







</Swiper>
</div>

  <div className="viewroledata">
    <div className="vrdtop">
      <div className="vrtop">
      <div className="roleheader">
      <div className="rolelogo">
        <img src={Jdiscription?.organization?.logo}  />  
           <div className="dtitle">
      <div className="job-card-title"> {Jdiscription?.jobtitle} {jobdetailloading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} </div>
      <div className="dservice">{Jdiscription?.jobcategory} {jobdetailloading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)}</div>
      <div className="rolelocal fdc">
        <div className="gap">
        {jobdetailloading ? ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>) : (<>
        
        
          <img src="/lod.png" alt="" width="10px" height="13" />
          <small>Abuja, Nigeria</small>
        
        </>)  }


        </div>
        <div className="rtype">{Jdiscription?.jobservice} {jobdetailloading && ( <div className='shimmer'> <Lazytext size={3}/> </div>)}  </div>
      </div>
    </div>
      </div>
 
    </div>

      </div>
      <div className="vrbtm">
      
      {jobdetailloading ? ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>) : (  <div className="threeicons">
    
      <Link href={`/view-role/refer/${id}`}>
        <div className="whitebtn"><span className="material-symbols-outlined">
        share
</span></div>
</Link>
          <div className="whitebtn"><span className="material-symbols-outlined">
bookmark
</span></div>
<Link href={`/view-role/role-application/${id}`}>
<button>Apply</button>
</Link>
          
        </div>) }

      
      </div>
    </div>
    <div className="vrdbottom">
    <div id="tops" ></div>
      <div className="overview-text-header">
      Overview
      </div>
      <div className="overview-text-subheader" style={{color:'#424243'}}>
{Jdiscription?.jobdescription && ( <MarkdownWithHTML content={Jdiscription?.jobdescription} />)}
     


 { Jdiscription?.responsibilities && Jdiscription?.responsibilities.length > 0 ? (
        <ul>
          {Jdiscription?.responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
       ''
      ) }

{jobdetailloading && (
  <div className='shimmers dfg'>
      <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
  </div>
)}


{!jobdetailloading && (
            <a href="#tops" id="scroll-to-top-btn">
            <span className="material-symbols-outlined">
        arrow_upward
        </span>
        </a>
       )}

      </div>

    </div>
  </div>
</div>
</div>
</Layout>
  )
}

export default Jobdetail