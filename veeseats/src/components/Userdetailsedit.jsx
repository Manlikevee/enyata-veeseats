import React, {  useRef, useState } from 'react';
import Inputcomponent from './Inputcomponent'
import {  toast } from 'sonner'
import lgaData from '@/components/dashboard/lgaData.json';
const Userdetailsedit = ({togglemodal, axiosInstance,}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedLga, setSelectedLga] = useState('');
    const [linkdeinUrl, setlinkdeinUrl] = useState('');

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedLga(''); // Reset selected LGA when state changes
    };
    

    const updatedetails = async () => {
        const payload = {
            phonenumber: phoneNumber,
            linkdeinUrl:linkdeinUrl,
            city: selectedState,
            region: selectedLga
        };
    
        if (phoneNumber && linkdeinUrl && selectedState && selectedLga ) {
            try {
                const response = await axiosInstance.patch('/UserProfileView/', payload);
                toast.success('User Details Updated Successfully!');
                console.log(response.data);
                togglemodal();
            } catch (error) {
                toast.error(error.response ? error.response.data.message || 'Error Updated User Details instance' : 'Failed to connect to server');
                console.error(error);
            }
        } else {
            toast.error('Please fill all fields');
        }
    };



  return (
    <>
      <div className="reggrid">




    
      <Inputcomponent 
        inputState={phoneNumber} 
        setInputState={setPhoneNumber} 
        label="Phone Number" 
        inputType="text" 
        name="phoneNumber" 
        id="phone_number" 
      />


<Inputcomponent 
        inputState={linkdeinUrl} 
        setInputState={setlinkdeinUrl} 
        label="Linkdein Url" 
        inputType="text" 
        name="linkdeinUrl" 
        id="linkdeinUrl" 
      />

<div className="miniforminput">
    <label htmlFor='Country'>State</label>
    <div className="miniforminputdata">

    <select value={selectedState} onChange={handleStateChange}>
          <option value="">State</option>
          {Object.keys(lgaData).map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
    </div>
    </div> 



<div className="miniforminput">
    <label htmlFor='Country'>Select LGA</label>
    <div className="miniforminputdata">

    <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)}>
        <option  >Select LGA</option>
        {selectedState && (
            <>
                 {lgaData[selectedState].map((lga, index) => (
              <option key={index} value={lga}>{lga}</option>
            ))} 
            </>
  )}

        </select> 
    </div>
    </div> 






    </div>


    <div className="mybtns">
    
          <button className='mybtnwhite' onClick={togglemodal}>Back</button>
   

          <button className='mybtn' onClick={updatedetails}>Save</button>


  
      
     
    


      </div>

    </>
  )
}

export default Userdetailsedit