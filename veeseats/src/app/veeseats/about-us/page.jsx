import Benefitblock from '@/components/Landingpage/Benefitblock'
import Benefitcards from '@/components/Landingpage/Benefitcards'
import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'
import Swipeteams from '@/components/Swipeteams'
import Cookieconcent from '@/components/utils/Cookieconcent'
import Quickservice from '@/components/utils/Quickservice'
import React from 'react'


const benefitTexts = [
    {
      title: "AI-Driven Recruitment",
      body: "Harness the power of AI to match the right talent with the right opportunities, ensuring a seamless recruitment process.",
      iconName: "smart_toy"
    },
    {
      title: "Simplified Job Search",
      body: "Our platform makes it easier than ever to find the perfect job or the ideal candidate, with intuitive search tools and filters.",
      iconName: "search"
    },
    {
      title: "Tailored Opportunities",
      body: "Receive job or candidate recommendations that match your unique needs and skills, making recruitment faster and more efficient.",
      iconName: "tune"
    },
    {
      title: "Seamless Experience",
      body: "Veeseats combines innovation and simplicity to create a user-friendly experience for both recruiters and job seekers.",
      iconName: "thumb_up"
    },
    {
      title: "Cutting-Edge AI Integration",
      body: "We use the latest AI tools to analyze your needs, delivering the most accurate job matches and recruitment suggestions.",
      iconName: "insights"
    },
    {
      title: "Board and Executive Roles",
      body: "Veeseats specializes in connecting companies with top-tier board members and executives who can lead your organization forward.",
      iconName: "leaderboard"
    },
    {
      title: "Efficient Hiring Process",
      body: "Streamline your hiring process by leveraging our platform’s smart features that save time and resources.",
      iconName: "schedule"
    },
    {
      title: "Focus on What Matters",
      body: "We prioritize connecting talent with opportunities that drive growth and success, allowing you to focus on building a strong team.",
      iconName: "people"
    },
    {
      title: "Innovative Solutions",
      body: "Veeseats offers innovative recruitment solutions designed to meet the evolving demands of the modern workforce.",
      iconName: "lightbulb"
    },
    {
      title: "Recruitment Made Simple",
      body: "Our platform eliminates the complexity of traditional recruitment methods, making the process simple and efficient.",
      iconName: "check_circle"
    },
    {
        title: "Personalized Notifications",
        body: "Stay up to date with real-time alerts tailored to your preferences, ensuring you never miss an opportunity.",
        iconName: "notifications_active"
      },
      {
        title: "Data-Driven Insights",
        body: "Access valuable analytics and reports to make informed recruitment decisions and optimize your strategy.",
        iconName: "bar_chart"
      }
  ];



const page = () => {
  return (
    <Landinglayout>


<div className="herocontainer fdc">

<div className="creativelanding">
    <br />
    <div className="herotagline">
            #The world's leading Board Recruitment Platform
          </div>
    <div className="landingtitle creativetext">
    Empowering Organizations with  <span>Strategic Leadership </span> and Innovative Opportunities
    </div>
    <div className="landing-text-sub creativetext">
    Veeseats connects visionary companies, startups, and recruiters with top talent, streamlining the recruitment process to match leaders and job seekers with opportunities that drive growth and success.
    </div>
    {/* <div className="login">Get Started</div> */}
    <div className="creativeimg">
        <img src="/illus/illustration.png" alt="" />
    </div>
</div>

    </div> 

<div className="orangediv">
<div className="herocontainer fdc">
    <br />
    <br />
    <br />
<div className="bbbox">
Grow your startup with our Service
</div>

<div className="growsub">
Build an incredible workplace and grow your business with Veeseats all-in-one platform with amazing contents.
</div>
<br />
<br />
<div className="gridboxes">
    <div className="valuebox">
        <div className="valueicon">
        <img src="/illus/image65.png" alt="" />
        </div>
        <div className="valuetext">
            <div className="valuetitle">Recruitment Innovation</div>
            <div className="valuebody">Veeseats emerged from a deep desire to revolutionize the recruitment landscape. What began as a simple concept has now evolved into a dynamic platform that simplifies the hiring process for both companies and job seekers. </div>
        </div>
    </div>
    <div className="valuebox">
        <div className="valueicon">
        <img src="/illus/image64.png" alt="" />
        </div>
        <div className="valuetext">
            <div className="valuetitle">Streamlining Recruitment</div>
            <div className="valuebody">Veeseats was created with a singular vision: to make job recruitment smoother and more efficient. Our platform was born from the recognition that both recruiters and job seekers need a more streamlined process.</div>
        </div>
    </div>

    <div className="valuebox">
        <div className="valueicon">
        <img src="/illus/image58.png" alt="" />
        </div>
        <div className="valuetext">
            <div className="valuetitle">Empowering Talent Connections</div>
            <div className="valuebody"> At Veeseats, we understand that recruitment is about more than just filling positions—it's about creating meaningful connections. From inception, our goal has been to simplify and enhance the job search process for everyone involved </div>
        </div>
    </div>

    <div className="valuebox">
        <div className="valueicon">

<img src="/illus/image62.png" alt="" />
        </div>
        <div className="valuetext">
            <div className="valuetitle">A New Era in Recruitment</div>
            <div className="valuebody"> Veeseats was built on the belief that the recruitment process should be as dynamic as the job market itself. Our platform is designed to meet the needs of today’s job seekers and recruiters by integrating AI technology with the essential elements of traditional recruitment. </div>
        </div>
    </div>
</div>
<br />
<br />

    </div> 
</div>
<br />
<br />
<br />
<br />
<div className="herocontainer mgp">
    <div className="solutionstitle">
    Our Story
    </div>
<div className="story">
<p>
    Veeseats was born out of a relentless pursuit to stay ahead in the
    ever-evolving world of job recruitment. What started as a simple idea
    quickly transformed into a powerful platform designed to streamline the
    recruitment process for both organizations and individuals. We recognized
    the daily challenges faced by job seekers and recruiters alike—the constant
    need to stay updated with the latest trends and the tedious nature of
    traditional recruitment methods.
  </p>
  <p>
    While the concept behind Veeseats may not be entirely original, our approach
    is refreshingly straightforward. We adhere to the core principles of
    recruitment, prioritizing what truly matters: connecting the right talent
    with the right opportunities. By integrating cutting-edge AI tools, Veeseats
    offers a recruitment experience like no other, where simplicity meets
    innovation.
  </p>
  <p>
    Whether you're searching for top-tier board and executive roles or looking
    to fill essential positions, Veeseats is here to make the process seamless
    and efficient. There's always something new and exciting on Veeseats—
    because we believe that recruitment should be more than just a process; it
    should be an experience.
  </p>
</div>
</div>
<br />

<div className="section-benefits">
<div className="glance">
<div className="iamhero">
Unlock the Power of Seamless Recruitment
    </div>

</div>
<div className="growsub">
Build with love & Trust
</div>
    <div className="herocontainer">
        <Benefitblock>

    
    {benefitTexts.map((benefit, index) => (
      <Benefitcards   iconName={benefit.iconName}  key={index} title={benefit.title} body={benefit.body} />
    ))}


        </Benefitblock>
    



    </div>

</div>
<Quickservice/>
<br />
<br />
<div className="herocontainer mgp flexrev">
<div className="solutionstitle">
Mission Statement
</div>
<div className="story">
<p>
At Veeseats, our mission is to revolutionize the recruitment process by connecting the right talent with the right opportunities. We strive to simplify the job search and hiring experience for both individuals and organizations by integrating advanced AI technology with time-honored recruitment principles. Our goal is to make recruitment seamless, efficient, and accessible, ensuring that every interaction on our platform is meaningful and impactful.
</p>
<p>
Our vision is to become the leading platform in the recruitment industry, known for our innovative approach and commitment to excellence. We envision a future where Veeseats transforms the way organizations and job seekers connect, creating a world where finding the perfect job or the ideal candidate is a smooth, straightforward, and rewarding experience. We aim to continuously evolve with the ever-changing job market, setting new standards in recruitment by blending simplicity with cutting-edge technology.
</p>
<p>
Whether you're searching for top-tier board and executive roles or looking
to fill essential positions, Veeseats is here to make the process seamless
and efficient. There's always something new and exciting on Veeseats—
because we believe that recruitment should be more than just a process; it
should be an experience.
</p>
</div>


</div>

<br />
<br />
<br />
<br />

<div className="herocontainer ac">

    <div className="bbbox">
    Meet our superheros
</div>

<div className="growsub">
Build with love & Trust
</div>

<div className="teams">

    <Swipeteams/>
    </div>
</div>
{/* <Cookieconcent/> */}
    </Landinglayout>

  )
}

export default page