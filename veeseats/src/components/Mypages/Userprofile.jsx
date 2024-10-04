"use client";
import React, { useState, useContext } from "react";
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import ReadMoreArea from "@foxeian/react-read-more";
import Workexperiencecard from "@/components/Workexperiencecard";
import Educationcard from "@/components/Educationcard";
import Checkboxgroup from "@/components/Checkboxgroup";
import axios from "axios";
import Mypopup from "@/components/dashboard/Mypopup";
import Workexpform from "@/components/Workexpform";
import { VeeContext } from "@/components/context/Chatcontext";
import EducationCreate from "@/components/EducationCreate";
import Bioedit from "@/components/Bioedit";
import FileUpload from "@/components/FileUpload";
import Userdetailsedit from "@/components/Userdetailsedit";
import Select from 'react-select';
import CopyToClipboard from "../CopyToClipboard";
import Inputcomponent from "../Inputcomponent";
import PlainTextRenderer from "../PlainTextRenderer";

const boardTypeOptions = [
    { label: "Start Up", value: "start_up" },
    { label: "Micro, Small, and Medium", value: "msme" },
    { label: "Large Corporation", value: "large_corporation" },
    { label: "All", value: "all" },
  ];
  
  const remunerationOptions = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Other Benefits", value: "other_benefits" },
    { label: "All", value: "all" },
  ];
  
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
  
  const buttonStyle = {
    color: "#0275B1",
    width: "fit-content",
    textdecoration: "none",
    padding: 0,
  };
  

const Userprofile = () => {
  const [showFullText, setShowFullText] = useState(false);

  const handleReadMoreClick = () => {
    setShowFullText(!showFullText);
  };
    const {generateJobDescriptionOverview,  axiosInstance, workExperience, setWorkExperience, Universities, selectedUniversity, userprofile, deleteUniversityRecord,
      deleteWorkExperience,           
         expertloading,
      setexpertloading,
      expertedit,
      toggleexpert,
      selectedSkills,
      setSelectedSkills,
      updateaoesperties,
      portfolioUrl, 
      setPortfolioUrl,
      portfolioeditloading, 
      setPortfolioEditLoading,
      portfolioeditmode, 
      setPortfolioEditMode,
      togglePortfolioEditMode ,
      updatePortfolio 
    } = useContext(VeeContext);
    const [checkedItems, setCheckedItems] = useState([]);
    const [profiledata, setprofiledata] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [edupopup, setEdupopup] = useState(false);
    const [bioedit, setBioedit] = useState(false);
    const [personaledit, setpersonaledit] = useState(false);
    const [fileuploadpopup, setfileuploadpopup] = useState(false);

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
    function togglfileemodal(){
      setfileuploadpopup(!fileuploadpopup);
    
    }
    const handleChange = (selected) => {
      setSelectedSkills(selected);
      console.log(selectedSkills)
    };
  
    function togglpersonalmodal(){
      setpersonaledit(!personaledit);
    }
    
    
  
    function togglemodal(){
      setIsloading(!isLoading);
    
    }
    function toggleEduemodal(){
      setEdupopup(!edupopup);
    
    }
    
  
    function togglebio(){
      setBioedit(!bioedit)
    }
  
    React.useEffect(() => {
      // Call this function when the component mounts to handle the LinkedIn callback
      handleLinkedInCallback();
    }, []);
  
    const handleGroupChange = (groupName, checkedItems) => {
      console.log(`${groupName}:`, checkedItems);
    };
  
    const addLinkedIn = async () => {
      const callbackurl = `${window.location.protocol}//${window.location.host}/user-profile/`;
      const requesturl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=771udvmb7mdwvl&redirect_uri=${callbackurl}&scope=openid%20profile%20email`;
    
      // Redirect user to LinkedIn for authorization
      window.location.href = requesturl;
    };
    
    const handleLinkedInCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const callbackurl = `${window.location.protocol}//${window.location.host}/user-profile/`;
      if (code) {
        try {
          axios
            .get(
              `http://bsjobapi.vercel.app/linkedin/callback/?code=${code}&redirect_uri=${callbackurl}`
            )
            .then((response) => {
              // Assuming the URL to redirect to is in response.data.redirectUrl
              console.log(response.data);
              setprofiledata(response.data.profile)
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } catch (error) {
          console.error("Error fetching LinkedIn data:", error);
        }
      }
    };
  
  
  
  
  
    

  return (
    <>
    {isLoading && (<Mypopup togglemodal={togglemodal} pagetitle={'Work Experience'}>
  <Workexpform togglemodal={togglemodal} generateJobDescriptionOverview={generateJobDescriptionOverview} axiosInstance={axiosInstance} workExperience={workExperience} setWorkExperience={setWorkExperience}/>
     </Mypopup>
     )}   
 
 {edupopup && (<Mypopup togglemodal={toggleEduemodal} pagetitle={'Education Experience'}>
 
  <EducationCreate axiosInstance={axiosInstance} togglemodal={toggleEduemodal} Universities={Universities} />
     </Mypopup>
     )}   
 
 {fileuploadpopup && (<Mypopup togglemodal={togglfileemodal} pagetitle={'Pdf CV Parser'}>
 
 <FileUpload/>
     </Mypopup>
     )}  
 
 {personaledit && (
   <Mypopup togglemodal={togglpersonalmodal} pagetitle={'Personal Details Update'}>
 <Userdetailsedit  axiosInstance={axiosInstance} togglemodal={togglpersonalmodal}/>
     </Mypopup>
 )}
 
 
 
 <Titleddiv title={"User Details"}>
 <div className="globeheader">
   <div className="globea">
     <div className="worl">
  <img src={userprofile?.avatar || "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}  alt="" />
     </div>
   </div>
   <div className="globebody">
     <div className="globetopflex">
       <div className="jtitle">
       {userprofile?.user?.first_name + ' ' + userprofile?.user?.last_name} <span></span>
       </div>
       <div className="flexx2">
         <div className="edit" onClick={togglpersonalmodal}>
         <span className="material-symbols-outlined">
 edit
 </span>
         </div>
 
       </div>
     </div>
     <div className="timeblock">
       <div className="jfrom"><CopyToClipboard myid={userprofile?.profuuid}/></div>
       {/* <div className="jto">2022-12-03</div> */}
       {/* <div className="jperiod">7 yrs 3 months</div> */}
     </div>
     <div className="jobdescription overview-text-subheader">
 
   <div className="checkbox-group">
     <div className="profileitem">
       <div className="proflabel"><span className="material-symbols-outlined">
 contact_mail
 </span> Email </div>
       <div className="profvalue">{userprofile?.user?.email}</div>
     </div>
 
     <div className="profileitem">
       <div className="proflabel"><span className="material-symbols-outlined">
       phone_iphone
 </span>Phone Number</div>
       <div className="profvalue">+234{userprofile?.phonenumber}</div>
     </div>
 
 
     <div className="profileitem">
       <div className="proflabel"><span className="material-symbols-outlined">
       travel_explore
 </span>Country</div>
       <div className="profvalue">Nigeria</div>
     </div>
 
     <div className="profileitem">
       <div className="proflabel"><span className="material-symbols-outlined">
       captive_portal
 </span>City</div>
       <div className="profvalue">{userprofile?.city}</div>
     </div>
 
     <div className="profileitem">
       <div className="proflabel"><span className="material-symbols-outlined">
       female
 </span>Gender</div>
       <div className="profvalue">Male</div>
     </div>
   </div>
 
      
     </div>
   </div>
 </div>
 </Titleddiv>
 
         <Titleddiv title={"Biography"} edit myfunc={togglebio}>
        {!bioedit ? (          <ReadMoreArea
             style={{ display: "block", flexDirection: "column" }} // inline styles of main div
             expandLabel="See more" // Expand Label
             collapseLabel="See less" // Collapse Label
             buttonStyle={buttonStyle} // inline styles of button
             lettersLimit={550} // limit of letters (100 letters)
           >
       
             {userprofile?.bio || ''}
 
        
           
           </ReadMoreArea>) : ( <Bioedit togglebio={togglebio} biodata={userprofile?.bio || ''} axiosInstance={axiosInstance}/> )}
 
 
 
 
 
         </Titleddiv>
 
         <Titleddiv title={"Connections"}>
         <button onClick={addLinkedIn} className="linkdeinbtn">
           
          <img src="/linkdein.png" alt="" /> {profiledata ? (profiledata.name) : ('Connect Linkdein Account')} </button>
 </Titleddiv>

         <Titleddiv title={"Portfolio"} edit myfunc={togglePortfolioEditMode}>

{portfolioeditmode ? (

<>
<Inputcomponent 
        inputState={portfolioUrl} 
        setInputState={setPortfolioUrl} 
        label="Portfolio Url" 
        inputType="url" 
        name="Portfolio Url" 
        id="Portfolio-Url" 
    
      />


           {portfolioeditmode && 
           <div className="mybtns">
        <button className="mybtnwhite" onClick={togglePortfolioEditMode}>
          Cancel
        </button>
  

        {portfolioeditloading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
        <button className="mybtn" onClick={updatePortfolio}>
        Save
      </button>
         }

      </div> }
</>): (
<div className="profileitem"><div className="proflabel">Portfolio Link<span className="material-symbols-outlined">contact_mail</span> </div><div className="profvalue">
{userprofile?.portfolioUrl || 'Null'}
  </div></div>) }




{userprofile?.portfolioUrl && userprofile?.portfoliobio && !portfolioeditmode  && (
  <>
  <div className="profileitem">
  <span className="material-symbols-outlined">
book_4_spark
</span>
    <div className="proflabel">Portfolio Summary   
</div>

  <div 
        className={`profvalue ${showFullText ? 'show-full-text' : ''}`}
  >

<div className="scrolbox">
<PlainTextRenderer content={userprofile?.portfoliobio} />
</div>

    </div>
 {showFullText ? (
        <div className="readless red" onClick={handleReadMoreClick}>Read less</div>
      ) : (
        <div className="readmore red" onClick={handleReadMoreClick}>
          Read more
        </div>
      )}
    </div>


  </>


) }

 </Titleddiv>


         <Titleddiv title={"Resume"} myfunc={togglfileemodal}>
           <div className="resumebox">
             <div className="resumeflex">
               <span className="material-symbols-outlined">description</span>
               <div className="resumedeets">
                 <div className="resumename">John Appleseed Resume</div>
                 <div className="resumebody">small PDF file, 324 kb</div>
               </div>
             </div>
 
             <div className="flexx2">
               <div className="edit" onClick={togglfileemodal}>
                 <span className="material-symbols-outlined">
                   cloud_download
                 </span>
               </div>
               <div className="edit">
                 <span className="material-symbols-outlined">delete</span>
               </div>
             </div>
           </div>
         </Titleddiv>
 
         <Titleddiv title={"Work Experience"} myfunc={togglemodal}>
           <div className="workexperienceflex">
           
           {
   workExperience.length > 0 && (
     <>   
      {workExperience.map((item, index) => (
     <Workexperiencecard key={index}  jobtitle={item.jobtitle} jobservice={item.jobservice} industry={item.jobsector} location={item?.city} lga={item?.region} startdate={item.jobstart} enddate={item.jobend} jobdescription={item.jobdescription} organization_name={item.organization_name}
     onDelete={() => deleteWorkExperience(item.id)}
     />
     ))}
     
     </>
 
   )
 }
 
           
  
         
 
           </div>
         </Titleddiv>
 
         <Titleddiv title={"Education"} myfunc={toggleEduemodal}>
           <div className="workexperienceflex">
 
           {
   selectedUniversity.length > 0 && (
     <>   
      {selectedUniversity.map((item, index) => (
        <Educationcard   key={index} uinversitydata={item} 
        onDelete={() => deleteUniversityRecord(item.id)}
        />
   
     ))}


     
     </>
 
   )
 }
 
            
           </div>
         </Titleddiv>
 

         <Titleddiv title={"Area of Expertise"} myfunc={toggleexpert}>
          {expertedit && (    <div className="miniforminput">
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
    </div> )}

           <div className="skillgrid">
             {userprofile?.aosskill?.map((expertise, index) => (
               <div key={index} className="skillcard">
                 {expertise?.label}
               </div>
             ))}
           </div>

           {expertedit && 
           <div className="mybtns">
        <button className="mybtnwhite" onClick={toggleexpert}>
          Cancel
        </button>
  

        {expertloading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
        <button className="mybtn" onClick={updateaoesperties}>
        Save
      </button>
         }

      </div> }

           <br />
         </Titleddiv>
 
         <Titleddiv title={"Board Preference"}>
           <div>
             <div className="mycheckboxgroup">
               <Checkboxgroup
                 options={boardTypeOptions}
                 groupName="Board Type"
                 onChange={handleGroupChange}
               />
             </div>
             <div className="mycheckboxgroup">
               <Checkboxgroup
                 options={remunerationOptions}
                 groupName="Remuneration"
                 onChange={handleGroupChange}
               />
             </div>
           </div>
         </Titleddiv>
 <br />
 <br />
 <br />
     

     </>
  )
}

export default Userprofile