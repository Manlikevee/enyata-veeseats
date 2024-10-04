import React, { useState } from 'react'
import {  toast } from 'sonner'
import lgaData from '@/components/dashboard/lgaData.json';
import Inputcomponent from '../Inputcomponent';

const Jobalertform = ({togglemodal, axiosInstance, searchtitle}) => {

    const [keyword, setKeyword] = useState(searchtitle);
    const [contactMethod, setContactMethod] = useState('');
    const [contactMethodDetail, setContactMethodDetail] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const createJobAlert = async () => {
        setIsloading(true)
        const payload = {
            keyword: keyword, // Assuming these state variables are defined in your component
            contact_method: contactMethod,
            contact_method_detail: contactMethodDetail,
            location: location,
            category: category,
        };
    
        if (keyword && contactMethod && contactMethodDetail ) {
            try {
                const response = await axiosInstance.post('/create_jobalert_post/', payload); 
                toast.success('Job alert created successfully!');
                console.log(response.data);
                setIsloading(false)
                togglemodal()
                
            } catch (error) {
                setIsloading(false)
                toast.error(
                    error.response 
                        ? error.response.data.message || 'Error creating job alert' 
                        : 'Failed to connect to server'
                );
                console.error(error);
            }
        } else {
            setIsloading(false)
            toast.error('Please fill all Required fields');
        }
    };

  return (

    <>
 <div className="story">
Adding a keyword allows you to track specific job opportunities that match your interests. By setting up a keyword alert, you'll receive real-time notifications whenever a job is posted with that keyword. This feature makes job hunting easier and faster, ensuring you never miss out on the opportunities that matter most to you!.  </div>
        <div className="reggrid">

            <Inputcomponent
                inputState={keyword}
                setInputState={setKeyword}
                label="Keyword"
                inputType="text"
                name="keyword"
                id="keyword"
            />
            {/* <Inputcomponent
                inputState={contactMethod}
                setInputState={setContactMethod}
                label="Contact Method"
                inputType="text"
                name="contact_method"
                id="contact_method"
            /> */}

<div className="miniforminput">
                <label htmlFor="contactMethod">Select Contact Method:</label>
                <div className="miniforminputdata">
                    <select 
                        id="contactMethod" 
                        value={contactMethod} 
                        onChange={(e) => setContactMethod(e.target.value)}
                    >
                        <option value="">--Choose an option--</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="email">Email</option>
                    </select>
                </div>
            </div>


            <Inputcomponent
                inputState={contactMethodDetail}
                setInputState={setContactMethodDetail}
                label="Contact Method Detail"
                inputType="text"
                name="contact_method_detail"
                id="contact_method_detail"
            />
            <Inputcomponent
                inputState={location}
                setInputState={setLocation}
                label="Location"
                inputType="text"
                name="location"
                id="location"
            />
            <Inputcomponent
                inputState={category}
                setInputState={setCategory}
                label="Category"
                inputType="text"
                name="category"
                id="category"
            />
    </div>
    
    <div className="mybtns">
    
    <button className='mybtnwhite' onClick={togglemodal}>Back</button>


    <button className='mybtn' onClick={createJobAlert}>Save</button>








</div>
    </>

  )
}

export default Jobalertform