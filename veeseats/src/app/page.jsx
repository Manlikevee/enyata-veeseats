import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'
import Swipehero from '@/components/Swipehero'
import React from 'react'
import Marquee from "react-fast-marquee";

const companies =   [
  {
      "companyName": "Contentful",
      "imagePath": "/images/Company=Contentful.png"
  },
  {
      "companyName": "Culture Amp",
      "imagePath": "/images/Company=Culture Amp.png"
  },
  {
      "companyName": "Customer",
      "imagePath": "/images/Company=Customer.io.png"
  },
  {
      "companyName": "Databricks",
      "imagePath": "/images/Company=Databricks.png"
  },
  {
      "companyName": "Descript",
      "imagePath": "/images/Company=Descript.png"
  },
  {
      "companyName": "Discord",
      "imagePath": "/images/Company=Discord.png"
  },
  {
      "companyName": "Docker",
      "imagePath": "/images/Company=Docker.png"
  },
  {
      "companyName": "Docusign",
      "imagePath": "/images/Company=Docusign.png"
  },
  {
      "companyName": "DoorDash",
      "imagePath": "/images/Company=DoorDash.png"
  },
  {
      "companyName": "Dribbble",
      "imagePath": "/images/Company=Dribbble.png"
  },
  {
      "companyName": "Drips",
      "imagePath": "/images/Company=Drips.png"
  },
  {
      "companyName": "Dropbox",
      "imagePath": "/images/Company=Dropbox.png"
  },
  {
      "companyName": "Elastic",
      "imagePath": "/images/Company=Elastic.png"
  },
  {
      "companyName": "Evernote",
      "imagePath": "/images/Company=Evernote.png"
  },
  {
      "companyName": "Figma",
      "imagePath": "/images/Company=Figma.png"
  },
  {
      "companyName": "Fivetran",
      "imagePath": "/images/Company=Fivetran.png"
  },
  {
      "companyName": "Framer",
      "imagePath": "/images/Company=Framer.png"
  },
  {
      "companyName": "Freshworks",
      "imagePath": "/images/Company=Freshworks.png"
  },
  {
      "companyName": "Ghost",
      "imagePath": "/images/Company=Ghost.png"
  },
  {
      "companyName": "GitHub",
      "imagePath": "/images/Company=GitHub.png"
  },
  {
      "companyName": "Gitlab",
      "imagePath": "/images/Company=Gitlab.png"
  },
  {
      "companyName": "Gong",
      "imagePath": "/images/Company=Gong.png"
  },
  {
      "companyName": "Google",
      "imagePath": "/images/Company=Google.png"
  },
  {
      "companyName": "Grammarly",
      "imagePath": "/images/Company=Grammarly.png"
  },
  {
      "companyName": "Gumroad",
      "imagePath": "/images/Company=Gumroad.png"
  },
  {
      "companyName": "Gusto",
      "imagePath": "/images/Company=Gusto.png"
  },
  {
      "companyName": "HashiCorp",
      "imagePath": "/images/Company=HashiCorp.png"
  },
  {
      "companyName": "Hellosign",
      "imagePath": "/images/Company=Hellosign.png"
  },
  {
      "companyName": "Himalayas",
      "imagePath": "/images/Company=Himalayas.png"
  },
  {
      "companyName": "Hopin",
      "imagePath": "/images/Company=Hopin.png"
  },
  {
      "companyName": "Hotjar",
      "imagePath": "/images/Company=Hotjar.png"
  },
  {
      "companyName": "Hubspot",
      "imagePath": "/images/Company=Hubspot.png"
  },
  {
      "companyName": "Instagram",
      "imagePath": "/images/Company=Instagram.png"
  },
  {
      "companyName": "Intercom",
      "imagePath": "/images/Company=Intercom.png"
  },
  {
      "companyName": "InVision",
      "imagePath": "/images/Company=InVision.png"
  },
  {
      "companyName": "Lattice",
      "imagePath": "/images/Company=Lattice.png"
  },
  {
      "companyName": "LaunchDarkly",
      "imagePath": "/images/Company=LaunchDarkly.png"
  },
  {
      "companyName": "Linear",
      "imagePath": "/images/Company=Linear.png"
  },
  {
      "companyName": "Loom",
      "imagePath": "/images/Company=Loom.png"
  },
  {
      "companyName": "Mailchimp",
      "imagePath": "/images/Company=Mailchimp.png"
  },
  {
      "companyName": "Maze",
      "imagePath": "/images/Company=Maze.png"
  },
  {
      "companyName": "Medium",
      "imagePath": "/images/Company=Medium.png"
  },
  {
      "companyName": "Microsoft",
      "imagePath": "/images/Company=Microsoft.png"
  },
  {
      "companyName": "Miro",
      "imagePath": "/images/Company=Miro.png"
  },
  {
      "companyName": "Monday",
      "imagePath": "/images/Company=Monday.com.png"
  },
  {
      "companyName": "Monzo",
      "imagePath": "/images/Company=Monzo.png"
  },
  {
      "companyName": "Netflix",
      "imagePath": "/images/Company=Netflix.png"
  },
  {
      "companyName": "Notion",
      "imagePath": "/images/Company=Notion.png"
  },
  {
      "companyName": "Opendoor",
      "imagePath": "/images/Company=Opendoor.png"
  },
  {
      "companyName": "Outreach",
      "imagePath": "/images/Company=Outreach.png"
  },
  {
      "companyName": "PayPal",
      "imagePath": "/images/Company=PayPal.png"
  },
  {
      "companyName": "Pendo",
      "imagePath": "/images/Company=Pendo.png"
  },
  {
      "companyName": "Pipedrive",
      "imagePath": "/images/Company=Pipedrive.png"
  },
  {
      "companyName": "Postman",
      "imagePath": "/images/Company=Postman.png"
  },
  {
      "companyName": "Productboard",
      "imagePath": "/images/Company=Productboard.png"
  },
  {
      "companyName": "Razorpay",
      "imagePath": "/images/Company=Razorpay.png"
  },
  {
      "companyName": "Rippling",
      "imagePath": "/images/Company=Rippling.png"
  },
  {
      "companyName": "Segment",
      "imagePath": "/images/Company=Segment.png"
  },
  {
      "companyName": "Shopify",
      "imagePath": "/images/Company=Shopify.png"
  },
  {
      "companyName": "Slack",
      "imagePath": "/images/Company=Slack.png"
  },
  {
      "companyName": "Sonos",
      "imagePath": "/images/Company=Sonos.png"
  },
  {
      "companyName": "SpaceX",
      "imagePath": "/images/Company=SpaceX.png"
  },
  {
      "companyName": "Splunk",
      "imagePath": "/images/Company=Splunk.png"
  },
  {
      "companyName": "Spotify",
      "imagePath": "/images/Company=Spotify.png"
  },
  {
      "companyName": "Square",
      "imagePath": "/images/Company=Square.png"
  },
  {
      "companyName": "Squarespace",
      "imagePath": "/images/Company=Squarespace.png"
  },
  {
      "companyName": "Stripe",
      "imagePath": "/images/Company=Stripe.png"
  },
  {
      "companyName": "Tesla",
      "imagePath": "/images/Company=Tesla.png"
  },
  {
      "companyName": "Tinder",
      "imagePath": "/images/Company=Tinder.png"
  },
  {
      "companyName": "Toggle",
      "imagePath": "/images/Company=Toggle.png"
  },
  {
      "companyName": "Treehouse",
      "imagePath": "/images/Company=Treehouse.png"
  },
  {
      "companyName": "Trello",
      "imagePath": "/images/Company=Trello.png"
  },
  {
      "companyName": "Trustpilot",
      "imagePath": "/images/Company=Trustpilot.png"
  },
  {
      "companyName": "Twitch",
      "imagePath": "/images/Company=Twitch.png"
  },
  {
      "companyName": "Uber",
      "imagePath": "/images/Company=Uber.png"
  },
  {
      "companyName": "Upwork",
      "imagePath": "/images/Company=Upwork.png"
  },
  {
      "companyName": "Wealthsimple",
      "imagePath": "/images/Company=Wealthsimple.png"
  },
  {
      "companyName": "Webflow",
      "imagePath": "/images/Company=Webflow.png"
  },
  {
      "companyName": "Whatsapp",
      "imagePath": "/images/Company=Whatsapp.png"
  },
  {
      "companyName": "YouTube",
      "imagePath": "/images/Company=YouTube.png"
  },
  {
      "companyName": "Zapier",
      "imagePath": "/images/Company=Zapier.png"
  },
  {
      "companyName": "Zoom",
      "imagePath": "/images/Company=Zoom.png"
  },
  {
      "companyName": "ActiveCampaign",
      "imagePath": "/images/Company=ActiveCampaign.png"
  },
  {
      "companyName": "Adobe",
      "imagePath": "/images/Company=Adobe.png"
  },
  {
      "companyName": "Afterpay",
      "imagePath": "/images/Company=Afterpay.png"
  },
  {
      "companyName": "Airbnb",
      "imagePath": "/images/Company=Airbnb.png"
  },
  {
      "companyName": "Airtable",
      "imagePath": "/images/Company=Airtable.png"
  },
  {
      "companyName": "Airtasker",
      "imagePath": "/images/Company=Airtasker.png"
  },
  {
      "companyName": "Airwallex",
      "imagePath": "/images/Company=Airwallex.png"
  },
  {
      "companyName": "Amazon",
      "imagePath": "/images/Company=Amazon.png"
  },
  {
      "companyName": "Amplitude",
      "imagePath": "/images/Company=Amplitude.png"
  },
  {
      "companyName": "Asana",
      "imagePath": "/images/Company=Asana.png"
  },
  {
      "companyName": "Atlassian",
      "imagePath": "/images/Company=Atlassian.png"
  },
  {
      "companyName": "Attentive",
      "imagePath": "/images/Company=Attentive.png"
  },
  {
      "companyName": "Automattic",
      "imagePath": "/images/Company=Automattic.png"
  },
  {
      "companyName": "Basecamp",
      "imagePath": "/images/Company=Basecamp.png"
  },
  {
      "companyName": "Booking",
      "imagePath": "/images/Company=Booking.com.png"
  },
  {
      "companyName": "Braze",
      "imagePath": "/images/Company=Braze.png"
  },
  {
      "companyName": "BrowserStack",
      "imagePath": "/images/Company=BrowserStack.png"
  },
  {
      "companyName": "Calendly",
      "imagePath": "/images/Company=Calendly.png"
  },
  {
      "companyName": "Canva",
      "imagePath": "/images/Company=Canva.png"
  },
  {
      "companyName": "Carta",
      "imagePath": "/images/Company=Carta.png"
  },
  {
      "companyName": "Classpass",
      "imagePath": "/images/Company=Classpass.png"
  },
  {
      "companyName": "Clearbit",
      "imagePath": "/images/Company=Clearbit.png"
  },
  {
      "companyName": "Codecademy",
      "imagePath": "/images/Company=Codecademy.png"
  },
  {
      "companyName": "Coinbase",
      "imagePath": "/images/Company=Coinbase.png"
  }
]

const page = () => {
  return (
    <Landinglayout>
   <Heropage/>
   <div className="herocontainer">
<section>
  <br />
  <br />
  <div className="centersection">
  Optimised Board Recruitment for
Companies and Candidates
<Marquee gradient>
<div className="imggrp">
<img src="images/Group-2.png" alt="" />
      <img src="images/Group-3.png" alt="" />
      <img src="images/Group-4.png" alt="" />
      <img src="images/Group-5.png" alt="" />
      <img src="images/Group-6.png" alt="" />
{companies.map((job, index) => (
  (( <img src={job.imagePath} alt="" key={index} />))  
  ))}

     

    </div>
  </Marquee>

  </div>
</section>
</div>
<br />

   <div className="herocontainer fdc">
 
    {/* <div className="optimize">
    Optimised Board Recruitment for 
    <div className='optimize'>
    Companies and Candidates      </div> 
    </div> */}

    <div className="recruitmentprocesstext">
      
    Veeseats provides a digitised platform, built to enable the requisite connections for a flexible, reliable and optimised Board recruitment process. 
            
    </div>
    <br />
<br />
<section>
  <div className="centersection btxt">
    <div className="centersmall"> Why choose Veeseats ?</div>
    Specially designed for the Job Market
  </div>

  <Swipehero/>
</section>
<br />
<br />


    <Productivity/>

<Landingpagecard title={'Get access to board room opportunities'} subtitle={'Are you seeking board participation? Join a select group of carefully vetted board-ready professionals. TheBoardSeats provides you with opportunities to join the governing teams of some of the most renowned companies in Africa. Join TheBoardSeats .... boost your visibility '} image={'/illus/Frame37.png'}  cta='Find Board Roles' reverse/>


<Landingpagecard title={'Get access to board room opportunities'} subtitle={'Are you seeking board participation? Join a select group of carefully vetted board-ready professionals. TheBoardSeats provides you with opportunities to join the governing teams of some of the most renowned companies in Africa. Join TheBoardSeats .... boost your visibility '} image={'/illus/Frame36.png'}  cta='Find Board Roles' />

<Landingpagecard 
  title="Stand Out in Your Career; Elevate Your Career with Veeseats" 
  subtitle="Veeseats connects ambitious professionals with exclusive board opportunities. Elevate your career and find the perfect role that matches your expertise. Stand out, connect, and secure your next leadership role with Veeseats." 
  image="https://developers.google.com/static/analytics/images/landing-page/Rectangular-16x9/E02877824-GMP-Google-Analytics-Help-Center-Assets-Apr23-Graphic-3.1@300x.svg" 
  cta="Find Board Roles" 
  listitems
  reverse/>

<Landingpagecard 
  title="Stay up to date with what is important" 
  subtitle="Veeseats is built for recruitment professionals but simple enough for anyone to manage. It combines essential recruitment features with skills-first candidate assessments, creating a data-driven and best-practice hiring process that candidates appreciate" 
  image="https://cdn.prod.website-files.com/5e1c76c46a00732f7ff2b1c5/659bf7e71c3d7de072235af1_A-grade%20talent.svg" 
  cta="Find Board Roles" 

  />


  </div>

<div className="movingaccordion">
<div className="herocontainer fdc">



    </div> 
</div>


<div className="herocontainer fdc">


<Landingpagecard title={'Hire the best board talent'} subtitle={'Reach a diverse pool of select, Board-ready Professionals to Complement your Governance Team. Are you commencing a new governance journey, establish a new board with our bouquet of board setup services. Are you a startup commencing a governance journey, let us help you navigate this terrain'} image={'/7566-min.jpg'}  listitems />


<Landingpagecard title={'AI-Powered Solutions for Your Recruitment Needs'} subtitle={'Leverage advanced AI integration in our job recruitment portal to enhance your experience, from formatting job posts to CV and application reviews. Tailored for both individuals and corporate clients, our AI tools streamline the recruitment process, making it more efficient and effective.'} image={'/4151017.jpg'}  cta='Recruit Board Talent.' reverse />


<Landingpagecard title={'User Friendly Interface'} subtitle={'Reach a diverse pool of select, Board-ready Professionals to Complement your Governance Team. Are you commencing a new governance journey, establish a new board with our bouquet of board setup services. Are you a startup commencing a governance journey, let us help you navigate this terrain'} image={'/1000128455.jpg'}  listitems />
<br />

    </div> 

<br />
<br />




  <div className="herocontainer fdc">
  <div className="optimize">
Improved outcomes for effective Board Recruitment.

    </div>

    <div className="recruitmentprocesstext">
      
    BoardSeats delivers improved outcomes for your board recruitment efforts, ensuring direct connections, quicker matching and a range of services via optimised and digitised processes
            
    </div>


    </div>


    <Linebgdiv>
      <div className="herocontainer">
      <div className="offergridcard">
<Offercard title={'Recruitment'} subtext={'Upskill and improve competencies with our governance-focused trainings for organisations and professionals.'} />
<Offercard title={'Board Setup'} subtext={'Free up time to focus on increasing your organisations impact, outsource the management of your governance team to professionals.'} />
<Offercard title={'Profile Writing'} subtext={'BoardSeats powers the Board recruitment process end-to-end, effectively connecting qualified professionals to the organisations that need them.'} />
<Offercard title={'Trainings'} subtext={'Upskill and improve competencies with our governance-focused trainings for organisations and professionals.'} />
<Offercard title={'Outsourcing'} subtext={'Starting a new board or seeking to improve an existing one? BoardSeats provides digitised tools and services for effective board setup and management.'} />
<Offercard title={'Executive Coaching'} subtext={'Project your experience to attract the board opportunities you desire., BoardSeats profile writing service provides the visibility required to attract the opportunities that you seek'} />



</div>
      </div>

    </Linebgdiv>



    </Landinglayout>

  )
}

export default page