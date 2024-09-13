'use client'
import Authlayout from '@/components/authlayout/Authlayout'
import React, { useState } from 'react'
import Inputcomponent from '@/components/Inputcomponent'
import { useRouter } from 'next/navigation'
import Mylogocomponent from '@/components/Mylogocomponent'

const page = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const handleClick = () => {

        router.push('/auth/forgot-password/djdeeyeywbe')
      }

  return (
    <Authlayout>
    {/* <div className='mybglogoimg'>Login</div> */}
    <div className='mybglogoimg'>   <Mylogocomponent /></div> 
    <p className='loginhelper'>Forgot Your Password?</p>

<small style={{textAlign:'center', color: 'var(--subtitle-color3)'}}>
Enter the email address you used to create the account to receive instructions on how to reset your password
</small>

    <div className="miniformdiv">
    <Inputcomponent 
        inputState={email} 
        setInputState={setEmail} 
        label="Email" 
        inputType="email" 
        name="email" 
        id="email" 
      />

<button className='mybtn' onClick={handleClick}>Reset Password</button>

<small style={{textAlign:'center'}}>
Remember password ? <b>Login</b>
</small>
</div>


    </Authlayout>

  )
}

export default page