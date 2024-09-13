'use client'
import Inputcomponent from '@/components/Inputcomponent'
import Registerlayout from '@/components/authlayout/Registerlayout'
import React, { useState } from 'react'

const page = () => {
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
  return (
    <Registerlayout>

<img src="https://boardseats.io/documents/20121/0/Boardseats+Logo.png/" alt=""  className='mylogoimg'/>
    <p className='loginhelper'>Welcome to BoardSeats.</p>
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
<small>By signing up, I agree to the terms of use and policy of the BoardSeats.</small>
</div>

    </Registerlayout>
  )
}

export default page