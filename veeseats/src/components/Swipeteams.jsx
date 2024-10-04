'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const Swipeteams = () => {
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
      slidesPerView: 3.5,
    },
  }}
centeredSlides={false}
grabCursor={true}
loop={false}
modules={[Navigation]} // Use the Navigation module here
>

<SwiperSlide className="pillxx nn">
  <div className="displaycard">
      <div className="displayimg">
      <img src="/illus/image(18).png" alt="" />
      </div>
      <div className="displaytitle">Victor Odah</div>
      <div className="displaybody">
      Product Designer
      </div>
      <div className="socfl">
        <img src="/illus/tw.png" alt="" /><img src="/illus/dr.png" alt="" /><img src="/illus/gt.png" alt="" />
      </div>
    </div>
  </SwiperSlide>



<SwiperSlide className="pillxx nn">
  <div className="displaycard">
      <div className="displayimg">
      <img src="/illus/image(5).png" alt="" />
      </div>
      <div className="displaytitle">Victor Odah</div>
      <div className="displaybody">
      Product Designer
      </div>
      <div className="socfl">
        <img src="/illus/tw.png" alt="" /><img src="/illus/dr.png" alt="" /><img src="/illus/gt.png" alt="" />
      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="pillxx nn">
  <div className="displaycard">
      <div className="displayimg">
      <img src="/illus/image6.png" alt="" />
      </div>
      <div className="displaytitle">Victor Odah</div>
      <div className="displaybody">
      Product Designer
      </div>
      <div className="socfl">
        <img src="/illus/tw.png" alt="" /><img src="/illus/dr.png" alt="" /><img src="/illus/gt.png" alt="" />
      </div>
    </div>
  </SwiperSlide>

  <SwiperSlide className="pillxx nn">
  <div className="displaycard">
      <div className="displayimg">
        <img src="/illus/image(4).png" alt="" />
      </div>
      <div className="displaytitle">Victor Odah</div>
      <div className="displaybody">
      Product Designer
      </div>
      <div className="socfl">
        <img src="/illus/tw.png" alt="" /><img src="/illus/dr.png" alt="" /><img src="/illus/gt.png" alt="" />
      </div>
    </div>
  </SwiperSlide>

</Swiper>

 
<br />

    </>
  )
}

export default Swipeteams