'use client'
import React, { useEffect, useState } from 'react'
import ReadMoreArea from "@foxeian/react-read-more";
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { Mail, Phone, MapPin } from 'lucide-react'; 
import { useParams } from 'next/navigation';
import axios from 'axios';
const buttonStyle = {
    color: "#0275B1",
    width: "fit-content",
    textdecoration: "none",
    padding: 0,
  };
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



const Templateone = () => {
  
  const [userCV, setUserCV] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const saveUserCV = async () => {
      try {
        const response = await axios.get(`https://bsjobapi.vercel.app/anonuserprofile/${id}`); // Send the data to the API
        setUserCV(response.data); // Update state variable with the response data
      } catch (err) {
        setError('Error Fetching user CV'); // Handle any errors
        console.error(err);
      }
    };

    if (id) {
      // Only trigger the request if the id exists
      saveUserCV();
    }
  }, [id]);

  return (
   <>
        {userCV ? (
              <div className='tempgap'>
 
              <br />
              <div className="bbbox">
              {userCV?.userprofile?.user?.first_name + ' ' + userCV?.userprofile?.user?.last_name + ', ' + userCV?.userprofile?.favourite_category} 
              </div>
      
              <div className="growsub">
              {userprofile?.portfolioUrl || ''}
              {/* {userCV?.userprofile?.country + ', ' + userCV?.userprofile?.city + ', ' + userCV?.userprofile?.region + ', ' +  userCV?.userprofile?.phonenumber} */}
              {/* 2207 Beach Avenue, Los Angeles, rosemariesoto@email.com, (914) 479-6342 */}
              </div>
      
              <div className="contact-info story">
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span>Email: {userCV?.userprofile?.user?.email}</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span>Phone: {userCV?.userprofile?.phonenumber}</span>
            </div>
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <span>Address:  {userCV?.userprofile?.country + ', ' + userCV?.userprofile?.city + + userCV?.userprofile?.region}</span>
            </div>
          </div>
      
              <div className="socialmedia">
              <div className="social" >   <Twitter /> </div>
              <div className="social" >      <Linkedin  /> </div>
              <div className="social" >   <Instagram /> </div>
            </div>
              <div className="demar">
                  
              </div>
        
              <div className="resumeflexs">
                  <div className="rflxone">
                      <div className="bbbox">
                          Profile
                      </div>
                  </div>
      
                  <div className="rflxtwo">
                      <div className="story">
      
                      <ReadMoreArea
                   style={{ display: "block", flexDirection: "column" }} // inline styles of main div
                   expandLabel="See more" // Expand Label
                   collapseLabel="See less" // Collapse Label
                   buttonStyle={buttonStyle} // inline styles of button
                   lettersLimit={850} // limit of letters (100 letters)
                 >
      {userCV?.userprofile?.bio}
      </ReadMoreArea>
      
                    
                      </div>
                  </div>
              </div>
      
              <div className="demar">
                  
              </div>
              <div className="rflxones">
                      <div className="bbbox">
                          Education
                      </div>
                  </div>
      
                  {userCV.edu && userCV.edu.length > 0 ? (
          userCV.edu.map((eduItem) => (
            <div className="resumeflexs" key={eduItem.id}>
              <div className="rflxone">
                <div className="lighttitle">
                  {new Date(eduItem.start_date).toLocaleString('en-US', { month: 'short', year: 'numeric' })} — {new Date(eduItem.finish_date).toLocaleString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
      
              <div className="rflxtwo">
                <div className="story">
                  <div className="schoolflx">
                    <div className="schname">
                      {eduItem.university.institution}
                    </div>
                    <div className="schoolcourse">
                      {eduItem.degree} in {eduItem.course}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No educational history</div>
        )}
      
      
      
              <div className="demar">
                  
              </div>
              <div className="rflxones">
                      <div className="bbbox">
                      Employment
                      </div>
                  </div>
                  {userCV.workexp && userCV.workexp.length > 0 ? (
          userCV.workexp.map((workItem) => (
            <div className="resumeflexs" key={workItem.id}>
              <div className="rflxone">
                <div className="lighttitle">
                  {new Date(workItem.jobstart).toLocaleString('en-US', { month: 'short', year: 'numeric' })} — {new Date(workItem.jobend).toLocaleString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
      
              <div className="rflxtwo">
                <div className="story">
                  <div className="schname">
                    {workItem.jobtitle} at {workItem.organization_name}
                  </div>
                  <ReadMoreArea
                    style={{ display: "block", flexDirection: "column" }} // inline styles of main div
                    expandLabel="See more" // Expand Label
                    collapseLabel="See less" // Collapse Label
                    buttonStyle={buttonStyle} // inline styles of button
                    lettersLimit={850} // limit of letters
                  >
                    {workItem.jobdescription}
                  </ReadMoreArea>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No employment history</div>
        )}
      
              <div className="demar">
                  
              </div>
        
              <div className="resumeflexs">
                  <div className="rflxone">
                  <div className="bbbox">
                    Skills
                      </div>
                  </div>
      
                  <div className="rflxtwo">
                      <div className="story">
      
                      {/* <div className="skillgrid">
                   {areasOfExpertise.map((expertise, index) => (
                     <div key={index} className="skillcard">
                       {expertise}
                     </div>
                   ))}
                 </div> */}

                 <div className="skillgrid">
             {userCV.userprofile?.aosskill?.map((expertise, index) => (
               <div key={index} className="skillcard">
                 {expertise?.label}
               </div>
             ))}
           </div>
                    
                      </div>
                  </div>
              </div>
          </div>
        ): ('lOADING')}

   </>

  )
}

export default Templateone