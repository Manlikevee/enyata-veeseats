'use client'
import Authlayout from '@/components/authlayout/Authlayout'
import React, { useState } from 'react'
import Inputcomponent from '@/components/Inputcomponent'
import { useRouter } from 'next/navigation'
import OtpInput from 'react-otp-input';
import Select from "react-dropdown-select";
import Mylogocomponent from '@/components/Mylogocomponent'



const page = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const [skillAreas, setSkillAreas] = useState([
      { value: 'frontend', label: 'Frontend Development' },
      { value: 'backend', label: 'Backend Development' },
      { value: 'fullstack', label: 'Full Stack Development' },
      { value: 'mobile', label: 'Mobile Development' },
      { value: 'data', label: 'Data Science' },
      { value: 'devops', label: 'DevOps' },
      { value: 'uiux', label: 'UI/UX Design' },
      { value: 'ml', label: 'Machine Learning' },
      { value: 'cloud', label: 'Cloud Computing' },
    ]);
  

    const handleChange = (values) => {
        setSelectedSkills(values);
      };
    const handleClick = () => {

      router.push('/auth/forgot-password')
    }

    const handleCreate = ({ value, label }) => {
        const newOption = { value, label };
        setSkillAreas((prevSkillAreas) => [...prevSkillAreas, newOption]);
        setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, newOption]);
      };
  return (
    <Authlayout>
    {/* <div className='mybglogoimg'>Login</div> */}
    <div className='mybglogoimg'>   <Mylogocomponent /></div> 
    <p className='loginhelper'>Verify Your Account.</p>

 
<small style={{textAlign:'center', marginBottom:'-27px', color: 'var(--subtitle-color3)'}}>
Confirm the OTP sent to ellafedora@gmail and enter the verification code that was sent. Code expires in 00:59
</small>


    <div className="miniformdiv">

    <OtpInput
    inputStyle={'otpbox'}
      value={otp}
      onChange={setOtp}
      numInputs={5}
      renderSeparator={<span> &nbsp; &nbsp; &nbsp; &nbsp; </span>}
      renderInput={(props) => <input {...props} />}
    />


{/* <Select
        options={skillAreas}
        onChange={handleChange}
        values={selectedSkills}
        multi
        placeholder="Select skill areas"
        create
        onCreateNew={handleCreate}
        color='#BD0B20'
        style={{fontSize:'14px'}}
      /> */}

<small className='rightside'  onClick={handleClick}>Resend Token</small>
<button className='mybtn'>Verify Account</button>


</div>


    </Authlayout>

  )
}

export default page