'use client'
import LazyJobcard from '@/components/Lazyloading/LazyJobcard';
import Rolecard from '@/components/Rolecard';
import Layout from '@/components/dashboard/Layout'
import Rolefilter from '@/components/dashboard/Rolefilter'
import React, { useEffect, useRef , useState, useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import Titleddiv from '../Titleddiv';


const filterJobs = (jobs, searchTerm) => {
  if (!searchTerm) return jobs; // Return all jobs if there's no search term

  const lowercasedTerm = searchTerm.toLowerCase();

  // Filter jobs based on the job title or job description
  const filteredJobs = jobs.filter(
    (job) =>
      job.jobtitle.toLowerCase().includes(lowercasedTerm) ||
      job.jobdescription.toLowerCase().includes(lowercasedTerm)
  );

  // Ensure distinct results by using a Set to filter out duplicates
  const distinctJobs = Array.from(
    new Set(filteredJobs.map((job) => JSON.stringify(job)))
  ).map((job) => JSON.parse(job));

  return distinctJobs;
};



const FindARole = () => {
    const { test, allJobs, loadingcards, joberror, setJoberror, savejob, individualsdata } = useContext(VeeContext);
    const [displayedJobs, setDisplayedJobs] = useState([]);
    const [searchtitle, setSearchtitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const observer = useRef();
    const hasMoreJobs = useRef(true);
  
    const filteredJobs = filterJobs(allJobs, searchtitle);

  return (
    <Layout>

<div className="dashboard">
 <p></p>
<h4>Job Roles</h4>

<Rolefilter searchtitle={searchtitle} setSearchtitle={setSearchtitle} />



{!joberror && (
  <div className="rolegrid">
   {loading &&  <><LazyJobcard />  <LazyJobcard />  <LazyJobcard /></> }
{filteredJobs?.length > 0 && (
<>
{filteredJobs.map((job, index) => (
     (!joberror && (<Rolecard job={job} key={index}  savejob={savejob} individualsdata={individualsdata}/>))  
     ))}
</>
)}

  
     {loadingcards &&  <><LazyJobcard />  <LazyJobcard />  <LazyJobcard /></>}
     {/* { !loading && hasMoreJobs.current && <div ref={lastJobElementRef}></div>} */}



   
</div>
)}


{joberror && (
    <Titleddiv notitle>
<br />
<br />

<div className="errorbox">
  <img src="/iconserror.svg" alt="" />
  <div className="errortitle">Oops! Something Went Wrong</div>
  <div className="errorbody">It looks like there's a network issue preventing us from loading the content you requested.</div>
  <button>Refresh</button>
</div>
<br />
<br />

</Titleddiv >)}


    </div>
    </Layout>
  )
}

export default FindARole