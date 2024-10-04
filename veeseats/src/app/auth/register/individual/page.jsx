'use client'
import Registerlayout from '@/components/authlayout/Registerlayout'
import React, { useState } from 'react'
import Inputcomponent from '@/components/Inputcomponent'
import Link from 'next/link'
import {  toast } from 'sonner'
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Mylogocomponent from '@/components/Mylogocomponent'
const page = () => {
  const [isLoading, setIsloading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [boardExperience, setBoardExperience] = useState('');
  const [managerialExperience, setManagerialExperience] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSubmit = async () => {

    setIsloading(true)
    // Basic validation to check if all fields are filled
    if (!firstName || !lastName || !email ||  !password || !confirmPassword || !phoneNumber || !linkedInURL || !workExperience || !managerialExperience || !boardExperience || !city || !country) {
      setError('All fields are required');
      toast.info('All fields are required' );
      setIsloading(false)
      return;

    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.info('Passwords do not match' );
      setIsloading(false)
      return;
    }

    try {
      const response = await axios.post('https://bsjobapi.vercel.app/register_user/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: email,
        password: password,
        phoneNumber: phoneNumber,
        linkedInURL: linkedInURL,
        workExperience: workExperience,
        managerialExperience: managerialExperience,
        boardExperience: boardExperience,
        city: city,
        country: country,
      });

      setSuccess(response.data.message);
      toast.success(response.data.message|| `Registration successful` );
      setIsloading(false)
      setError('');
      // Reset the form or redirect user, depending on your needs
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      toast.error(error.response?.data?.error || 'An error occurred' );
      setIsloading(false)
    }
  };


  return (
    <Registerlayout>

<div className='mybglogoimg'>   <Mylogocomponent /></div> 
    <p className='loginhelper'>Join our Exclusive Community of Board Candidates.</p>
    <small style={{textAlign:'center', color: 'var(--subtitle-color3)'}}>
    Already have an account?  <Link href={'/auth/login'}>Sign In</Link> 
</small>

<div className="miniformdiv">
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
        inputType="text" 
        name="phoneNumber" 
        id="phoneNumber" 
 
      />
      <Inputcomponent 
        inputState={linkedInURL} 
        setInputState={setLinkedInURL} 
        label="LinkedIn URL" 
        inputType="text" 
        name="linkedInURL" 
        id="linkedInURL" 
    
      />
      <Inputcomponent 
        inputState={workExperience} 
        setInputState={setWorkExperience} 
        label="Years of Work Experience" 
        inputType="number" 
        name="workExperience" 
        id="workExperience" 
    
      />
      <Inputcomponent 
        inputState={boardExperience} 
        setInputState={setBoardExperience} 
        label="Years of Board Experience" 
        inputType="number" 
        name="boardExperience" 
        id="boardExperience" 

      />
      <Inputcomponent 
        inputState={managerialExperience} 
        setInputState={setManagerialExperience} 
        label="Years of Managerial Experience" 
        inputType="number" 
        name="managerialExperience" 
        id="managerialExperience" 
     
      />
      <Inputcomponent 
        inputState={city} 
        setInputState={setCity} 
        label="City" 
        inputType="text" 
        name="city" 
        id="city" 
      
      />
      <Inputcomponent 
        inputState={country} 
        setInputState={setCountry} 
        label="Country" 
        inputType="text" 
        name="country" 
        id="country" 
   
      />
      <Inputcomponent 
        inputState={password} 
        setInputState={setPassword} 
        label="Password" 
        inputType="password" 
        name="password" 
        id="password" 
  
      />
      <Inputcomponent 
        inputState={confirmPassword} 
        setInputState={setConfirmPassword} 
        label="Confirm Password" 
        inputType="password" 
        name="confirmPassword" 
        id="confirmPassword" 

      />
</div>
<small>By signing up, I agree to the terms of use and <Link href={'/privacy-policy'}>policy of the Veeseats.</Link> </small>


{isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
<button className='mybtn' onClick={handleSubmit}>Register</button>
         }

</div>
<div className="centered-text">Or</div>
    <div className="applyforroleflex">
<button className='mybtnwhite'> 
 <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <path
        d="M23.76 12.273c0-.851-.076-1.67-.218-2.455H12.24v4.642h6.458a5.52 5.52 0 01-2.394 3.622l1.939 1.505 1.939 1.506c2.269-2.09 3.578-5.166 3.578-8.82z"
        fill="#4285F4"
      />
      <path
        d="M12.24 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947l-2.004 1.555-2.005 1.554A11.996 11.996 0 0012.24 24z"
        fill="#34A853"
      />
      <path
        d="M5.525 14.28A7.213 7.213 0 015.15 12c0-.79.136-1.56.376-2.28L3.521 8.165 1.516 6.611A11.995 11.995 0 00.24 12c0 1.936.464 3.77 1.276 5.39l4.01-3.11z"
        fill="#FBBC05"
      />
      <path
        d="M12.24 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C18.191 1.19 15.475 0 12.24 0 7.55 0 3.49 2.69 1.516 6.61l4.01 3.11c.943-2.836 3.589-4.947 6.714-4.947z"
        fill="#EA4335"
      />
    </svg> Google</button>
   <button className='mybtnwhite'>   
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <path
        d="M20.45 20.449h-3.557V14.88c0-1.328-.024-3.038-1.85-3.038-1.851 0-2.135 1.447-2.135 2.941v5.665H9.352V8.997h3.414v1.565h.048a3.742 3.742 0 013.368-1.85c3.604 0 4.269 2.37 4.269 5.455l-.002 6.282zM5.34 7.43a2.064 2.064 0 11-.001-4.127 2.064 2.064 0 010 4.127zM7.118 20.45h-3.56V8.997h3.56v11.452zM22.222.002H1.771A1.751 1.751 0 000 1.732v20.535A1.753 1.753 0 001.771 24h20.451A1.756 1.756 0 0024 22.267V1.73A1.755 1.755 0 0022.222 0"
        fill="#0A66C2"
      />
    </svg> Linkdein</button>
</div>
    </Registerlayout>
  )
}

export default page