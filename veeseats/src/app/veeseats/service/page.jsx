import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'
import Swipeteams from '@/components/Swipeteams'
import TabContent from '@/components/TabContent'
import Bento from '@/components/utils/Bento'
import Divtable from '@/components/utils/Divtable'
import Quickservice from '@/components/utils/Quickservice'
import React from 'react'


const page = () => {
  return (
    <Landinglayout>


<div className="herocontainer fdc serv">

<div className="creativelanding">
    <br />
    <div className="herotagline">
            #The world's leading Board Recruitment Platform
          </div>
    <div className="landingtitle creativetext">
   
     Unlocking Potential with <span>Dynamic Board </span> Member Solutions
    </div>
    <div className="landing-text-sub creativetext">
    Veeseats bridges the gap between forward-thinking organizations and exceptional leaders, offering seamless recruitment services that place the right talent in boardrooms. Our platform empowers businesses to thrive through strategic placements that foster innovation and growth.
    </div>
    {/* <div className="login">Get Started</div> */}
    <br />
    <div className="creativeimg">
        <img src="/illus/map (1).png" alt="" />
    </div>
</div>

    </div> 
    <Quickservice/>
    <div className="herocontainer fdc serv">
  

<TabContent/>
<br />
<Productivity/>


<br />
<br />
<div className="glance">
<div className="iamhero">
Discover Our Solutions
    </div>
<div className="story">
Empowering recruiters and job seekers with streamlined tools and tailored opportunities to achieve success in the evolving job market.
</div>
</div>

<Landingpagecard title={'Optimize and Structure Your Profile with Ease'} subtitle={'Leverage our AI-powered profiling system to build a comprehensive and professional profile effortlessly. Our intelligent platform helps you showcase your skills, experience, and strengths, ensuring your profile stands out to recruiters.'} image={'/screely-1725503235525.png'}  cta='Get Started' reverse/>


<Landingpagecard title={'Refer a Friend to Veeseats'} subtitle={'Share Boardseats with your colleagues and help them discover exciting leadership opportunities. You’ll both benefit! '} image={'/screely-1725503546593.png'}  cta='Request A Demo' keypoints />


<Landingpagecard title={'Get access to board room opportunities'} subtitle={'Are you seeking board participation? Join a select group of carefully vetted board-ready professionals. TheBoardSeats provides you with opportunities to join the governing teams of some of the most renowned companies in Africa. Join TheBoardSeats .... boost your visibility '} image={'/screely-1725502182274.png'}  cta='Find Board Roles' reverse/>



</div>
    
  

    <div className="herocontainer fdc">


    <br />
    <br />
    <Bento/>

    <br />
    <br />
    <div className="glance">


<div className="iamhero">
Why users love VeeSeats
    </div>
    <br />
</div>

<Divtable/>

    </div>

   
</Landinglayout>
  )
}

export default page