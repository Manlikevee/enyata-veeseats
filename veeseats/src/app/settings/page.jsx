'use client'
import React from 'react'
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import Link from 'next/link';
import { Toaster, toast } from 'sonner'
const page = () => {

  function testtoast(){
    
  }
  return (
    <Layout>
        <br />
           <div className="dashboard gaptransiton">
           <Titleddiv title={"Subscription"}>
<div className="globeheader">
  <div className="globea">
    <div className="worl">
 <img src="https://img.freepik.com/free-photo/light-bulb-with-drawing-graph_1232-2105.jpg?t=st=1721063982~exp=1721067582~hmac=8d6aacc51adac3045f9bdffcb73fec5fc96cd3eb6e17efcbc5d1d73d3a065958&w=740" alt="" />
    </div>
  </div>
  <div className="globebody">


    <div className="jobdescription overview-text-subheader">

  <div className="checkbox-group">
    <div className="profileitem">
      <div className="proflabel">Current Subscription </div>
      <div className="profvalue"> Free Trial </div>
    </div>

    <div className="profileitem">
      <div className="proflabel">Price</div>
      <div className="profvalue"> <Link href={'/subscription/subscriptionhistory'}>No payment Required</Link> </div>
    </div>
    <div className="profileitem">
      <div className="proflabel">Start date</div>
      <div className="profvalue">October 20, 2021</div>
    </div>

    <div className="profileitem">
      <div className="proflabel">Expiry date</div>
      <div className="profvalue">October 20, 2021</div>
    </div>

    <div className="profileitem">
   
      <div className="profvalue"><div className='mybbn' onClick={() => toast('My first toast')}>Upgrade plan</div></div>
    </div>


  </div>

     
    </div>
  </div>
</div>
</Titleddiv>

<Titleddiv title={"Email Address"}>

Your email address is akinloluwaa@gmail.com

</Titleddiv>

<Titleddiv title={"Password settings"}>
<div>
Manage access to your account  <Link href={'/settings/change-password'}>Change Password</Link>
</div>


</Titleddiv>


<Titleddiv title={"Deactivate Account"}>

Do you want to deactivate your account? By deactivationg your account you will loose all the content associated with it

<br />
<div className="profvalue"><div className='mybbn'>Deactivate my account</div></div>
</Titleddiv>
<br />
<br />
<br />
           </div>

    </Layout>
  )
}

export default page