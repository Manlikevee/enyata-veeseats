'use client'
import Rolecard from '@/components/Rolecard';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter'
import React, { useEffect, useRef , useState, useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import LazyJobcard from '../Lazyloading/LazyJobcard';
import Select from 'react-select';
import Titleddiv from '@/components/Titleddiv';
import Inputcomponent from '../Inputcomponent';
import { toast } from 'sonner';

const Rolematchview = () => {
    const { test,allJobs, loadingcards, axiosInstance, allSavedJobs, savejob, individualsdata, applications, roleMatch, roleMatchLoading, userprofile } = useContext(VeeContext);
    const [boardExperience, setBoardExperience] = useState(userprofile?.board_experience);
    const [managerialExperience, setManagerialExperience] = useState(userprofile?.managerial_experience);
    const [jobMinimumExperience, setJobMinimumExperience] = useState(userprofile?.jobminimumexperience);
    const [activeTab, setActiveTab] = useState(0); // Set the first tab as active by default
    const [editTab, seteditTab] = useState(false); 
    const [skillAreas, setSkillAreas] = useState([
        { value: 'frontend', label: 'Frontend Development' },
        { value: 'backend', label: 'Backend Development' },
        { value: 'fullstack', label: 'Full Stack Development' },
        { value: 'mobile', label: 'Mobile Development' },
        { value: 'data', label: 'Data Science' },
        { value: 'devops', label: 'DevOps' },
        { value: 'uiux', label: 'UI/UX Design' },
        { value: 'ml', label: 'Machine Learning' },
        { value: 'cloud', label: 'Cloud Computing' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
        { value: 'networking', label: 'Networking' },
        { value: 'ai', label: 'Artificial Intelligence' },
        { value: 'blockchain', label: 'Blockchain' },
        { value: 'quantum', label: 'Quantum Computing' },
        { value: 'iot', label: 'Internet of Things' },
        { value: 'vr', label: 'Virtual Reality' },
        { value: 'ar', label: 'Augmented Reality' },
        { value: 'robotics', label: 'Robotics' },
        { value: 'database', label: 'Database Management' },
        { value: 'bigdata', label: 'Big Data' },
        { value: 'game', label: 'Game Development' },
        { value: 'aiops', label: 'AIOps' },
        { value: 'seo', label: 'SEO Optimization' },
        { value: 'content', label: 'Content Creation' },
        { value: 'graphic', label: 'Graphic Design' },
        { value: 'video', label: 'Video Editing' },
        { value: 'photography', label: 'Photography' },
        { value: 'writing', label: 'Creative Writing' },
        { value: 'translation', label: 'Translation' },
        { value: 'marketing', label: 'Digital Marketing' },
        { value: 'smm', label: 'Social Media Management' },
        { value: 'advertising', label: 'Advertising' },
        { value: 'branding', label: 'Branding' },
        { value: 'product', label: 'Product Management' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'finance', label: 'Finance' },
        { value: 'accounting', label: 'Accounting' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'legal', label: 'Legal' },
        { value: 'project', label: 'Project Management' },
        { value: 'supply', label: 'Supply Chain Management' },
        { value: 'logistics', label: 'Logistics' },
        { value: 'healthcare', label: 'Healthcare Management' },
        { value: 'nursing', label: 'Nursing' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'pharmacy', label: 'Pharmacy' },
        { value: 'nutrition', label: 'Nutrition' },
        { value: 'psychology', label: 'Psychology' },
        { value: 'counseling', label: 'Counseling' },
        { value: 'education', label: 'Education' },
        { value: 'teaching', label: 'Teaching' },
        { value: 'research', label: 'Research' },
        { value: 'architecture', label: 'Architecture' },
        { value: 'civil', label: 'Civil Engineering' },
        { value: 'mechanical', label: 'Mechanical Engineering' },
        { value: 'electrical', label: 'Electrical Engineering' },
        { value: 'chemical', label: 'Chemical Engineering' },
        { value: 'biotech', label: 'Biotechnology' },
        { value: 'environmental', label: 'Environmental Science' },
        { value: 'agriculture', label: 'Agriculture' },
        { value: 'food', label: 'Food Science' },
        { value: 'horticulture', label: 'Horticulture' },
        { value: 'veterinary', label: 'Veterinary Medicine' },
        { value: 'sports', label: 'Sports Management' },
        { value: 'fitness', label: 'Fitness Training' },
        { value: 'yoga', label: 'Yoga Instruction' },
        { value: 'dance', label: 'Dance' },
        { value: 'music', label: 'Music Production' },
        { value: 'theater', label: 'Theater Arts' },
        { value: 'filmmaking', label: 'Filmmaking' },
        { value: 'journalism', label: 'Journalism' },
        { value: 'broadcasting', label: 'Broadcasting' },
        { value: 'animation', label: 'Animation' },
        { value: 'illustration', label: 'Illustration' },
        { value: 'interior', label: 'Interior Design' },
        { value: 'fashion', label: 'Fashion Design' },
        { value: 'photography', label: 'Photography' },
        { value: 'carpentry', label: 'Carpentry' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrician', label: 'Electrical Work' },
        { value: 'automotive', label: 'Automotive Repair' },
        { value: 'aviation', label: 'Aviation' },
        { value: 'logistics', label: 'Logistics Management' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'hospitality', label: 'Hospitality Management' },
        { value: 'culinary', label: 'Culinary Arts' },
        { value: 'bakery', label: 'Bakery' },
        { value: 'wine', label: 'Wine Making' },
        { value: 'tourism', label: 'Tourism Management' },
        { value: 'event', label: 'Event Planning' },
        { value: 'customer_service', label: 'Customer Service' },
        { value: 'retail', label: 'Retail Management' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'entrepreneurship', label: 'Entrepreneurship' },
        { value: 'innovation', label: 'Innovation Management' },
        { value: 'sustainability', label: 'Sustainability' },
        { value: 'csr', label: 'Corporate Social Responsibility' },
        { value: 'ngo', label: 'Nonprofit Management' },
        { value: 'fundraising', label: 'Fundraising' },
        { value: 'grant_writing', label: 'Grant Writing' },
    ]);

    const areasOfExpertise = [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Mobile App Development",
        "Data Science",
        "Cloud Computing",
        "DevOps",
        "Cybersecurity",
        "Machine Learning",
        "Blockchain Technology",
      ];

      function toggleedittab(){
        seteditTab(!editTab)
      }


      const updatematch = async () => {
        const payload = {
            board_experience: boardExperience, // Replace with the actual university ID
            managerial_experience: managerialExperience,
            jobminimumexperience: jobMinimumExperience,
        };
    
        if (boardExperience && managerialExperience && jobMinimumExperience ) {
            try {
                const response = await axiosInstance.patch('/UserProfileView/', payload);
                toast.success('Role Match instance Updated successfully!');
                console.log(response.data);
                toggleedittab();
            } catch (error) {
                toast.error(error.response ? error.response.data.message || 'Error creating Role Match instance' : 'Failed to connect to server');
                console.error(error);
            }
        } else {
            toast.error('Please fill all fields');
        }
    };


    const handleChange = (selected) => {
        setSelectedSkills(selected);
        console.log(selectedSkills)
      };
    const [selectedSkills, setSelectedSkills] = useState([]);
    const tabs = [
        { id: 0, label: 'Role Match' },
        { id: 1, label: 'Match Settings' },
      ];
  
  return (
    <Layout>

    <div className="dashboard">
     <p></p>
    <h3></h3>
    
     <div className="tabs">
            {tabs.map((tab) => (
              <h4
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'activetab' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </h4>
            ))}
          </div>
          <Rolefilter/>
    
          <>
            {activeTab === 0 && (
                <div className="rolegrid">
    { roleMatch?.length > 0 && (
    <>
    {roleMatch.map((job, index) => (
            <Rolecard  job={job} key={index}  savejob={savejob} individualsdata={individualsdata} />
          ))}
          </>) }
    
          {roleMatchLoading &&  <><LazyJobcard />  <LazyJobcard />  <LazyJobcard /></>}
                    
                </div>
            )}
            {activeTab === 1 && <div className='dfgs'>
            <Titleddiv title={"Area of Expertise"}  edit myfunc={toggleedittab}>

                {
                    !editTab ? (           <div className="checkbox-group">

                    <div className="profileitem">
                <div className="proflabel">Board Experience</div>
                <div className="profvalue">{userprofile?.board_experience} Years </div>
              </div>
              <div className="profileitem">
                <div className="proflabel">Mangererial Experience</div>
                <div className="profvalue">{userprofile?.managerial_experience} Years </div>
              </div>
         
              <div className="profileitem">
                <div className="proflabel">Work Experience</div>
                <div className="profvalue">{userprofile?.jobminimumexperience} Years</div>
              </div>
              <div className="profileitem">
                <div className="proflabel">City</div>
                <div className="profvalue">{userprofile?.city}</div>
              </div>
              <div className="profileitem">
                <div className="proflabel">Region</div>
                <div className="profvalue">{userprofile?.region}</div>
              </div>
                    </div>) : (           <>
        
        <div className="reggrid">
        <Inputcomponent 
     inputState={boardExperience} 
     setInputState={setBoardExperience} 
     label="Work Experience" 
     inputType="number" 
     name="Experience" 
     id="work_Experience" 
   />

<Inputcomponent 
inputState={managerialExperience} 
setInputState={setManagerialExperience} 
label="Managerial Experience" 
inputType="number" 
name="managerialExperience" 
id="managerial_experience" 
/>


<Inputcomponent 
inputState={jobMinimumExperience} 
setInputState={setJobMinimumExperience} 
label="Job Minimum Experience" 
inputType="number" 
name="jobMinimumExperience" 
id="job_minimum_experience" 
/>

         </div>
         <div className="mybtns">

       <button className='mybtnwhite' onClick={toggleedittab}>Cancel</button>
   
  
       <button className='mybtn' onClick={updatematch}>Save</button>

     </div>

     </>)
                }


         </Titleddiv>



    <Titleddiv title={"Area of Expertise"}>
    <div className="miniforminput">
    <label htmlFor='Country'>skillAreas</label>
    <div className="miniforminputdata ">

    <Select
    isMulti
    name="colors"
    options={skillAreas}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={handleChange}
  />
    </div>
    </div> 
           <div className="skillgrid">
             {areasOfExpertise.map((expertise, index) => (
               <div key={index} className="skillcard">
                 {expertise}
               </div>
             ))}
           </div>
           <br />
         </Titleddiv>
       
              <br />
              </div>

              
              }
          </>
    
    
    
        </div>
        
        </Layout>
  )
}

export default Rolematchview