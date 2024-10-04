'use client'
import AiLayout from '@/components/ailayout/AiLayout'
import Loader from '@/components/utils/Loader';
import Quiz from '@/components/utils/Quiz';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const page = () => {
  const [activeTab, setActiveTab] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizref, setquizref] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [ref_id, setref_id] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [chatlist, serChatlist] = useState([]);


  

  let isFetching = false; 
  const { id } = useParams();
  function setid(reference) {
    console.log(reference);
    setref_id(reference); // assuming setref_id is a state setter function
    setActiveTab(1); // assuming setActiveTab is also a state setter
  }




useEffect(() => {
  console.log(id)
  if (id) {
    const fetchchats = async () => {
      try {
        // setLoadingcards(true);
        const response = await axios.get(`https://bsjobapi.vercel.app/all-chat/${id}/`);
        serChatlist(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        // setLoadingcards(false);
      }
    };

    fetchchats();
  }
}, [id]);

useEffect(() => {
  let pollInterval;
  console.log('its working')

  if (ref_id) {
      pollInterval = setInterval(async () => {
          if (isFetching) return; // Skip if a request is already in progress

          isFetching = true; // Set to true when starting a request
          try {
              const statusResponse = await axios.get(`https://bsjobapi.vercel.app/verify-chat/${ref_id}/`);
              const { is_parsed, parsed_data: jsonResponse } = statusResponse.data;

              if (is_parsed) {
                  clearInterval(pollInterval); // Stop polling
                  setFetchedData(jsonResponse)

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
}, [ref_id]); 




  const htmlQuestions = [
    {
      topic: "HTML Semantics and Best Practices",
      question: "You are building a website and need to structure the main content, including headers, paragraphs, and sections. You also need to use a navigation bar at the top and a footer at the bottom. What is the most semantically appropriate HTML structure for your page, considering modern HTML5 standards and best practices for accessibility and SEO?",
      options: [
        "Using <div> elements for everything and applying CSS classes to style them appropriately.",
        "Using <article> for main content, <section> for sections, <nav> for navigation, <header> for the top, and <footer> for the bottom.",
        "Using <main> for the main content, <header> for the top, <footer> for the bottom, <nav> for navigation, and <section> for individual parts of the page.",
        "Using <div> for main content, <section> for sections, and <header> for navigation."
      ],
      answerIndex: 2
    },
    {
      topic: "HTML Forms and Validation",
      question: "You are implementing a form with several fields, including 'email', 'password', and 'confirm password'. You want the form to be validated before submission using HTML5 attributes only, without relying on JavaScript for validation. Which combination of attributes should you use to ensure proper validation of the email and password fields, considering edge cases like empty input and mismatching passwords?",
      options: [
        "Use the 'required' attribute for both fields, 'type=\"email\"' for the email, 'type=\"password\"' for both password fields, and 'pattern' attribute for custom password validation.",
        "Use the 'required' attribute for both fields, 'type=\"text\"' for email, and 'type=\"password\"' for password fields, along with 'pattern' for validation.",
        "Use 'type=\"email\"' for the email, 'type=\"password\"' for password fields, 'required' for both, and 'pattern' on the password fields to ensure they match.",
        "Use 'type=\"email\"' for the email, 'type=\"password\"' for password fields, 'required' for both, and add a 'minlength' attribute for the password fields."
      ],
      answerIndex: 3
    },
    {
      topic: "HTML Entities and Special Characters",
      question: "In an HTML document, you want to display the string '5 > 3 & 3 < 5', ensuring that the greater-than (>) and less-than (<) symbols are not interpreted as HTML tags. You also need to ensure that the ampersand (&) is properly displayed. What is the correct way to write this using HTML entities, while considering browser compatibility and standards?",
      options: [
        "Write it directly as '5 > 3 & 3 < 5', because modern browsers will automatically interpret it correctly.",
        "Use '&gt;' for '>', '&lt;' for '<', and '&amp;' for '&', making it '5 &gt; 3 &amp; 3 &lt; 5'.",
        "Write it as '5 < 3 > & 3 > 5' and rely on CSS to fix the display using 'content' property.",
        "Use JavaScript to dynamically encode the string, preventing the HTML parser from interpreting it as tags."
      ],
      answerIndex: 1
    },
    {
      topic: "HTML5 Multimedia and Accessibility",
      question: "You are embedding a video in your HTML5 website using the <video> tag. You want to ensure the video is accessible to all users, including those using screen readers or browsers that don't support video playback. You also want the video to have fallback content, provide subtitles, and be automatically muted when it starts. What is the most correct and accessible way to write the <video> element?",
      options: [
        "<video src='movie.mp4' controls muted>Fallback content for non-supporting browsers</video>",
        "<video controls autoplay muted><source src='movie.mp4' type='video/mp4'>Your browser does not support the video tag.</video>",
        "<video controls muted><source src='movie.mp4' type='video/mp4'> <track src='subtitles_en.vtt' kind='subtitles' srclang='en' label='English'>Fallback content for non-supporting browsers</video>",
        "<video controls><source src='movie.mp4' type='video/mp4'><track src='subtitles_en.vtt' kind='captions'>Your browser does not support the video tag.</video>"
      ],
      answerIndex: 2
    },
    {
      topic: "HTML Document Structure and Meta Tags",
      question: "You want to optimize your HTML document for search engine crawlers and improve the loading speed of your website. You also want to ensure proper display on mobile devices. Which combination of meta tags should you include in the <head> section of your document to achieve this goal, taking into account modern best practices for SEO and responsive design?",
      options: [
        "<meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='IE=edge'>",
        "<meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='robots' content='noindex'>",
        "<meta name='description' content='This is a sample webpage'><meta charset='ISO-8859-1'><meta name='viewport' content='width=device-width, initial-scale=1.0'>",
        "<meta charset='UTF-8'><meta name='viewport' content='initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'><meta name='robots' content='index, follow'>"
      ],
      answerIndex: 0
    },
    {
      topic: "HTML Inline vs Block Elements",
      question: "You are styling a webpage where some elements need to be inline (within a line of text), while others need to be block-level elements (taking up the full width of the container). Considering default HTML behaviors, which of the following elements will naturally behave as inline elements, and which will behave as block-level elements without any CSS intervention?",
      options: [
        "Inline: <span>, <a>, <em>; Block: <div>, <header>, <footer>",
        "Inline: <div>, <p>, <img>; Block: <header>, <span>, <a>",
        "Inline: <div>, <header>, <footer>; Block: <span>, <a>, <em>",
        "Inline: <p>, <h1>, <section>; Block: <em>, <span>, <a>"
      ],
      answerIndex: 0
    }
  ];
  
  const fetchQuizQuestions = async () => {
    // Reset states
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://bsjobapi.vercel.app/generate-quiz/${id}/`);
       
      // Update fetchedData with the response from API
      setref_id(response.data.ref_id);
      setActiveTab(1)
      console.log(response.data)

    } catch (err) {
      // Set error state if there’s an issue
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      // Set loading to false after request is complete
      setLoading(false);
    }
  };




  // // Fetch on component mount using useEffect
  // useEffect(() => {

  // }, []); // Empty dependency array ensures this runs only on mount


  const tabs = [
    { id: 0, label: 'Quiz' },
    { id: 1, label: 'menu' },
  ];
  const [isopen, setisopen] = useState(false);
  function testfunction(){

    setisopen(!isopen)
  }
  
  return (
    <AiLayout hidelinks nooverflow>



<div className={`sidebar sideload ${isopen ? 'sidebarshowing' : 'sideload'}`} id="sidebar" >
<div className="articlename" onClick={testfunction}>
Welcome  <span className="material-symbols-outlined" >
cancel
</span>
</div>
<div className="nchat">
    <Link href={'/ai/interviewprep'} className="sidepill">
    <span className="material-symbols-outlined">
chat_bubble
</span>  <b>New Chat </b>  
    </Link>
  </div>
<div className="articlename">
All Chats
</div>

  <div className="sidecontentdata ">
{chatlist?.length  && (
  chatlist.map((data, index) => (

    <div key={index} className="sidepill"  onClick={() => setid(data.ref_id)} >
       
      <span className="material-symbols-outlined">chat_bubble</span>
      <b >{data?.parsed_data?.[0]?.topic || 'No Topic Available'}</b>
      <span className="material-symbols-outlined">share</span>
      <span className="material-symbols-outlined">delete</span>
    </div>
  ))
)}

  </div>
</div>


{activeTab === 1 && (
  <>
{
  fetchedData && fetchedData.length > 0 && !loading ? (
    <>


      <Quiz htmlQuestions={fetchedData} goback={setActiveTab} />
    </>
  ) : (
    <div className="fullycentered">
      <Loader />
    </div>
  )
}
   
  </>

)}

<div className="herocontainer">



<>
{activeTab === 0 && (
<div className="agentwelcome">
  <div className="diamonds">
  <span class="material-symbols-outlined ">
diamond
</span>
  </div>
  <div className="bbbox agentcenter landingtitle">VeeSeats<span> AI</span> </div>


  <div className="agentquickoptions">
<div className="qact" onClick={fetchQuizQuestions}><div className="qicon"></div>I want To Prepare for an interview  <span className="material-symbols-outlined">
chevron_right
</span> </div>
<div className="qact" ><div className="qicon"></div>I want To Take A Quick Pop Quiz (coming soon)
<span className="material-symbols-outlined">
chevron_right
</span>
</div>

<div className="qact" onClick={testfunction}><div className="qicon"></div>Quiz History
<span className="material-symbols-outlined">
chevron_right
</span>
</div>
<br />
<br />
  </div>
</div>
)}
</>



</div>





{/* <div className="chatbar">
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
</div> */}

        </AiLayout>
  )
}

export default page