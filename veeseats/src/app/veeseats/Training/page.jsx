'use client'
import Blogcard from '@/components/Blogcard'
import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'
import { VeeContext } from '@/components/context/Chatcontext'
import React, { useContext, useEffect } from 'react'

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


const page = () => {
  const {  blogs,loading, error, fetchBlogPosts, training, loadingtraining, fetchTrainingPosts} = useContext(VeeContext);

  useEffect(() => {
    if (!loadingtraining && training?.length === 0) {
      fetchTrainingPosts();
    }
  }, [training]);
  return (
    <Landinglayout>

<br />
<br />
<div className="bob">
<div className="herocontainer fdc jfs xcxcxc">

<div className="creativelanding">
    

    <div className="landingtitle creativetext">
     <span>Veeseats'</span> Training Programs for Employers & <span>Job Seekers</span> 
  
    </div>
    <div className="landing-text-sub creativetext">
    We offer a range of training programs for Board of Directors, Senior Management, subject matter experts, and teams across various areas. Our industry-recognized certifications help clients adopt best business practices and equip teams with essential skills to excel in today’s competitive environment.
    </div>

    <div className="creativeimg">
        <img src="/7566-min.jpg" alt="" />
    </div>
</div>

    </div> 
<div className="jfs bgw">
<div className="herocontainer fdc">

<br />
<br />
<br />
<div className="sectagline story">
Enhance Your Skills with Expert-Led Training
</div>
<div className="iamhero">
Empower Yourself with Practical Knowledge for Career Growth and Business Success
</div>
     
<div className="detailgrids ">



{training.map((post, index) => (
        <Blogcard 
          key={index}
          image={post.blogimage}
          title={post.title}
          tag={post.category}
          subtext={post.body}
          id={post.reference}
          amount={post.price} 
          type='training'
        />
      ))}

</div>

</div>
</div>
</div>





    </Landinglayout>

  )
}

export default page