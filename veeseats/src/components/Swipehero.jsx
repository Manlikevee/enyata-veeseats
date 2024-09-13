'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const Swipehero = () => {
  const swiperRef = useRef(null);
  return (
    <>
    <div className="controls">
        <div className="control" onClick={() => swiperRef.current.swiper.slidePrev()}>
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
        <div className="control" onClick={() => swiperRef.current.swiper.slideNext()}>
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
      </div>
    <br />


              <Swiper
  ref={swiperRef}
spaceBetween={20}
breakpoints={{
    // when window width is >= 640px
    240: {
      slidesPerView: 1,
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
  modules={[Navigation]} // Use the Navigation module here
>


  <SwiperSlide  className="pillxx">
  <div className="displaycard">
      <div className="displayimg">
        <img src="images/image_fx_ (1).jpg" alt="" />
      </div>
      <div className="displaytitle">For Recruiters</div>
      <div className="displaybody">
      Veeseats helps you connect with top board candidates effortlessly.
Our tailored matching tools streamline your search and save time.
Make smarter hiring decisions and find the perfect fit for your organization
      </div>
    </div>
  </SwiperSlide>

  <SwiperSlide  className="pillxx">
  <div className="displaycard">
      <div className="displayimg">
        <img src="images/20240719_105700.jpg" alt="" />
      </div>
      <div className="displaytitle"> <span>For Job Seekers</span> </div>
      <div className="displaybody">
      Veeseats offers exclusive board opportunities aligned with your skills and experience.
Easily connect with organizations that value your expertise.
Advance your career by joining impactful companies and shaping their future.
      </div>
    </div>
  </SwiperSlide>



  <SwiperSlide className="pillxx">
  <div className="displaycard">
      <div className="displayimg">
        <img src="illus/20240902_205609.jpg" alt="" />
      </div>
      <div className="displaytitle">For Startups</div>
      <div className="displaybody">
      Veeseats empowers startups to find experienced board members who share their vision.
Build a strong leadership team with access to top industry talent.
Drive your business forward with the right strategic guidance at every stage.
      </div>
    </div>
  </SwiperSlide>

</Swiper>

 
<br />

    </>
  )
}

export default Swipehero