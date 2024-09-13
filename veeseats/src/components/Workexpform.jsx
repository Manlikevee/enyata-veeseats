import React, { useState } from 'react'
import Inputcomponent from './Inputcomponent'
import {  toast } from 'sonner'
import lgaData from '@/components/dashboard/lgaData.json';

const Workexpform = ({togglemodal, axiosInstance, workExperience, setWorkExperience, generateJobDescriptionOverview }) => {
const [organization_Name, setorganization_Name] = useState('');
const [jobTitle, setJobTitle] = useState('');
const [jobService, setJobService] = useState('');
const [jobSector, setJobSector] = useState('');
const [jobStart, setJobStart] = useState('');
const [jobEnd, setJobEnd] = useState('');
const [jobDescription, setJobDescription] = useState('');
const [selectedState, setSelectedState] = useState('');
const [selectedLga, setSelectedLga] = useState('');
const [loading, setLoading] = useState(false);

const createWorkExperience = async () => {
    const payload = {
        organization_name: organization_Name,
        jobtitle: jobTitle,
        jobservice: jobService,
        jobsector: jobSector,
        jobstart: jobStart,
        jobend: jobEnd,
        jobdescription: jobDescription,
        city: selectedState,
        region: selectedLga
    };
    const today = new Date();
    const startDate = new Date(jobStart);

    // Validate that start date is not in the future and not today
    if (startDate >= today.setHours(0, 0, 0, 0)) {
        toast.error('Start date cannot be today or in the future');
        return;
    }
    if (jobTitle && selectedLga && selectedState && jobService && jobSector && jobStart && jobEnd && jobDescription && organization_Name) {
        try {
            const response = await axiosInstance.post('/create_work_experience/', payload);
            toast.success('Work experience created successfully!');
            console.log(response.data);
            addWorkExperience();
            togglemodal();
        } catch (error) {
            toast.error(error.response ? error.response.data.message || 'Error creating work experience' : 'Failed to connect to server');
            console.error(error);
        }
    } else {
        toast.error('Please fill all fields');
    }
};

const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedLga(''); // Reset selected LGA when state changes
};

const addWorkExperience = () => {
    if (organization_Name && jobTitle && jobService && jobSector && jobStart && jobEnd && jobDescription && selectedState && selectedLga) {
      const newWorkExperience = {
        id: workExperience.length + 1, // You can generate or assign an ID as needed
        organization_name: organization_Name,
        jobtitle: jobTitle,
        jobservice: jobService,
        jobsector: jobSector,
        jobstart: jobStart,
        jobend: jobEnd,
        updated_at: new Date().toISOString(), // Current timestamp
        jobdescription: jobDescription,
        country: "Nigeria", // Assuming static value, you can replace with dynamic if needed
        city: selectedState,
        region: selectedLga,
        user: 108, // Replace with the actual user ID if needed
      };
  
      setWorkExperience([...workExperience, newWorkExperience]);
      console.log('Work experience added:', newWorkExperience);
    } else {
      console.error('Please fill in all fields before adding the work experience.');
    }
  };


  const genjobdetail = async () => {
    if (!organization_Name || !jobTitle || !jobService || !jobSector) {
        setJobDescription('Please fill out all fields.');
        return;
    }

    setLoading(true);

    const description = await generateJobDescriptionOverview(organization_Name, jobTitle, jobService, jobSector);
    
    setJobDescription(description || 'Failed to generate job description.');
    setLoading(false);
};
  return (
    <>
      <div className="reggrid">

      <Inputcomponent 
    inputState={organization_Name} 
    setInputState={setorganization_Name} 
    label="Organization Name" 
    inputType="text" 
    name="Organization Name" 
    id="Organization_Name" 
/>

 <Inputcomponent 
    inputState={jobTitle} 
    setInputState={setJobTitle} 
    label="Job Title" 
    inputType="text" 
    name="jobTitle" 
    id="jobTitle" 
/>

<Inputcomponent 
    inputState={jobService} 
    setInputState={setJobService} 
    label="Job Service" 
    inputType="text" 
    name="jobService" 
    id="jobService" 
/>

<Inputcomponent 
    inputState={jobSector} 
    setInputState={setJobSector} 
    label="Job Sector" 
    inputType="text" 
    name="jobSector" 
    id="jobSector" 
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


<Inputcomponent 
    inputState={jobStart} 
    setInputState={setJobStart} 
    label="Job Start Date" 
    inputType="date" 
    name="jobStart" 
    id="jobStart" 
/>

<Inputcomponent 
    inputState={jobEnd} 
    setInputState={setJobEnd} 
    label="Job End Date" 
    inputType="date" 
    name="jobEnd" 
    id="jobEnd" 
/>


    </div>
    <div className="miniforminput">
    <label htmlFor='jobDescription'>Job Description            
     <button onClick={genjobdetail} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Job Description'}
            </button>  </label>
    <div className="miniforminputdata">
    <textarea 
        id="jobDescription" 
        cols="20" 
        rows="10" 
        value={jobDescription} 
        onChange={(e) => setJobDescription(e.target.value)}
    />
    </div>
    </div>

    <div className="mybtns">
    
          <button className='mybtnwhite' onClick={togglemodal}>Back</button>
   

          <button className='mybtn' onClick={createWorkExperience}>Save</button>


  
      
     
    


      </div>

    </>
  


  )
}

export default Workexpform