import Contactform from '@/components/Landingpage/Contactform'
import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'
import React from 'react'

const page = () => {




  return (
    <Landinglayout>


<div className="startimageblock telephone">
<div className="herocontainer fdc">




</div>
</div>
<br />
<div className="herocontainer fdc">
<br />

<div className="bbbox">
Let’s Start a Conversation
</div>
<div className="growsub">
Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents.
</div>
<div className="mytwocol">
    <div className="mycolone">
        <div className="discoverblock">
            <div className="valuetitle">
            How Can We Assist You?
            </div>

            <div className="story">
            Veeseats is here to support your recruitment journey. Whether you’re a job seeker or an employer, our experts are ready to help with any questions or guidance you might need. Leave us a message and let’s connect.
            </div>



 
        </div>
        <div className="lagosblock">

        <div className="valuetitle">
            Explore Our Platform:
            </div>

            <div className="story">
            Request a Custom Demo Discover how Veeseats can transform your recruitment process. Schedule a personalized demo with our team today.
            </div>

        <div className="valuetitle">
            View Our Solutions
            </div>

            <div className="story">
            Explore how Veeseats’ innovative tools and AI-driven solutions can help you find the right talent and fill essential roles with ease.
            </div>

            <div className="valuetitle">
            Visit Us 
            </div>
            
            <div className="story">
            Veeseats HQ, [Insert Address], [City, State, Country].
            </div>
            <div className="valuetitle">
            Email Us
            </div>
            <div className="story">
             contact@veeseats.com
            </div>
            <div className="valuetitle">
            Call Us
            </div>
    
            <div className="story">
            +234-81-6520-1384
            </div>



        </div>
    </div>
    <div className="mycolone">

<Contactform/>
<br />
{/* <button className='mybtn' >Send Mesage</button> */}
    </div>
</div>
</div>




  



    </Landinglayout>

  )
}

export default page