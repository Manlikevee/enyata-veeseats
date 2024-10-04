'use client';
import Inputcomponent from '@/components/Inputcomponent';
import AiLayout from '@/components/ailayout/AiLayout';
import Loader from '@/components/utils/Loader';
import Radio from '@/components/utils/Radio';
import Typewriter from '@/components/utils/Typewriter';
import UserDetailsForm from '@/components/utils/UserDetailsForm';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [isLoading, setIsloading] = useState(false);
  const [userdetails, setUserdetails] = useState([
    {
      first_name: null,
      last_name: null,
      work_type: null,
      joke: null,
      experience_level: null,
      model_name: null,
      profile_summary: null,
      skills : [],
      anonymous: true
    }
  ]);




  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [intro, setIntro] = useState('');
  const [field, setField] = useState('');
  const promptBarRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);
  const bottomRef = useRef(null); // Reference to the bottom div
  const [refId, setRefId] = useState(null);
  const [modelrefId, setmodelRefId] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [modelupload, setmodelupload] = useState(null);
  const [isreturning, setisreturning] = useState(false);
  const [isfinished, setisfinished] = useState(false);
  
  let isFetching = false; 

  useEffect(() => {
    const storedRefId = localStorage.getItem('ref_id');
    const uploaded_model_id = localStorage.getItem('uploaded_model_id');
  
    if (uploaded_model_id && uploaded_model_id !== "null" && uploaded_model_id !== "") {
      setisreturning(true);
      setisfinished(true);
      setmodelRefId(uploaded_model_id); 
      handleStep(6.6); 
    } else if (storedRefId && storedRefId !== "null" && storedRefId !== "") {
      setisreturning(true);
      setRefId(storedRefId); 
      handleStep(6);
    }
  }, []); 
  
  
  const handleToggleChange = (e) => {
    handleChange({
      target: {
        name: e.target.name,
        value: e.target.checked
      }
    });
  };


  function resetgame(){
    localStorage.clear()
    setStep(1)
    setisreturning(false);
    setResponseMessage('');
    setIntro('')
    setRefId(null);
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const handleStep = (nextStep) => {
    if (nextStep > step) {
      setStep(nextStep);
    }
  };

  const handleNameSubmit = () => {
    handleStep(3);
  };

  const handleIntroSubmit = (e) => {
    e.preventDefault();
    handleStep(4);
  };

  const handleFieldChange = (e) => {
    setField(e.target.value);
    handleStep(5);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted User Details:', userdetails[0]);
    setIsloading(true);
  
    axios
      .post("https://bsjobapi.vercel.app/ai-model/create/", userdetails[0])
      .then((response) => {
        console.log('Response:', response.data);
         // Navigate to next step
        const uploaded_model_id = localStorage.setItem('uploaded_model_id', response.data.ref_id);
        setmodelupload(response.data);  
        setmodelRefId(response.data.ref_id);
        setIsloading(false);  // Stop loading
        handleStep(6.6); 
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsloading(false);  // Stop loading when error occurs
        toast.error('An error occurred while creating the model. Please try again.'); // Show error message
      });
  };


  useEffect(() => {
    let pollInterval;

    if (refId) {
        pollInterval = setInterval(async () => {
            if (isFetching) return; // Skip if a request is already in progress

            isFetching = true; // Set to true when starting a request
            try {
                const statusResponse = await axios.get(`https://bsjobapi.vercel.app/check-status/${refId}/`);
                const { is_parsed, parsed_data: jsonResponse } = statusResponse.data;

                if (is_parsed) {
                    clearInterval(pollInterval); // Stop polling

                    // Remove the ```json markers if present
                    let cleanedResponse = jsonResponse;
                    if (cleanedResponse.includes('```json')) {
                        cleanedResponse = cleanedResponse.replace(/```json/g, '').replace(/```/g, '');
                    }

                    try {
                        const parsedData = JSON.parse(cleanedResponse);
                        const formattedJson = parsedData;
                        setResponseMessage(formattedJson);

                        

                        setUserdetails((prevDetails) => [
                          {
                            ...prevDetails[0],  // Keep other values unchanged
                            first_name: formattedJson["First Name"],
                            last_name: formattedJson["Last Name"],
                            work_type: formattedJson["Work type"],
                            joke: formattedJson?.comment,
                            experience_level: formattedJson["Work level"],  
                            profile_summary: formattedJson?.Summary,
                            skills : formattedJson?.Skills     
                          }
                        ]);
                        console.log('userdetails', userdetails)
                        toast.success('Resume Analysis Completed');
                        console.log(responseMessage);
                    } catch (parseError) {
                        setResponseMessage('Error parsing JSON response.');
                        console.error('Parsing error:', parseError);
                    }
                }
            } catch (error) {
                console.error('Error checking parsing status:', error);
            } finally {
                isFetching = false; // Set to false when request completes
            }
        }, 5000); // Poll every 5 seconds
    }

    return () => {
        clearInterval(pollInterval); // Cleanup on component unmount
        isFetching = false; // Ensure isFetching is reset if the component unmounts
    };
}, [refId]); // Removed axios from dependencies since it's not necessary

const skillsList = responseMessage?.Skills?.map(skill => `- ${skill}`).join(',');
const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file && file.type === 'application/pdf') {
    setResumeFile(file);
    handleStep(5.5); // Proceed to the next step
    uploadPDF(file); // Call the uploadPDF function with the selected file
  } else {
    alert('Please upload a valid PDF file.');
  }
};


const uploadPDF = async (pdfFile) => {
  if (!pdfFile) {
    console.error('No PDF file selected');
    toast.error('No PDF file selected');
    return;
  }

  // Create FormData and append the PDF file from state
  const formData = new FormData();
  formData.append('pdf_file', pdfFile);

  try {
    // Send POST request to the endpoint using Axios
    const response = await axios.post('https://bsjobapi.vercel.app/AiPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Parse the JSON response
    const result = response.data;
    console.log('Upload successful:', result);


    const ref_id = result.ref_id;
    setRefId(ref_id);
    localStorage.setItem('ref_id', ref_id);

    // Display success notification
    toast.success(`PDF uploaded successfully. Ref ID: ${ref_id}`);
    handleStep(6)
  } catch (error) {
    console.error('Upload failed:', error);
    toast.error('Failed to upload PDF');
  }
};


const handleChange = (e) => {
  const { name, value } = e.target;

  // Update the userdetails state
  setUserdetails((prevDetails) => [
    {
      ...prevDetails[0],  // Keep other values unchanged
      [name]: value       // Update the field dynamically
    }
  ]);
};

  return (
    <AiLayout hidelinks>
      <div className="chatall">
        <div className="herocontainer">
          <div className="interview-prep">
            <div className="promptbar" ref={promptBarRef}>


{!isreturning &&  (
  <>
                {step >= 1 && (
                <div className="promptblob story">
                  <div className="schname">VeeAi</div>
                  <Typewriter
                    text="Welcome to your personalized interview preparation session with VeeAi."
                    speed={50}
                    onDone={() => handleStep(2)}
                  />
                </div>
              )}
              {step >= 2 && (
                <>
                  <div className="promptblob story">
                    <div className="schname">VeeAi</div>
                    <Typewriter text="What's your name?" speed={50} />
                  </div>
                  <div className="promptblob story sentmail">
                    <div className="schname">{userName || 'user'}</div>
                    <div className="myrequestbox">
                      <Inputcomponent
                        inputState={userName}
                        setInputState={setUserName}
                        label="Enter your name"
                        inputType="text"
                        name="userName"
                        id="userName"
                      />
                      <button type="submit" onClick={handleNameSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              )}
              {step >= 3 && (
                <>
                  <div className="promptblob story">
                    <div className="schname">VeeAi</div>
                    <Typewriter
                      text={`Nice to meet you, ${userName}. Can you give me a brief introduction about yourself?`}
                      speed={50}
                    />
                  </div>
                  <div className="promptblob story sentmail">
                    <div className="schname">{userName || 'user'}</div>
                    <div className="myrequestbox">
                      <form onSubmit={handleIntroSubmit}>
                        <textarea
                          value={intro}
                          onChange={(e) => setIntro(e.target.value)}
                          placeholder="Provide a brief introduction"
                          required
                        />
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                </>
              )}
              {step >= 4 && (
                <>
                  <div className="promptblob story">
                    <div className="schname">VeeAi</div>
                    <Typewriter
                      text="What field would you like to focus on for your interview prep?"
                      speed={50}
                    />
                  </div>
                  <div className="promptblob story sentmail">
                    <div className="schname">{userName || 'user'}</div>
                    <div className="myrequestbox">
                      <select value={field} onChange={handleFieldChange} required>
                        <option value="" disabled>
                          Select a field
                        </option>
                        <option value="Software Development">Software Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

{step >= 5 && (
                                <>
                                <div className="promptblob story">
                                    <div className="schname">VeeAi</div>
                                    <Typewriter
                                        text={`Hey ${userName} Kindly provide us with a resume, which will help tailor the AI questionnaire, simulating a live interview experience.`}
                                        speed={50}
                                    />
                                </div>

                                <div className="promptblob story sentmail">
                                    <div className="schname">{userName || 'User'}</div>
                                    <div className="myrequestbox">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </>

              )}

{step >= 5.5  && (
                                <div className="promptblob story">
                                    <div className="schname">VeeAi</div>
                                    <Typewriter text="okay.... We Are Reviewing Your Resume, Kindly Give Us A Few Seconds, I promise it wont take long 😀 😀 😀 😀" speed={50} />

                                    <div className="resume-preview">
                                    {step == 5.5 && ( <Loader/>)} 
                     
                                    </div>
                                </div>
                            )}
  
  </>
)}

              {step >= 6 &&  (
                <div className="promptblob story">
                  <div className="schname">VeeAi</div>
                  {step >= 6 && (
    <Typewriter
    text={`Please Wait.....`}
    speed={50}
    onDone={() => handleStep(6.2)}
  />
                  )} 
                {step == 5.5 || 6.2  && !responseMessage && ( <Loader/>)}  <br />


                </div>
              )}


       
{!isfinished && (
<>

{step >= 6.2 && responseMessage &&  (
          <div className="promptblob story">
          <div className="schname">VeeAi</div>

          <Typewriter
text={`
So, I got your name from your profile as ${responseMessage["First Name"]} ${responseMessage["Last Name"]}—I hope I got that right!

Now, let’s dive into your impressive skills. Here’s what you bring to the table:

${skillsList}

Wow, with a skill set like that, you must be the go-to person for just about everything!

When it comes to rating your profile, I'd say you're at an *${responseMessage["Work level"]}* work level—truly impressive!
`}
speed={20}
onDone={() => handleStep(6.3)}
/>


        </div>
                  )} 


{step >= 6.3 && (    
         <div className="promptblob story">
         <div className="schname">VeeAi</div>

     
         <Typewriter
           text={`
           digging deeper il say ${responseMessage?.Summary}
         `}
           speed={10}
           onDone={() => handleStep(6.4)}
         />

       </div>
)}

{step >= 6.4 && (    
         <div className="promptblob story">
         <div className="schname">VeeAi</div>

     
         <Typewriter
           text={`
           Would You Like to change anything about your profile.
         `}
           speed={10}
           onDone={() => handleStep(6.45)}
         />
{step == 6.45 && (
        <Radio handleStep={handleStep} />
)}


       </div>
)}


{step == 6.46 && (
                     <div className="promptblob story sentmail">
                     <div className="schname">{userName || userdetails[0].first_name || 'user'}</div>
                     <div className="myrequestboxx">
        <Typewriter
    text={`
    Kindly Update Your Personalized Ai Model Accordingly
  `}
    speed={10}
  
  />

    <UserDetailsForm 
    userdetails={userdetails} 
    handleChange={handleChange} 
    handleSubmit={handleSubmit} 
    isLoading={isLoading}
  />
  
  </div>
  </div>
   

)

}


{step >= 6.5 && (
             <div className="promptblob story ">
             <div className="schname">{userName || 'user'}</div>
             {/* <div className="myrequestbox">
               <Inputcomponent
                 inputState={userName}
                 setInputState={setUserName}
                 label="Enter your name"
                 inputType="text"
                 name="userName"
                 id="userName"
               />
               <button type="submit" >
                 Submit
               </button>
             </div> */}
        <Typewriter
    text={`
    ${userdetails[0].first_name || userName || user } the ${modelupload?.work_type}, 😏😏😏.. ${modelupload?.joke} `}
    speed={10}
    onDone={() => handleStep(6.6)}
  
  />


             {step >= 6.6 && (       
               <Typewriter
    text={`Here Is A Link To Access YOUR tRAINED ai Model`}
    speed={10}
  
  />) }
           </div>
)}


</>

)} 



{step >= 6.6 && (
             <div className="promptblob story ">
             <div className="schname">{userName || 'user'}</div>

              
               <Typewriter
    text={`Here Is A Link To Access YOUR Trained Ai Model `}
    speed={10}
  
  />
  <Link href={`/ai/playground/${modelupload?.ref_id || modelrefId}`}>Playground Link, Please Save Somewhere Safe</Link>
           </div>
)}

<br />
<div className="refreshchatdiv">
{/* <span className="material-symbols-outlined">
add
</span> */}

<span class="material-symbols-outlined" onClick={resetgame}>
cycle
</span>

<span class="material-symbols-outlined">
ios_share
</span>
</div>
              {/* Bottom div for scrolling */}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>

        {step === 8 && (
          <div className="chatbar">
            <div className="chatinput">
              <div className="buttonicon greyicon">
                <span className="material-symbols-outlined">upload_file</span>
              </div>
              <input
                type="text"
                placeholder="VeeAi. Prepare with personalized insights and guidance."
              />
              <div className="buttonicon">
                <span className="material-symbols-outlined">keyboard_arrow_up</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AiLayout>
  );
};

export default Page;
