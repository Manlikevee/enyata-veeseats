'use client'
import Inputcomponent from '@/components/Inputcomponent';
import Titleddiv from '@/components/Titleddiv';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter';
import React, { useState, useContext } from 'react'

const page = () => {
    const [couponcode, setCouponcode] = useState('')
  return (
    <Layout>

    <div className="dashboard">
    <p></p>
<h3></h3>
<div className="shoppingcartflex">
    <div className="cartproducts">
    <Titleddiv title={'Director'}>
<div className="cartheader">
    <div className="carttext">
        <div className="cartlabel">Job Title</div>
        <div className="cartvalue">Director</div>
    </div>
    <div className="carttext">
        <div className="cartlabel">Job Title</div>
        <div className="cartvalue">Director</div>
    </div>

    <div className="carttext">
    $50,000
    </div>
</div>

<div className="cartdescription">
    <div className="cartti">
    Role Description
    </div>
    <div className="overview-text-subheader">

    Our vision is to become the leading platform that allows people in  Risk Consulting Director to engage in social commerce in a safe and convenient way. Our mission is to empower Our vision is to become the leading platform that allows people in  Risk Consulting.............
    </div>
</div>

<div className="cartfooter">
<div className="mybtns">
   <button className='mybtn'>Save for later</button>
</div>
</div>
</Titleddiv>

<Titleddiv title={'Director'}>
<div className="cartheader">
    <div className="carttext">
        <div className="cartlabel">Job Title</div>
        <div className="cartvalue">Director</div>
    </div>
    <div className="carttext">
        <div className="cartlabel">Job Title</div>
        <div className="cartvalue">Director</div>
    </div>

    <div className="carttext">
    $50,000
    </div>
</div>

<div className="cartdescription">
    <div className="cartti">
    Role Description
    </div>
    <div className="overview-text-subheader">

    Our vision is to become the leading platform that allows people in  Risk Consulting Director to engage in social commerce in a safe and convenient way. Our mission is to empower Our vision is to become the leading platform that allows people in  Risk Consulting.............
    </div>
</div>

<div className="cartfooter">
<div className="mybtns">
   <button className='mybtn'>Save for later</button>
</div>
</div>
</Titleddiv>

<Titleddiv title={'Director'}>
<div className="cartheader">
    <div className="carttext">
        <div className="cartlabel">Job Title</div>
        <div className="cartvalue">Director</div>
    </div>
    <div className="carttext">
        <div className="cartlabel">Job Title</div>
        <div className="cartvalue">Director</div>
    </div>

    <div className="carttext">
    $50,000
    </div>
</div>

<div className="cartdescription">
    <div className="cartti">
    Role Description
    </div>
    <div className="overview-text-subheader">

    Our vision is to become the leading platform that allows people in  Risk Consulting Director to engage in social commerce in a safe and convenient way. Our mission is to empower Our vision is to become the leading platform that allows people in  Risk Consulting.............
    </div>
</div>

<div className="cartfooter">
<div className="mybtns">
   <button className='mybtn'>Save for later</button>
</div>
</div>
</Titleddiv>
    </div>

<div className="cartdivs">
<div className="cartdiv">
    
<div className="jcdiv">
    <div className="jstxt ">Total Number of seat(s)</div>
    <div className="jstxt cartlabel">22</div>
</div>
</div>
    
<div className="cartdiv">
<div className="overview-text-subheader">
<div className="jcdiv">
    <div className="jstxt">My Cart Summary</div>
    <div className="jstxt ">Total Items: 5</div>
</div>
<div className="jcdiv">
    <div className="jstxt">Subtotal</div>
    <div className="jstxt">$1113.95</div>
</div>

<div className="jcdiv">
    <div className="jstxt">Discount</div>
    <div className="jstxt">-$13.95</div>
</div>

<div className="bottomline"></div>
<div className="jcdiv total">
    <div className="jstxt">Total</div>
    <div className="jstxt cartlabel">$1113.95</div>
</div>
</div>

</div>

<div className="cartdiv">
<Inputcomponent 
        inputState={couponcode} 
        setInputState={setCouponcode} 
        label="Enter your coupon code" 
        inputType="text" 
        name="confirm-new-password" 
        id="confirm-new-password" 
        placeholder=''
      />
</div>

<div className="applyforroleflex">

   <button className='mybtn'>Proceed to payment</button>
    </div>

</div>

</div>




    </div>

    </Layout>
  )
}

export default page