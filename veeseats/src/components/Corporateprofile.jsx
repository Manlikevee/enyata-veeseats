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
  


const Corporateprofile = () => {


    const {generateJobDescriptionOverview,  axiosInstance, workExperience, setWorkExperience, Universities, selectedUniversity, userprofile, deleteUniversityRecord,
        deleteWorkExperience } = useContext(VeeContext);
      const [checkedItems, setCheckedItems] = useState([]);
      const [profiledata, setprofiledata] = useState(null);
      const [isLoading, setIsloading] = useState(false);
      const [edupopup, setEdupopup] = useState(false);
      const [bioedit, setBioedit] = useState(false);
      const [personaledit, setpersonaledit] = useState(false);
      const [fileuploadpopup, setfileuploadpopup] = useState(false);
      
      function togglfileemodal(){
        setfileuploadpopup(!fileuploadpopup);
      
      }
    
    
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
   {/* <div className="globea">
     <div className="worl">
  <img src={userprofile?.avatar || "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}  alt="" />
     </div>
   </div> */}
   <div className="globebody">
     <div className="globetopflex">
 

       <div className="jtitle cpflex">
       <div className="worl">
  <img src={userprofile?.avatar || "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}  alt="" />
     </div>
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
 </span>Industry</div>
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
      
 


 
         <Titleddiv title={"Area of Expertise"}>
           <div className="skillgrid">
             {areasOfExpertise.map((expertise, index) => (
               <div key={index} className="skillcard">
                 {expertise}
               </div>
             ))}
           </div>
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

export default Corporateprofile