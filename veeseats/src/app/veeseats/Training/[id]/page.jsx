'use client'
import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Lazytext from '@/components/Lazyloading/Lazytext'
import MarkdownWithHTML from '@/components/MarkdownWithHTML'
import axios from 'axios'
import Link from 'next/link'
import {  toast } from 'sonner'
import Swipetraining from '@/components/Swipetraining'
import Notfoundcomponent from '@/components/utils/Notfoundcomponent'
import lgaData from '@/components/dashboard/lgaData.json';
import Inputcomponent from '@/components/Inputcomponent'
import { PaystackButton } from 'react-paystack';
import PayWithPaystack from '@/components/utils/PayWithPaystack'
const page = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const { id } = useParams();
  const [accordionData, setaccordionData] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
   const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(234); // Initialize with the default value
  const [location, setLocation] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [paymentref, setpaymentref] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const handleSectionClick = () => {
    setActiveSection(activeSection === 0 ? 1 : 0);
  };

  const handleStateChange = (event) => {
    setLocation(event.target.value);
    setSelectedLga(''); // Reset selected LGA when state changes
  };




  const handleSubmit = async (tryref) => {

    console.log(tryref)

    // Validate each field
    if (!firstName) {
      toast.error('First Name is required');
      return;
    }
    if (!lastName) {
      toast.error('Last Name is required');
      return;
    }
    if (!email) {
      toast.error('Email is required');
      return;
    }
    if (!phoneNumber) {
      toast.error('Phone Number is required');
      return;
    }
    if (!location) {
      toast.error('Job Location is required');
      return;
    }
    if (!selectedLga) {
      toast.error('Selected LGA is required');
      return;
    }

    // if(tryref){
    //   setpaymentref(tryref)
    // }

    //     if (!tryref || !paymentref) {
    //   toast.error('tryref is required');
    //   return;
    // }

    setIsloading(true)
    const postData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phonenumber: phoneNumber,
      joblocation: location,
      selected_lga: selectedLga,
      event_id: id,
      paymentref: tryref || paymentref || '0'
    };

    try {
      const response = await axios.post('https://bsjobapi.vercel.app/visitor', postData);
      console.log('Response:', response.data);
      toast.success('Successfully Registered For Event')
      setIsloading(false)
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('Error submitting form');
      setIsloading(false)
    }
  };

  useEffect(() => {
    if (paymentref) {
      handleSubmit(paymentref);
    }
  }, [paymentref]); // Refetch when `id` changes

  useEffect(() => {
    if (id) {
      const fetchBlogPost = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`https://bsjobapi.vercel.app/get_training_posts/${id}/`);
          setBlogPost(response.data);
             setaccordionData(response.data?.modules_content)
        } catch (err) {
          setError('Failed to fetch blog post.');
          console.error('Error fetching blog post:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchBlogPost();
    }
  }, [id]); // Refetch when `id` changes

  return (


    
    <Landinglayout>


<div className="startimageblock train">
<div className="herocontainer ">
<div className='biggerside'>
<div className="landingtitle">
{blogPost?.title} {loading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} 
</div>

<div className="coursedeets">
    <div className="displaybody">
    Create by RiskTech Advisory {blogPost?.organization?.organization_name} {loading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} 

    <span className="material-symbols-outlined">
remove
</span>
    </div>
    
    <div className="displaybody">
    Language: English {blogPost?.language} {loading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} 

    <span className="material-symbols-outlined">
remove
</span>
    </div>
    <div className="displaybody">
    Llast Updated: 20/09/2022
    </div>
</div>



</div>


<div className="bbtnside">
   
        <div className="login" onClick={handleSectionClick}>Get a Quote</div>
        
</div>
</div>
</div>
<br />
<div className="herocontainer benefits-items ">


{activeSection == 0 && (
  <div className="story ">


<div className="coursedeets">
    <div className="displaybody">
    Overview
    </div>
    <div className="displaybody">
    Instructor
    </div>
    <div className="displaybody">
    Enrollment options
    </div>
</div>


<p>
{blogPost?.body && ( <MarkdownWithHTML content={blogPost?.body} />)}
</p>

{loading && (
  <div className='shimmers dfg longer'>
      <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
  </div>
)}


<br />
<h3>Course Content</h3>
<div className="coursecontentflex">
<Accordion transition transitionTimeout={250}>
  {accordionData.length > 0 && (
    <>
      {accordionData.map((item, index) => (
    <AccordionItem key={index} header={
      <div className='accordioncontrol'>
        <p>{item.moduleTitle}</p>
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    }>
      {item.moduleBody}
    </AccordionItem>
  ))}
    
    </>
  )}

</Accordion>
</div>
<br />
<h3>Course Review</h3>

<Notfoundcomponent/>
<br />
<h3>Other Courses</h3>
<Swipetraining/>

    </div>
)}


{activeSection == 1 && (


<>
<div className="miniformdivxx">
<div className="reggrid">

<Inputcomponent
        inputState={firstName}
        setInputState={setFirstName}
        label="First Name"
        inputType="text"
        name="firstName"
        id="firstName"
      />
      <Inputcomponent
        inputState={lastName}
        setInputState={setLastName}
        label="Last Name"
        inputType="text"
        name="lastName"
        id="lastName"
      />
      <Inputcomponent
        inputState={email}
        setInputState={setEmail}
        label="Email"
        inputType="email"
        name="email"
        id="email"
      />
      <Inputcomponent
        inputState={phoneNumber}
        setInputState={setPhoneNumber}
        label="Phone Number"
        inputType="number"
        name="phoneNumber"
        id="phoneNumber"
      />

<div className="miniforminput">
    <label htmlFor='Country'>State</label>
    <div className="miniforminputdata">

    <select value={location} onChange={handleStateChange}>
          <option value="">State</option>
          {Object.keys(lgaData).map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
    </div>
    </div> 



<div className="miniforminput">
    <label htmlFor='Country'>Select LGA</label>
    <div className="miniforminputdata">

    <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)}>
        <option  >Select LGA</option>
        {location && (
            <>
                 {lgaData[location].map((lga, index) => (
              <option key={index} value={lga}>{lga}</option>
            ))} 
            </>
  )}

        </select> 
    </div>
    </div> 

</div>



{isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
        (  
          <>
{
  blogPost?.price && blogPost.price > 1 ? (
    <PayWithPaystack 
      amount={blogPost.price}  // Amount in Naira
      email={email}  
      onSuccessfunc={handleSubmit}  // Callback after successful payment
      setpaymentref={setpaymentref}  // Set the payment reference
    />
  ) : (
    <button className='mybtn' onClick={handleSubmit}>
      Submit
    </button>
  )
}


        
          
          </>

        )

         }
</div>

</>

)}
</div>




  



    </Landinglayout>

  )
}

export default page