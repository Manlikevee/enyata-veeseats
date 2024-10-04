import React from 'react'
import Landingnav from './Landingnav'
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
const Landinglayout = ({children, hidelinks, hidefooter}) => {
  return (
    <main className='mymain'>
   
  <Landingnav hidelinks={hidelinks}  />

    {children}

{!hidelinks && (
    <div className="newsletter">
    <div className="herocontainer">
      <div className="netstext">
        Stay in the loop with exclusive offers, financial tips, and the latest
        updates! Subscribe to our newsletter and be the first to access valuable
        insights, tailored for your financial success. Don't miss out – join our
        community today
      </div>
      <br />
      <div className="newsinput">
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter Your Email Address"
        />{" "}
        <button>Subscribe</button>
      </div>
    </div>
  </div>
)}

<div>
  <br />
  <br />
  {!hidefooter && (
  <footer>
  <div className="herocontainer">
    <div className="logosecion">
      <div className="mylogosec">
      <Link href="/" className="mylogo">
    <img src= '/logo1.png' alt=""  /> <div className='pbs'>Vee<span>Seats</span></div>  
    </Link>
      </div>
      <div className="displaybody">
      Veeseats emerged from a deep desire to revolutionize the recruitment landscape. What began as a simple concept has now evolved into a dynamic platform that simplifies the hiring process for both companies and job seekers.
      </div>
    </div>
    <div className="linkssection">
      <h3>About Us</h3>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Our Services</li>
        <li>Contact Us</li>
      </ul>
    </div>
    <div className="contactsection">
      <h3>Contact us</h3>
      <ul>
        <li>
          (903) 822-4082 16193 County Rd #3167 S Mount Enterprise, Texas(TX),
          75681
        </li>
        <li>+908 89097 890</li>
      </ul>
    </div>
    <div className="socialmedia">
      <div className="social" >   <Twitter /> </div>
      <div className="social" >      <Linkedin  /> </div>
      <div className="social" >   <Instagram /> </div>
    </div>
  </div>
  <br />
  <br />
  <div className="lines" />
  <div className="herocontainer ">
    <p className="ctxt">Copyright ® 2024 Odah Victor Enyata Hackathon</p>
  </div>
</footer>
  )}

</div>


  </main>
  )
}

export default Landinglayout