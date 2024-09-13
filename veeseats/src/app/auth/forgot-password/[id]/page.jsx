'use client'
import Authlayout from '@/components/authlayout/Authlayout'
import React, { useState } from 'react'
import Inputcomponent from '@/components/Inputcomponent'
import Passwordstrength from '@/components/Passwordstrength'
import Mylogocomponent from '@/components/Mylogocomponent'
const page = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  return (
    <Authlayout>
    {/* <div className='mybglogoimg'>Login</div> */}
    <div className='mybglogoimg'>   <Mylogocomponent /></div> 
    <p className='loginhelper'>Create Your New Password.</p>




    <div className="miniformdiv">
    <Inputcomponent 
        inputState={newPassword} 
        setInputState={setNewPassword} 
        label="New Password" 
        inputType="password" 
        name="new-password" 
        id="new-password" 
      />

      <Passwordstrength password={newPassword} />

      <Inputcomponent 
        inputState={confirmNewPassword} 
        setInputState={setConfirmNewPassword} 
        label="Confirm New Password" 
        inputType="password" 
        name="confirm-new-password" 
        id="confirm-new-password" 
      />
   

<button className='mybtn'>Reset Password</button>


</div>

<small style={{textAlign:'center'}}>
Remember password ? <b> Login</b>
</small>
    </Authlayout>

  )
}

export default page