import React, { useState } from 'react'
import {  toast } from 'sonner'
import Select from 'react-select';
import Inputcomponent from './Inputcomponent';
const EducationCreate = ({Universities, togglemodal, axiosInstance,}) => {
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedUniversitydata, setSelectedUniversitydata] = useState(null);
    const [course, setCourse] = useState('');
    const [degree, setDegree] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');


    const universityOptions = Universities?.map(university => ({
        value: university.id,
        label: university.institution
    })) || [];

    // Handler for when an option is selected
    const handleSelectChange = (selectedOption) => {
        setSelectedUniversity(selectedOption.value);
        setSelectedUniversitydata(selectedOption)
    };
     

const createUniversity = async () => {
        const payload = {
            university: selectedUniversity, // Replace with the actual university ID
            course: course,
            degree: degree,
            start_date: startDate,
            finish_date: finishDate,
        };
    
        if (selectedUniversity && course && degree && startDate && finishDate) {
            try {
                const response = await axiosInstance.post('/university_view/', payload);
                toast.success('University instance created successfully!');
                console.log(response.data);
                togglemodal();
            } catch (error) {
                toast.error(error.response ? error.response.data.message || 'Error creating university instance' : 'Failed to connect to server');
                console.error(error);
            }
        } else {
            toast.error('Please fill all fields');
        }
    };

  return (
    <>
    <div className="reggrid">
<div className="miniforminput">
  <label htmlFor='Country'>Degree</label>
  <div className="miniforminputdata">

    <Select
    className='myselect'
                options={universityOptions}
                value={selectedUniversitydata}
                onChange={handleSelectChange}
                placeholder="Select University"
                isLoading={Universities?.length === 0}
                isDisabled={Universities?.length === 0}
            />
</div>
</div>


    <Inputcomponent 
  inputState={course} 
  setInputState={setCourse} 
  label="Course" 
  inputType="text" 
  name="course" 
  id="course" 
/>




<div className="miniforminput">
  <label htmlFor='Country'>Degree</label>
  <div className="miniforminputdata">

  <select value={degree} onChange={(e) => setDegree(e.target.value)}>
  <option value="" disabled>Select Degree</option>
  <option value="Associate degree">Associate degree</option>
  <option value="Bachelor degree">Bachelor degree</option>
  <option value="Master degree">Master degree</option>
  <option value="Doctoral degree">Doctoral degree</option>
  <option value="Diploma degree">Diploma degree</option>
  <option value="Certificate">Certificate</option>
  <option value="Advanced Diploma">Advanced Diploma</option>
  <option value="Graduate Diploma">Graduate Diploma</option>
  <option value="Professional Certificate">Professional Certificate</option>
  <option value="Postgraduate Certificate">Postgraduate Certificate</option>
  <option value="Postgraduate Diploma">Postgraduate Diploma</option>
  <option value="Fellowship">Fellowship</option>
  <option value="Licentiate">Licentiate</option>
  <option value="Honours degree">Honours degree</option>
  <option value="Specialist degree">Specialist degree</option>
  <option value="Technical degree">Technical degree</option>
  <option value="Vocational degree">Vocational degree</option>
</select>
  </div>
  </div> 


  <Inputcomponent 
  inputState={startDate} 
  setInputState={setStartDate} 
  label="Start Date" 
  inputType="date" 
  name="startDate" 
  id="startDate" 
/>

<Inputcomponent 
  inputState={finishDate} 
  setInputState={setFinishDate} 
  label="Finish Date" 
  inputType="date" 
  name="finishDate" 
  id="finishDate" 
/>





  </div>


  <div className="mybtns">
  
        <button className='mybtnwhite' onClick={togglemodal}>Back</button>
 

        <button className='mybtn' onClick={createUniversity}>Save</button>



    
   
  


    </div>

  </>
  )
}

export default EducationCreate