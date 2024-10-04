'use client'
import Inputcomponent from '@/components/Inputcomponent'
import Registerlayout from '@/components/authlayout/Registerlayout'
import React, { useState } from 'react'
import {  toast } from 'sonner'
import axios from 'axios'; 
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Mylogocomponent from '@/components/Mylogocomponent'
const page = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [companyRegNo, setCompanyRegNo] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async () => {
    setIsloading(true)

    // Basic validation to check if all fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber || !companyName || !companyType || !companyRegNo || !companyWebsite || !preferredContact) {
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
      const response = await axios.post('https://bsjobapi.vercel.app/register_company/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: email,
        password: password,
        phoneNumber: phoneNumber,
        companyName: companyName,
        companyType: companyType,
        companyRegNo: companyRegNo,
        companyWebsite: companyWebsite,
        preferredContact: preferredContact,
      });
      toast.success(response.data.message|| `Registration successful` );
      setIsloading(false)
      setSuccess(response.data.message);
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
    Already have an account? Sign In
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
        inputState={companyName} 
        setInputState={setCompanyName} 
        label="Company Name" 
        inputType="text" 
        name="companyName" 
        id="companyName" 
      />
      <Inputcomponent 
        inputState={companyType} 
        setInputState={setCompanyType} 
        label="Company Type" 
        inputType="text" 
        name="companyType" 
        id="companyType" 
      />
      <Inputcomponent 
        inputState={companyRegNo} 
        setInputState={setCompanyRegNo} 
        label="Company Reg No" 
        inputType="text" 
        name="companyRegNo" 
        id="companyRegNo" 
      />
      <Inputcomponent 
        inputState={companyWebsite} 
        setInputState={setCompanyWebsite} 
        label="Company Website Url" 
        inputType="text" 
        name="companyWebsite" 
        id="companyWebsite" 
      />
      <Inputcomponent 
        inputState={preferredContact} 
        setInputState={setPreferredContact} 
        label="Preferred Contact Method" 
        inputType="text" 
        name="preferredContact" 
        id="preferredContact" 
      />
      <Inputcomponent 
        inputState={howDidYouHear} 
        setInputState={setHowDidYouHear} 
        label="How did you hear about us" 
        inputType="text" 
        name="howDidYouHear" 
        id="howDidYouHear" 
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

<small>By signing up, I agree to the terms of use and policy of the Veeseats.</small>
{isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
<button className='mybtn' onClick={handleSubmit}>Register</button>
         }
</div>
    </Registerlayout>
  )
}

export default page