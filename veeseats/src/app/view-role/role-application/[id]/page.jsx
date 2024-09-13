"use client";
import React, { useContext, useEffect, useState } from "react";
import { Sheet } from 'react-modal-sheet';
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import ReadMoreArea from "@foxeian/react-read-more";
import Workexperiencecard from "@/components/Workexperiencecard";
import Checkboxgroup from "@/components/Checkboxgroup";
import Mypill from "@/components/Mypill";
import Requirementpill from "@/components/Requirementpill";
import Userprofile from "@/components/Mypages/Userprofile";
import { useParams } from 'next/navigation';
import { VeeContext } from "@/components/context/Chatcontext";
import Lazytext from "@/components/Lazyloading/Lazytext";
import { useRouter } from 'next/navigation'
const boardTypeOptions = [
  { label: "Start Up", value: "start_up" },
  { label: "Micro, Small, and Medium", value: "msme" },
];

const remunerationOptions = [
  { label: "Paid", value: "paid" },
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



const page = () => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false);
  const [Jdiscription, setJdescription] = useState([]);
  const {fetchJobdetail,   axiosInstance, applyForJob } = useContext(VeeContext);
  const [jobdetailloading, setjobdetailloading] = useState(true);
  const [jobref, setjobref] = useState('');
  const { id } = useParams();
  const handleGroupChange = (groupName, checkedItem) => {
    console.log(`${groupName}:`, checkedItems);
  };

  useEffect(() => {
    if (id) {
      setjobref(id)
      const fetchjob = async () => {
        try {
          // setLoadingcards(true);
          const response = await fetchJobdetail(id);
          console.log(response);
          setJdescription(response?.jobdetail)
          setjobdetailloading(false)
         
        } catch (error) {
          console.error("Error fetching job details:", error);
        } finally {
        }
      };
  
      fetchjob();
    }
  }, [id]);


async function roleapplication(){
  if(id){
   const appstatus =  applyForJob(id);
   if(appstatus){
    router.replace('/user-applications')
   }
  }
  applyForJob
}

  return (
    <Layout>
      <div className="dashboard gaptransiton">
        <br />
        <div className="titlediv ftop">

<div className="vrdtop">
      <div className="vrtop">
      <div className="roleheader">
      <div className="rolelogo">
        <img src={Jdiscription?.organization?.logo}  />  
           <div className="dtitle">
      <div className="job-card-title"> {Jdiscription?.jobtitle} {jobdetailloading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} </div>
      <div className="dservice">{Jdiscription?.jobcategory} {jobdetailloading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)}</div>
      <div className="rolelocal fdc">
        <div className="gap">
        {jobdetailloading ? ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>) : (<>
        
        
          <img src="/lod.png" alt="" width="10px" height="13" />
          <small>Abuja, Nigeria</small>
        </>)  }


        </div>
        <div className="rtype">{Jdiscription?.jobservice} {jobdetailloading && ( <div className='shimmer'> <Lazytext size={3}/> </div>)}  </div>
      </div>
    </div>
      </div>
 
    </div>

      </div>

    </div>

</div>
<div className="applyflex">
<div className="applyflxone">
<Userprofile/>
</div>
    <div className="applyflxtwo">
    <Titleddiv title={"Role Overview"}>
        <Requirementpill reqtitle='Years of board experience' reqvalue='3 years'  />
        <Requirementpill reqtitle='Years of board experience' reqvalue='3 years'  />
        <Requirementpill reqtitle='Years of board experience' reqvalue='3 years'  />
    </Titleddiv>
    <Titleddiv title={"Board Type"}>
    <Checkboxgroup
                options={boardTypeOptions}
                groupName=""
                onChange={handleGroupChange}
              />
    </Titleddiv>
    <Titleddiv title={"Remuneration"}>
    <Checkboxgroup
                options={remunerationOptions}
                groupName=""
                onChange={handleGroupChange}
              />
    </Titleddiv>
    <Titleddiv title={"Area of Expertise"}>

        <div className="mypills">
           <Mypill title={'Finance'} />
           <Mypill title={'Strategy'} />
           <Mypill title={'Change Manager'} />
           <Mypill title={'Marketing'} />
        </div>
    </Titleddiv>

    <div className="applyforroleflex">
    <button className='mybtnwhite' onClick={() => setOpen(true)}>Cancel</button>
   <button className='mybtn' onClick={roleapplication}>Proceed</button>
    </div>
    </div>
</div>

<br />
<br />
<br />

    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}
           snapPoints={[600, 400, 100, 0]}
           initialSnap={1}
    >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>

          <Sheet.Scroller>
            <div className="jobdescription overview-text-subheader" style={{ height: 200, padding:10 }}>
            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing

            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing

            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing

            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing
            </div>
          </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    
      </div>
    </Layout>
  );
};

export default page;
