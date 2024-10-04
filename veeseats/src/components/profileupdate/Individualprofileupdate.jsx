'use client'
import React, { useContext, useEffect, useState } from 'react'
import Inputcomponent from '../Inputcomponent'
import { VeeContext } from '../context/Chatcontext';
import { toast } from 'sonner';
import lgaData from '@/components/dashboard/lgaData.json';
import data from '@/components/dashboard/servicelist.json';
import Select from 'react-select';
import PricingCard from '../dashboard/PricingCard';
import { PaystackButton } from 'react-paystack'
import PayButton from '../PayButton';
const Individualprofileupdate = () => {
    const [jobExperiences, setJobExperiences] = useState([]);
    const { userprofile , axiosInstance, optimizeBusinessDescription, currentStep,
        setCurrentStep, Universities, setUserprofile} = useContext(VeeContext);
        const [universities, setUniversities] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [jobMinimumExperience, setJobMinimumExperience] = useState(2);
    const [managerialExperience, setManagerialExperience] = useState(2);
    const [boardExperience, setBoardExperience] = useState(2);
    const [favouriteCategory, setFavouriteCategory] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('Nigeria');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(234);
    const [cv, setCv] = useState(null);
    const [options, setOptions] = useState([]);
    const [reference, setReference] = useState(null);
    const [activeplanid, setactiveplanid] = useState(null);
    

    useEffect(() => {
      console.log(userprofile)
      if (userprofile) {
        setJobMinimumExperience(userprofile.jobminimumexperience || 2);
        setManagerialExperience(userprofile.managerial_experience || 2);
        setBoardExperience(userprofile.board_experience || 2);
        setFavouriteCategory(userprofile.favourite_category || '');
        setBio(userprofile.bio || '');
        setCountry(userprofile.country || 'Nigeria');
        setCity(userprofile.city || '');
        setRegion(userprofile.region || '');
        setLinkedinUrl(userprofile.linkdeinUrl || '');
        setPhoneNumber(userprofile.phonenumber || 234);
      }
    }, [userprofile]);


    const pricingData = [
        {
          title: 'Free Plan',
          price: '0.00',
          details: 'Perfect for individuals just getting started with AI-assisted content creation.',
          features: [
            'Basic candidate search',
            'Post up to 3 jobs',
            'Email notifications',
            'Access to basic analytics',
            'Profile creation tools',
            'Basic resume search',
            'Standard job listing visibility',
            'Limited candidate messaging',
            'Job posting templates',
            'Basic support',
          ],
        },
        {
          title: 'Premium Plan',
          price: '14,000.00/per month',
          details: 'Ideal for freelancers and small businesses looking to enhance their content output with more advanced features and personalized support.',
          features: [
            'Advanced candidate search',
            'Post unlimited jobs',
            'Candidate ranking system',
            'Custom email templates',
            'In-depth analytics',
            'Advanced resume search',
            'Job post visibility boost',
            'Enhanced candidate messaging',
            'Priority support',
            'Monthly performance reports',
          ],
        },
        {
          title: 'Pro Plan',
          price: '20,000.00/per month',
          details: 'Designed for growing businesses and marketing teams seeking to scale their content strategy with AI-driven insights and tools.',
          features: [
            'Advanced candidate search',
            'Post unlimited jobs',
            'Candidate ranking system',
            'Custom email templates',
            'In-depth analytics',
            'Advanced resume search',
            'Job post visibility boost',
            'Enhanced candidate messaging',
            'Priority support',
            'Monthly performance reports',
            'AI-powered candidate matching',
            'Team collaboration tools',
            'Priority customer support',
            'Dedicated account manager',
            'Unlimited profile exports',
          ],
        },
      ];
      

      const publicKey = 'pk_test_5cff1482a437c3feb9114d509f327eda9366d37e';


   
        const handleCardClick = () => {
          console.log('Card clicked');
        };
 


        function handlePrint(myref) {
          const payload = {
            pref : myref,
            planid: 2,

          };
        
          console.log("Payload:", payload);
        
          // Make the POST request using Axios
          axiosInstance.post('/subscription/', payload)
            .then(response => {
              console.log('Response:', response.data);
              toast.success('Job Posted Successfully')
              // Handle success (e.g., display a success message or navigate to another page)
            })
            .catch(error => {
              console.error('Error:', error);
              // Handle error (e.g., display an error message)
            });
        
          return payload;
        }


    
    const handleStateChange = (event) => {
        setCity(event.target.value);
        setRegion(''); // Reset selected LGA when state changes
      };


      const addJobExperienceForm = () => {
        setJobExperiences([
          ...jobExperiences,
          {
            organizationName: '',
            jobTitle: '',
            jobService: '',
            jobSector: '',
            jobStart: '',
            jobEnd: '',
            jobDescription: '',
            selectedState: '',
            selectedLga: '',
          },
        ]);
      };
    
      // Handle removing a job experience form
      const removeJobExperienceForm = (index) => {
        const updatedJobExperiences = jobExperiences.filter((_, i) => i !== index);
        setJobExperiences(updatedJobExperiences);
      };





      const handleExpChange = (index, field, value) => {
        const updatedJobExperiences = jobExperiences.map((job, i) =>
          i === index ? { ...job, [field]: value } : job
        );
        setJobExperiences(updatedJobExperiences);
        console.log(jobExperiences)
      };
    
      // Handle state change
      const handleExpStateChange = (index, event) => {
        const mystate = event.target.value;
        console.log(mystate)
        handleExpChange(index, 'selectedState', mystate);
      
        
      };
    
      // Handle submission
      const createJobExperience = async () => {
        const payload = jobExperiences.map(experience => ({
          organization_Name: experience.organizationName,
          jobTitle: experience.jobTitle,
          jobService: experience.jobService,
          jobSector: experience.jobSector,
          jobStart: experience.jobStart,
          jobEnd: experience.jobEnd,
          jobDescription: experience.jobDescription,
          state: experience.selectedState,
          lga: experience.selectedLga,
        }));
    
        if (payload.length > 0) {
          // Ensure there's at least one job entry
          try {
            const response = await axiosInstance.post('/BulkJobExperienceCreateView', payload, {
              headers: { 'Content-Type': 'application/json' },
            });
            toast.success('Job experiences created successfully!');
            console.log(response.data);
            setCurrentStep(4);
          } catch (error) {
            toast.error(error.response ? error.response.data.message || 'Error creating job experiences' : 'Failed to connect to server');
            console.error(error);
          }
        } else {
          toast.error('No data to send. Please fill out the job experience forms.');
        }
      };











      useEffect(() => {
        // Load options from JSON file
        setOptions(data);
      }, []);


      const handleChange = (selectedOption) => {
        setFavouriteCategory(selectedOption ? selectedOption.value : '');
      };


      const updatedetails = async () => {
        setIsloading(true)
        const payload = {
            jobminimumexperience: jobMinimumExperience,
            managerial_experience: managerialExperience,
            board_experience: boardExperience,
            favourite_category: favouriteCategory,
            bio: bio,
            country: country,
            city: city,
            region: region,
            linkdeinUrl: linkedinUrl, 
            phonenumber: phoneNumber,
            profile_verified: true
          };
    
        if (payload) {
            try {
                const response = await axiosInstance.patch('/UserProfileView/', payload);
                toast.success('User Details Updated Successfully!');
                setUserprofile(response.data);
                setCurrentStep(2)
                setIsloading(false);
            } catch (error) {
                toast.error(error.response ? error.response.data.message || 'Error Updated User Details instance' : 'Failed to connect to server');
                console.error(error);
                setIsloading(false);
            }
        } else {
            toast.error('Please fill all fields');
        }
    };


    const handleNext = () => {
        const missingFields = [];
      
        // Check for missing fields and add them to the `missingFields` array
        if (jobMinimumExperience === '') {
          missingFields.push('Job Minimum Experience');
        }
        if (managerialExperience === '') {
          missingFields.push('Managerial Experience');
        }
        if (boardExperience === '') {
          missingFields.push('Board Experience');
        }
        if (favouriteCategory.trim() === '') {
          missingFields.push('Favourite Category');
        }
        if (bio.trim() === '') {
          missingFields.push('Bio');
        }
        if (country.trim() === '') {
          missingFields.push('Country');
        }
        if (city.trim() === '') {
          missingFields.push('City');
        }
        if (region.trim() === '') {
          missingFields.push('Region');
        }
        if (linkedinUrl.trim() === '') {
          missingFields.push('LinkedIn URL');
        }
        if (phoneNumber === '') {
          missingFields.push('Phone Number');
        }
   
      
        // If there are missing fields, toast each one individually
        if (missingFields.length > 0) {
          missingFields.forEach((field) => {
            toast.info(`Please fill in the ${field} field.`);
          });
          return; // Prevent moving to the next step
        }
      
        if(currentStep ==1){
            updatedetails()
        } else{
            setCurrentStep((prevStep) => prevStep + 1);
        }
        // If all fields are filled, proceed to the next step

      };


    const handleBack = () => {
        setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
      };



  // Handle adding a new form instance
  const addUniversityForm = () => {
    setUniversities([...universities, {
      selectedUniversity: null,
      selectedUniversitydata: null,
      course: '',
      degree: '',
      startDate: '',
      finishDate: ''
    }]);
  };

  // Handle removing a form instance
  const removeUniversityForm = (index) => {
    const updatedUniversities = universities.filter((_, i) => i !== index);
    setUniversities(updatedUniversities);
  };

  // Handle field changes for a particular form
  const handleChanges = (index, field, value) => {
    const updatedUniversities = universities.map((university, i) => 
      i === index ? { ...university, [field]: value } : university
    );
    setUniversities(updatedUniversities);
  };

  const universityOptions = Universities?.map(university => ({
    value: university.id,
    label: university.institution
})) || [];

  // Handle submission
  const handleSave = () => {
    let allFieldsFilled = true;

    universities.forEach((university, index) => {
      if (
        !university.selectedUniversitydata ||
        !university.course.trim() ||
        !university.degree ||
        !university.startDate ||
        !university.finishDate
      ) {
        allFieldsFilled = false;
        console.log(`Please fill out all fields for entry ${index + 1}`);
      }
    });

    if (allFieldsFilled) {
      console.log('University Data:', universities);
      createUniversity()
    } else {
      console.log('Some fields are missing.');
    }
  };

  const createUniversity = async () => {
    setIsloading(true);

    // Prepare payload
    const payload = universities.map(university => ({
        selectedUniversitydata: university.selectedUniversitydata, // Use actual university value
        course: university.course,
        degree: university.degree,
        startDate: university.startDate,
        finishDate: university.finishDate,
    }));

    if (payload.length > 0) { // Ensure there's at least one university entry
        try {
            const response = await axiosInstance.post('/BulkUniversityCreateView', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('University instances created successfully!');
            console.log(response.data);
            setIsloading(false);
            setCurrentStep(3);
        } catch (error) {
            toast.error(error.response ? error.response.data.message || 'Error creating university instances' : 'Failed to connect to server');
            console.error(error);
            setIsloading(false);
        }
    } else {
        toast.error('No data to send. Please fill out the university forms.');
        setIsloading(false);
    }
};

  return (
<>


{currentStep == 1 && (
    <>
<div className="reggrid">
<Inputcomponent 
  inputState={jobMinimumExperience} 
  setInputState={setJobMinimumExperience} 
  label="Job Minimum Experience" 
  inputType="number" 
  name="jobminimumexperience" 
  id="jobminimumexperience" 
/>

<Inputcomponent 
  inputState={managerialExperience} 
  setInputState={setManagerialExperience} 
  label="Managerial Experience" 
  inputType="number" 
  name="managerial_experience" 
  id="managerial_experience" 
/>

<Inputcomponent 
  inputState={boardExperience} 
  setInputState={setBoardExperience} 
  label="Board Experience" 
  inputType="number" 
  name="board_experience" 
  id="board_experience" 
/>


<div className="miniforminput">
    <label htmlFor='Country'>Favourite Category</label>


    <Select
        options={options}
        value={options.find(option => option.value === favouriteCategory)}
        onChange={handleChange}
  
      />

    </div> 


<Inputcomponent 
  inputState={country} 
  setInputState={setCountry} 
  label="Country" 
  inputType="text" 
  name="country" 
  id="country" 
  readonly
/>



<div className="miniforminput">
    <label htmlFor='Country'>State</label>
    <div className="miniforminputdata">

    <select value={city} onChange={handleStateChange}>
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

    <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option  >Select LGA</option>
        {city && (
            <>
                 {lgaData[city].map((lga, index) => (
              <option key={index} value={lga}>{lga}</option>
            ))} 
            </>
  )}

        </select> 
    </div>
    </div> 

<Inputcomponent 
  inputState={linkedinUrl} 
  setInputState={setLinkedinUrl} 
  label="LinkedIn URL" 
  inputType="text" 
  name="linkedinUrl" 
  id="linkedinUrl" 
/>



<Inputcomponent 
  inputState={phoneNumber} 
  setInputState={setPhoneNumber} 
  label="Phone Number" 
  inputType="number" 
  name="phonenumber" 
  id="phonenumber" 
/>


{/* <Inputcomponent 
  inputState={cv} 
  setInputState={setCv} 
  label="Upload CV" 
  inputType="file" 
  name="cv" 
  id="cv" 
/> */}
    </div>


<div className="miniforminput">
    <label >Biography/Profile Summary</label>
    <div className="miniforminputdata">
    
    <textarea
  id="bio"
  name="bio"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  rows="5"  // You can adjust the rows to make it taller or shorter
  cols="50" // You can adjust the columns for width
/>




    </div>


    </div>


</>
)}


{currentStep == 2 && (
    <div className='demacateddiv'>
  
      {universities.map((university, index) => (
        <>
       <div className="demacated">
       <h4>University Data {index + 1}   <span class="material-symbols-outlined" onClick={() => removeUniversityForm(index)}>
delete
</span> </h4>
        <div key={index} className="reggrid">
          <div className="miniforminput">
            <label>University</label>
            <div className="miniforminputdata">
              <Select
                className="myselect"
                options={universityOptions} // Add your university options here
                value={university.selectedUniversitydata}
                onChange={(option) => handleChanges(index, 'selectedUniversitydata', option)}
                placeholder="Select University"
                isLoading={universityOptions.length === 0}
                isDisabled={universityOptions.length === 0}
              />
            </div>
          </div>

          <Inputcomponent
            inputState={university.course}
            setInputState={(value) => handleChanges(index, 'course', value)}
            label="Course"
            inputType="text"
            name="course"
            id="course"
          />

          <div className="miniforminput">
            <label>Degree</label>
            <div className="miniforminputdata">
              <select
                value={university.degree}
                onChange={(e) => handleChanges(index, 'degree', e.target.value)}
              >
                <option value="" disabled>Select Degree</option>
                {/* Add degree options */}
                <option value="Bachelor degree">Bachelor degree</option>
                <option value="Master degree">Master degree</option>
                {/* Add other degree options */}
              </select>
            </div>
          </div>

          <Inputcomponent
            inputState={university.startDate}
            setInputState={(value) => handleChanges(index, 'startDate', value)}
            label="Start Date"
            inputType="date"
            name="startDate"
            id="startDate"
          />

          <Inputcomponent
            inputState={university.finishDate}
            setInputState={(value) => handleChanges(index, 'finishDate', value)}
            label="Finish Date"
            inputType="date"
            name="finishDate"
            id="finishDate"
          />

    
        </div>
       </div>
  
        </>
   
      ))}
<div className="mybtns">
<button onClick={addUniversityForm} className='mybtn createnew'>
<span class="material-symbols-outlined">
add
</span>  Add New University Data</button>
</div>
 
      <button onClick={handleSave}>Save All</button>
    </div>
)}

{currentStep == 3 && (
    <div className='demacateddiv'>
  
  {jobExperiences.map((job, index) => (
        <>
       <div className="demacated">
       <h4>Work Experience Data {index + 1}   <span class="material-symbols-outlined" onClick={() => removeJobExperienceForm(index)}>
delete
</span> </h4>
    
        <div key={index} className="reggrid">
          <div className="miniforminput">
            <label htmlFor={`organizationName_${index}`}>Organization Name</label>
            <div className="miniforminputdata">
              <input
                type="text"
                id={`organizationName_${index}`}
                value={job.organizationName}
                onChange={(e) => handleExpChange(index, 'organizationName', e.target.value)}
                placeholder="Organization Name"
              />
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`jobTitle_${index}`}>Job Title</label>
            <div className="miniforminputdata">
              <input
                type="text"
                id={`jobTitle_${index}`}
                value={job.jobTitle}
                onChange={(e) => handleExpChange(index, 'jobTitle', e.target.value)}
                placeholder="Job Title"
              />
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`jobService_${index}`}>Job Service</label>
            <div className="miniforminputdata">
              <input
                type="text"
                id={`jobService_${index}`}
                value={job.jobService}
                onChange={(e) => handleExpChange(index, 'jobService', e.target.value)}
                placeholder="Job Service"
              />
              
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`jobSector_${index}`}>Job Sector</label>
            <div className="miniforminputdata">
              <input
                type="text"
                id={`jobSector_${index}`}
                value={job.jobSector}
                onChange={(e) => handleExpChange(index, 'jobSector', e.target.value)}
                placeholder="Job Sector"
              />
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`jobStart_${index}`}>Job Start Date</label>
            <div className="miniforminputdata">
              <input
                type="date"
                id={`jobStart_${index}`}
                value={job.jobStart}
                onChange={(e) => handleExpChange(index, 'jobStart', e.target.value)}
                placeholder="Start Date"
              />
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`jobEnd_${index}`}>Job End Date</label>
            <div className="miniforminputdata">
              <input
                type="date"
                id={`jobEnd_${index}`}
                value={job.jobEnd}
                onChange={(e) => handleExpChange(index, 'jobEnd', e.target.value)}
                placeholder="End Date"
              />
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`jobDescription_${index}`}>Job Description</label>
            <div className="miniforminputdata">
              <textarea
                id={`jobDescription_${index}`}
                value={job.jobDescription}
                onChange={(e) => handleExpChange(index, 'jobDescription', e.target.value)}
                placeholder="Job Description"
              />
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`selectedState_${index}`}>State</label>
            <div className="miniforminputdata">
              <select
                id={`selectedState_${index}`}
                value={job.selectedState}
                onChange={(e) => handleExpStateChange(index, e)}
              >
                <option value="">Select State</option>
                {Object.keys(lgaData).map((state, idx) => (
                  <option key={idx} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="miniforminput">
            <label htmlFor={`selectedLga_${index}`}>LGA</label>
            <div className="miniforminputdata">
              <select
                id={`selectedLga_${index}`}
                value={job.selectedLga}
                onChange={(e) => handleExpChange(index, 'selectedLga', e.target.value)}
                disabled={!job.selectedState}
              >
                <option value="">Select LGA</option>
                {job.selectedState && lgaData[job.selectedState] && lgaData[job.selectedState].map((lga, idx) => (
                  <option key={idx} value={lga}>{lga}</option>
                ))}
              </select>
            </div>
          </div>


        </div>
  


       </div>
  
        </>
   
      ))}
<div className="mybtns">
<button onClick={addJobExperienceForm} className='mybtn createnew'>
<span class="material-symbols-outlined">
add
</span>  Add New Work Experience Data</button>
</div>
 
      <button onClick={createJobExperience}>Save All</button>
    </div>
)}

{currentStep == 4 && (
    <>
    <div className="demacated">

    <p className='story'>
    {/* <PayButton
        amount={2000}           // The amount to be paid (in Naira, convert to Kobo in the component)
        publicKey={publicKey} // Replace with your actual Paystack public key
        setReference={setReference}      // Function to store reference after successful payment
        handlePrint={handlePrint}        // Custom function to handle reference after success
      /> */}

  We’re excited to inform you that upon completing your profile update, your account will be upgraded with a <strong>Free 1-Month Trial Subscription</strong>! Enjoy the premium features and explore all that our platform has to offer at no cost for the next month.

  Clicking on a <strong>Pro</strong> or <strong>Premium Plan</strong> will extend the validity of your free trial. If you prefer, you can also click on the <strong>Free Plan</strong> to continue your trial and proceed to your dashboard.
</p>
</div>
    <div className="detailgrids">

    {pricingData.map((plan, index) => (
        <PricingCard
          key={index}
          title={plan.title}
          price={plan.price}
          details={plan.details}
          features={plan.features}
          onClick={handleCardClick}
        />
      ))}

</div>
    </>
)}
<br />

<div className="mybtns">
        {currentStep > 1 && (
          <button className='mybtnwhite' onClick={handleBack}>Back</button>
        )}
        {currentStep < 4 && (
<>
{isLoading ?    
        
        <button id="loadingBtn" className='mybtn' >
     
        <span className='loading-spinner'></span> 
         </button>
             :
             <button className='mybtn' onClick={handleNext}>Proceed</button>
              }
</>



        
        )}


<br />

      </div>

     </>

  )
}

export default Individualprofileupdate