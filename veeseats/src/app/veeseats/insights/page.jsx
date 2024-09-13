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
  const {  blogs,loading, error, fetchBlogPosts} = useContext(VeeContext);

  useEffect(() => {
    if (blogs?.length === 0) {
      fetchBlogPosts();
    }
  }, [blogs]);
  return (
    <Landinglayout>

<br />
<br />
<div className="bob">
<div className="herocontainer fdc jfs xcxcxc">

<div className="creativelanding">
    

    <div className="landingtitle creativetext">
     <span>Veeseats'</span> Essential News and Insights for Employers and <span>Job Seekers</span> 
  
    </div>
    <div className="landing-text-sub creativetext">
    Discover the latest trends, success stories, and key industry shifts that are redefining recruitment, ensuring you're always equipped with the knowledge to succeed.
    </div>

    <div className="creativeimg">
        <img src="/b(1)-min.png" alt="" />
    </div>
</div>

    </div> 
<div className="jfs bgw">
<div className="herocontainer fdc">

<br />
<br />
<br />
<div className="sectagline story">
    Gain Insights with Data-Driven Research
</div>
<div className="iamhero">
    Unlock Strategic Knowledge for Smarter Decisions and Market Leadership
</div>
     
<div className="detailgrids ">

{blogs && !loading && blogs?.length > 0  && (
  blogs.map((post, index) => (
    <Blogcard 
      key={index}
      image={post.blogimage}
      title={post.title}
      tag='Tech'
      subtext={post.body}
      id={post.ref}
    />
  ))
) }

{blogPosts.map((post, index) => (
        <Blogcard 
          key={index}
          image={post.image}
          title={post.title}
          tag={post.tag}
          subtext={post.subtext}
        />
      ))}

</div>

</div>
</div>
</div>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quae labore dignissimos tempore suscipit, cupiditate facilis aliquam corrupti tempora neque dicta fuga dolores quod modi mollitia aperiam deleniti non reiciendis veritatis. Sapiente nemo ratione quos est maxime mollitia pariatur nihil!
  



    </Landinglayout>

  )
}

export default page