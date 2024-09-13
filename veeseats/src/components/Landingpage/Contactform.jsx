'use client'
import React, { useRef, useState } from 'react'
import Inputcomponent from '../Inputcomponent';
import TextareaMarkdown from 'textarea-markdown';
import axios from 'axios';
import { toast } from 'sonner';
const Contactform = () => {
  
    const textareaRef = useRef(null);
    const [isLoading, setIsloading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);

      };

      const handleSubmit = async () => {
        setIsloading(true)
        if(firstName &&  lastName && email && phoneNumber && message) {
          const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            message,
          };
          try {
            const response = await axios.post('https://bsjobapi.vercel.app/contact/', data);
            console.log(response.data);
            toast.success(response.data.message || 'We Would Be In Touch')
            setIsloading(false)
          } catch (error) {
            console.error(error);
            toast.error(error.response ? error.response.data.message || 'Failed to connect to server' : 'Failed to connect to server');
            setIsloading(false)
          } 

      } else{
        toast.error('Kindly Fill All Fields')
        setIsloading(false)
      } 
    };
  return (
    <>
    <div className="reggrid bgap">
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
        inputType="text"
        name="phoneNumber"
        id="phoneNumber"
      />


</div>
<div className="miniforminput">
    <label>  Message  </label>
    <div className="miniforminputdata">
<textarea
    //   ref={textareaRef}
      value={message}
      onChange={handleInputChange}
      cols="10"
      rows="10"
     
      placeholder="Enter Your Message"
    ></textarea>
    </div>
    </div>
    <br />
    {isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
<button className='mybtn' onClick={handleSubmit}>Send Mesage</button>
         }

    </>
  )
}

export default Contactform