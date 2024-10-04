'use client'
import React, { useEffect, useState, useContext } from 'react'
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import Link from 'next/link';
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { VeeContext } from '@/components/context/Chatcontext';
const page = () => {
  const [email, setemail] = useState(null);
  const [loading, setLoading] = useState(false);
  const {  axiosInstance } = useContext(VeeContext);
  useEffect(() => {
    let accessToken = Cookies.get("access_token");
    const decodedToken = jwtDecode(accessToken);
    if ( accessToken && decodedToken.is_corporate   ) {
      setemail(decodedToken.email)
    }
  }, [ ]);


  const fetchPublicKey = async () => {
        setLoading(true); // Set loading to true before the request
        try {
            const response = await axiosInstance.get('/api/create-key/');
            const { token } = response.data; // Extract the token from the response

            // Use the token as publicKey
            const publickey = token;

            // Code to be copied
            const codeToCopy = `
                <div class="veeseatsjobcards"></div>
                <script src="https://veeseats.netlify.app/veeseats.js"></script>
                <script>
                    displaymyjobs(publickey='${publickey}', displaydivid='');
                </script>
            `;

            // Copy the code to clipboard
            copyToClipboard(codeToCopy);
            
            // Show toast notification
            toast.success('Code copied to clipboard!');
        } catch (error) {
            console.error('Error fetching public key:', error);
            // Optionally show error toast
            toast.error('Failed to fetch the public key.');
        } finally {
            setLoading(false); 
        }
    };



    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };


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
      <div className="profvalue">September 30, 2024</div>
    </div>

    <div className="profileitem">
      <div className="proflabel">Expiry date</div>
      <div className="profvalue">October 30, 2024</div>
    </div>

    <div className="profileitem">
   
      <div className="profvalue"><div className='mybbn' onClick={() => toast('Coming Soon........')}>Upgrade plan</div></div>
    </div>


  </div>

     
    </div>
  </div>
</div>
</Titleddiv>

<Titleddiv title={"Email Address"}>

Your email address is {email}

</Titleddiv>

<Titleddiv title={"Password settings"}>
<div>
Manage access to your account  <Link href={'/settings/change-password'}>Change Password</Link>
</div>


</Titleddiv>


<Titleddiv title={"Embed Jobs"}>

With Veeseats, you can effortlessly showcase the jobs you’ve posted on our platform directly on your company’s website or any website of your choice. Our seamless integration allows you to display your job listings in just a few simple steps, enhancing your recruitment process and attracting top talent. Let your opportunities shine where your audience is already looking!

<br />
<div className="profvalue">


<button className='mybbn'  onClick={fetchPublicKey} disabled={loading}>
{loading ? 'Loading...' : 'Copy Integration Code'}
</button>
</div>
</Titleddiv>
<br />
<br />
<br />
           </div>

    </Layout>
  )
}

export default page