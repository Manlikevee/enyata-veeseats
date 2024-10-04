'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Blogcard from './Blogcard';
const blogPosts = [
    {
      image: '/Image(1).png',
      title: 'The Future of Remote Work: Trends and Predictions',
      tag: 'Remote Work',
      subtext: 'Explore how remote work is shaping the future of jobs and what you need to know to stay ahead in a remote-first world.'
    },
    {
        image: '/illus/20240902_205711.jpg',
        title: 'Handling Job Rejection: Turning Frustration into Motivation',
        tag: 'Career Growth',
        subtext: 'Rejection is tough, but it can also be a learning experience. Find out how to stay motivated and keep moving forward.'
      },
    {
      image: '/Image(3).png',
      title: 'Top Skills Employers Look for in 2024',
      tag: 'Job Skills',
      subtext: 'Discover the most in-demand skills in the job market and how to develop them to boost your career prospects.'
    },
    {
      image: '/Image(4).png',
      title: 'Networking Tips for Job Seekers',
      tag: 'Networking',
      subtext: 'Learn effective networking strategies that can help you connect with industry professionals and find job opportunities.'
    },
    {
      image: '/Image(5).png',
      title: 'How to Ace Your Next Job Interview',
      tag: 'Interview Tips',
      subtext: 'Preparation is key to interview success. Here are tips and tricks to help you impress your interviewers and secure the job.'
    },
    {
        image: '/illus/20240902_205820.jpg',
        title: 'Mastering Cold Emails: How to Land Interviews',
        tag: 'Cold Emails',
        subtext: 'Cold emails can open doors to new opportunities. Here’s how to write effective cold emails that get results.'
      },
 
    {
        image: '/Image(2).png',
        title: 'How to Build a Winning Resume',
        tag: 'Career Advice',
        subtext: 'A step-by-step guide to crafting a resume that catches the attention of recruiters and lands you your dream job.'
      },
      {
        image: '/illus/20240902_210348.jpg',
        title: 'How to Write a Standout Job Application',
        tag: 'Career Advice',
        subtext: 'Learn the essential tips for crafting a job application that stands out and gets you noticed by recruiters.'
      },
      {
        image: '/Image(6).png',
        title: 'Balancing Work and Life: Strategies for Success',
        tag: 'Work-Life Balance',
        subtext: 'Maintaining a healthy work-life balance is crucial for long-term success. Here’s how you can achieve it in today’s fast-paced world.'
      },
 
  ];
const Swipetraining = () => {
    const swiperRef = useRef(null);
  return (


  <div>
 
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
 
 {blogPosts.map((post, index) => (
 
 <SwiperSlide className="pillxx nn" key={index}>
 
     <Blogcard 
           key={index}
           image={post.image}
           title={post.title}
           tag={post.tag}
           subtext={post.subtext}
         />
  
 
 </SwiperSlide>
 
 
       ))}
 
 
 
 
 </Swiper>
 
  
 <br />
 
     </div>

  
  )
}

export default Swipetraining