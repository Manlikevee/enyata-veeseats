'use client'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../dashboard/Layout'
import Titleddiv from '../Titleddiv'
import Inputcomponent from '@/components/Inputcomponent';
import {  toast } from 'sonner'
import { VeeContext } from '../context/Chatcontext';
import { useParams } from 'next/navigation';
import Lazytext from '../Lazyloading/Lazytext';
import Link from 'next/link';
import {ShareSocial} from 'react-share-social' 
const Referform = () => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [jobref, setjobref] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [country, setCountry] = useState('');
const [city, setCity] = useState('');
const [previousBoardExperience, setPreviousBoardExperience] = useState('');
const [previousSeniorManagementExperience, setPreviousSeniorManagementExperience] = useState('');
const [relationshipWithReferee, setRelationshipWithReferee] = useState('');
const [additionalInformation, setAdditionalInformation] = useState('');

const style = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: 'white',
    borderRadius: 3,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    boxShadow: 'none',
    color: 'white',
    padding: 0

  },
  copyContainer: {
    border: '1px solid blue',
    background: 'rgb(0,0,0,0.7)',
    display: 'none'
  },
  title: {
    color: 'aquamarine',
    fontStyle: 'italic'
  }
};
const {fetchJobdetail,   axiosInstance } = useContext(VeeContext);
const [Jdiscription, setJdescription] = useState([]);
const [jobdetailloading, setjobdetailloading] = useState(true);
const { id } = useParams();
const textToCopy  = `http://veeseats.vercel.app/view-role/${id}`
useEffect(() => {
  if (id) {

    
    setjobref(id)
    const fetchjob = async () => {
      try {
        // setLoadingcards(true);
        const response = await fetchJobdetail(id);
        console.log(response);
        setJdescription(response?.jobdetail)
        setjobdetailloading(false)
       
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
      }
    };

    fetchjob();
  }
}, [id]);


const handleSubmit = async () => {
  const data = {
    firstName,
    lastName,
    jobref,
    email,
    phoneNumber,
    country,
    city,
    previousBoardExperience,
    previousSeniorManagementExperience,
    relationshipWithReferee,
    additionalInformation,
  };

  try {
    const response = await axiosInstance.post('test-email/', data);
    if (response.status === 200) {
      alert('Email sent successfully');
    }
  } catch (error) {
    console.error(error);
    alert('Error sending email');
  }
};

  return (
    <Layout>

    <div className="dashboard">
    <p></p>
        <h4></h4>

<div className="titlediv ftop">

<div className="vrdtop">
      <div className="vrtop">
      <div className="roleheader">
      <div className="rolelogo">
        <img src={Jdiscription?.organization?.logo}  />  
           <div className="dtitle">
      <div className="job-card-title"> {Jdiscription?.jobtitle} {jobdetailloading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} </div>
      <div className="dservice">{Jdiscription?.jobcategory} {jobdetailloading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)}</div>
      <div className="rolelocal fdc">
        <div className="gap">
        {jobdetailloading ? ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>) : (<>
        
        
          <img src="/lod.png" alt="" width="10px" height="13" />
          <small>Abuja, Nigeria</small>
        </>)  }


        </div>
        <div className="rtype">{Jdiscription?.jobservice} {jobdetailloading && ( <div className='shimmer'> <Lazytext size={3}/> </div>)}  </div>
      </div>
    </div>
      </div>
 
    </div>
    <div>

  </div>
      </div>
<div className="vrbtm">
   <small>Share</small>
<ShareSocial 
     url ={textToCopy}
     socialTypes={['facebook','twitter','linkedin', 'whatsapp', 'telegram', ]}
     style={style}
   />
</div>
    </div>

</div>
<Titleddiv  title={'Refer A Friend'} iconname={'ios_share'}>


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
  inputType="tel" 
  name="phoneNumber" 
  id="phoneNumber" 
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
  inputState={city} 
  setInputState={setCity} 
  label="City" 
  inputType="text" 
  name="city" 
  id="city" 
/>

<Inputcomponent 
  inputState={previousBoardExperience} 
  setInputState={setPreviousBoardExperience} 
  label="Previous Board Experience" 
  inputType="text" 
  name="previousBoardExperience" 
  id="previousBoardExperience" 
/>

<Inputcomponent 
  inputState={previousSeniorManagementExperience} 
  setInputState={setPreviousSeniorManagementExperience} 
  label="Previous Senior Management Experience" 
  inputType="text" 
  name="previousSeniorManagementExperience" 
  id="previousSeniorManagementExperience" 
/>

<Inputcomponent 
  inputState={relationshipWithReferee} 
  setInputState={setRelationshipWithReferee} 
  label="Relationship with Referee" 
  inputType="text" 
  name="relationshipWithReferee" 
  id="relationshipWithReferee" 
/>

<Inputcomponent 
  inputState={additionalInformation} 
  setInputState={setAdditionalInformation} 
  label="Additional Information / Justification (Optional)" 
  inputType="text" 
  name="additionalInformation" 
  id="additionalInformation" 
/>

  </div>

  <div className="mybtns">
    










    


    <button className='mybtnwhite' >Back</button>


    <button className='mybtn' onClick={handleSubmit}>Save</button>








</div>
</Titleddiv>
    </div>
    </Layout>
  )
}

export default Referform