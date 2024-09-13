'use client'
import Inputcomponent from '@/components/Inputcomponent'
import Passwordstrength from '@/components/Passwordstrength'
import Sectionheading from '@/components/Sectionheading'
import Layout from '@/components/dashboard/Layout'
import React, { useState } from 'react'


const page = () => {
  const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
  return (
    <Layout>
             <div className="dashboard">
    
    
        <br />
<Sectionheading title={'Password Settings'} subtitle={'Update password for enhanced account security'} />


<div className="miniformdiv">
<Inputcomponent 
        inputState={currentPassword} 
        setInputState={setCurrentPassword} 
        label="Current Password" 
        inputType="password" 
        name="current-password" 
        id="current-password" 
      />

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
   
<div className="mybtns">
<button className='mybtnwhite'>Cancel</button>
   <button className='mybtn'>Update Password</button>
</div>

</div>
</div>

    </Layout>
  )
}

export default page