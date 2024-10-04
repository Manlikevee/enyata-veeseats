"use client";

import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Create the context
export const VeeContext = createContext();



// myevents,loadingevents

export const VeeContextProvider = ({ children }) => {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [hideLoader, setHideLoader] = useState(false);
    const router = useRouter();
    const [test, setTest] = useState('');
    const [myevents, setMyevents] = useState([]); 
  const [loadingevents, setLoadingevents] = useState(true); 
    const [joberror, setJoberror] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [allSavedJobs, setAllSavedJobs] = useState([]);
    const [companyJobs, setcompanyJobs] = useState([]);
    const [individualsdata, setindividualsdata] = useState([]);    
    const [loadingcards, setLoadingcards] = useState(true);
    const [loadingsaves, setLoadingsaves] = useState(true);
    const [loadingapplications, setLoadingapplications] = useState(true);
    const [applications, setapplications] = useState([]);
    const [CompanyLoadingcards, setCompanyLoadingcards] = useState(true);
    const [userprofile, setUserprofile]  = useState(true);
    const [workExperience, setWorkExperience] = useState([]);
    const [Universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState([]);
    const [jobupdate, setJobupdate] = useState([]);
    const [Loadingjobupdate, setLoadingjobupdate] = useState(true);
    const [LoadingApplication_detail, setLoadingApplication_detail] = useState(true);
    const [roleMatch, setRoleMatch] = useState([]);
    const [roleMatchLoading, setRoleMatchLoading] = useState(false);
    const [roleMatchError, setRoleMatchError] = useState(null);
    const [openroles, setopenroles] = useState(null);
    const [published, setpublished]  = useState(null);
    const [filled, setfilled]  = useState(null);
    const [profileloaded, setprofileloaded] = useState(false);
    const [blogs, setBlogs] = useState([]); // Blog posts state
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [activechat, setActivechat] = useState('');
    const [allprofiles, setAllprofile] = useState([]);
    const [activeprofile, setActiveprofile] = useState([]);
    const [gottendata, setgottendata] = useState([])
    const [chatdata, setChatdata] = useState([]);
    const [activeuserid, setactiveuserid] = useState('');
    const [conversationdata, setconversationdata] = useState([]);
    const [allChat, setAllchat] = useState([]);
    const [activechatdata, setActivechatdata] = useState([]);
    const [training, setTraining] = useState([]);
    const [loadingtraining, setloadingTraining] = useState(false);
    const [sideloading, setsideloading] = useState(true)
    const [visitationdata, setVisitationdata] = useState([]);
    const [loadingaccept, setloadingaccept] = useState(false)
    const [isvisitorbaropen, setisVistorbaropen] = useState(false);
    const [visitors, setVisitors] = useState([]);
    const [myqrcode, setQrcode] = useState([]);
    const [awaiting, setAwaiting] = useState([]);
    const [pendingApproval, setPendingApproval] = useState([]);
    const [reshedule, setReshedule] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [plans, setPlans] = useState([]);
    const [visitordataloaded, setVisitordataloaded] = useState(false);
    // Function to fetch all blog posts
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [expertloading, setexpertloading] = useState(false);
    const [expertedit, setexpertedit] = useState(false);
    const [portfolioUrl, setPortfolioUrl] = useState(''); // State to hold the portfolio URL
    const [portfolioeditloading, setPortfolioEditLoading] = useState(false); // Loading state for portfolio edit
    const [portfolioeditmode, setPortfolioEditMode] = useState(false); // Edit mode toggle for portfolio

    // Function to toggle edit mode

    const fetchBlogPosts = async () => {
      setLoading(true);  // Set loading to true when request starts
      setError(null);    // Clear any previous errors
  
      try {
        const response = await axios.get('https://bsjobapi.vercel.app/blogposts/');
        setBlogs(response.data);  // Save the blog posts in the state
      } catch (err) {
        setError('Failed to fetch blog posts. Please try again.');
        console.error('Error fetching blog posts:', err);
        toast.error('An error occurred while fetching blog posts.');
      } finally {
        setLoading(false);  // Set loading to false when request completes
      }
    };
  
    // Fetch blog posts when component mounts
    // useEffect(() => {
    //   fetchBlogPosts();
    // }, []);
  


    const fetchRoleMatch = async () => {
      setRoleMatchLoading(true);
      setRoleMatchError(null);
  
      try {
        const response = await axiosInstance.get('/rolematch');
        setRoleMatch(response.data); // Update with the correct data structure
      } catch (err) {
        setRoleMatchError('Failed to fetch data. Please try again later.');
      } finally {
        setRoleMatchLoading(false);
      }
    };


    const fetchTrainingPosts = async () => {
      setloadingTraining(true);  // Set loading to true before fetching data
      try {
          const response = await axios.get('https://bsjobapi.vercel.app/create_training_post/');
          setTraining(response.data);  // Update state with fetched data
      } catch (error) {
          console.error("Error fetching training posts:", error);
      } finally {
          setloadingTraining(false);  // Set loading to false after data is fetched or an error occurs
      }
  };


    const fetchJobs = async () => {
      const access = Cookies.get("access_token");
      if (access) {
      try {
        setLoadingcards(true);
        const response = await axios.get('https://bsjobapi.vercel.app/alljobcards');
        setAllJobs(response.data.jobdetail);

      } catch (error) {
        setJoberror(true)
        console.error("Error fetching job cards:", error);
      } finally {
        setLoadingcards(false);
      }
    }
    };

    const fetchsavedJobs = async () => {
      const access = Cookies.get("access_token");
      if (access) {
      try {
        setLoadingsaves(true);
        const response = await axiosInstance.get('/usersaves');
        setAllSavedJobs(response.data.jobcards);

      } catch (error) {
        setJoberror(true)
        console.error("Error fetching job cards:", error);
      } finally {
        setLoadingsaves(false);
      }
    }
    };


    const fetchjobupdate = async () => {
      const accessToken = Cookies.get("access_token");
      const decodedToken = jwtDecode(accessToken);
      if (accessToken && decodedToken.is_corporate ) {
      try {
        setLoadingjobupdate(true);
        const response = await axiosInstance.get('/corporatedashboard');
        setJobupdate(response.data?.jobcarddata);
        setpublished(response.data?.published)
        setopenroles(response.data?.open)
        setfilled(response.data?.filled)
        
      } catch (error) {
        setLoadingjobupdate(true)
        console.error("Error fetching job cards:", error);
      } finally {
        setLoadingjobupdate(false);
      }
    }
    };
  const fetchuserApplications = async () => {
      const access = Cookies.get("access_token");
      if (access) {
      try {
        setLoadingapplications(true);
        const response = await axiosInstance.get('/userapplications');
        setapplications(response.data);

      } catch (error) {
     
        console.error("Error fetching job cards:", error);
      } finally {
        setLoadingapplications(false);
      }
    }
    };
    

    async function refreshAccessToken() {
        try {
          const refreshToken = Cookies.get("refresh_token");
          if (!refreshToken) {
            throw new Error("Refresh token not found");
          }
          const response = await axios.post(
            "https://bsjobapi.vercel.app/api/token/refresh/",
            { refresh: refreshToken }
          );
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;
          // Cookies.set('access_token', newAccessToken); // Save new access token
          // Cookies.set('refresh_token', newRefreshToken); // Save new refresh token
          Cookies.set("access_token", response.data.access, { expires: 14 });
          Cookies.set("refresh_token", response.data.refresh, { expires: 14 });
          console.log("token refreshed");
          return newAccessToken; // Return the new access token
        } catch (error) {
          throw new Error("Failed to refresh access token");
        }
      };
    
    const axiosInstance = axios.create({
        baseURL: "https://bsjobapi.vercel.app/", // Update base URL
        headers: {
          "Content-Type": "application/json",
          'Content-Type': 'multipart/form-data',
        },
      });
      // Request interceptor
      axiosInstance.interceptors.request.use(
        async (config) => {
          const access = Cookies.get("access_token");
          if (access) {
            const arrayToken = access.split(".");
            const tokenPayload = JSON.parse(atob(arrayToken[1]));
            const isExpired =
              Math.floor(new Date().getTime() / 1000) >= tokenPayload.exp;
            if (isExpired) {
              try {
                const newAccessToken = await refreshAccessToken();
                config.headers.Authorization = `Bearer ${newAccessToken}`;
                return config;
              } catch (error) {
                console.error("Failed to refresh access token:", error);
                //   VanillaToasts.create({
                //     title: 'Error!',
                //     text:  'Session Expired' ,
                //     type: 'error',
                //     timeout: 5000
                // });
    
                setTimeout(function () {
                  // Redirect to success.html with the random ID as a parameter
                  // window.location.href = `login.html`;
                  router.replace("/auth/login");
                }, 2000); // 2000 milliseconds = 2 seconds
                return Promise.reject(new Error("Failed to refresh access token"));
              }
            } else {
              config.headers.Authorization = `Bearer ${access}`;
            }
          } else {
            // Access token not found, handle redirect to login or show error message
            console.log("Access token not found");
            // Example: Redirect to login page
            // window.location.href = '/login';
            //   VanillaToasts.create({
            //     title: 'Error!',
            //     text:  'Session Expired' ,
            //     type: 'error',
            //     timeout: 5000
            // });
            console.log("session expired");
    
            // setTimeout(function () {
            //   // Redirect to success.html with the random ID as a parameter
            //   router.replace("/auth/login");
            // }, 2000); // 2000 milliseconds = 2 seconds
            return Promise.reject(new Error("Access token not found"));
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      // Response interceptor
      axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          // Handle errors
          return Promise.reject(error);
        }
      );

    

      const fetchJobdetail = async (id) => {
        try {
          setLoadingcards(true);
          const response = await axios.get(`https://bsjobapi.vercel.app/roledetail/${id}`);
          return response.data
        } catch (error) {
          console.error("Error fetching job cards:", error);
        } finally {
          setLoadingcards(false);
        }
      };
     

      const fetchApplication_detail = async (id) => {
        let accessToken = Cookies.get("access_token");
        const decodedToken = jwtDecode(accessToken);
        if (accessToken && decodedToken.is_corporate ) {
        try {
          setLoadingApplication_detail(true);
          const response = await axiosInstance.get(`/applicationpreview/${id}`);
          console.log(response.data)
          return response.data
        } catch (error) {
          toast.info('An Error Occured')
          console.error("Error fetching job cards:", error);
        } finally {
          setLoadingApplication_detail(false);
        }
      }
      };

     async function userdata() {
        const access = Cookies.get("access_token");
        if (access) {
          try {
            const mydata = jwtDecode(access);
            setindividualsdata(mydata)
            console.log(mydata);
            return mydata;
          } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
          }
        } else {
          return null;
        }
      }

async function myuserdata() {
    const access = Cookies.get("access_token");
    if (access) {
      try {
        const mydata = jwtDecode(access);
        return mydata;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    } else {
      return null;
    }
  }

      const fetchcompanyJobs = async () => {
        let accessToken = Cookies.get("access_token");
        const decodedToken = jwtDecode(accessToken);
        if (accessToken && decodedToken.is_corporate ) {
        console.log('corporateeeeeeeeeeee')
            try {
              setCompanyLoadingcards(true);
              const response = await axiosInstance.get('/organizationsposts/');
              setcompanyJobs(response.data.jobdetail);
      
            } catch (error) {
              console.error("Error fetching job cards:", error);
            } finally {
              setCompanyLoadingcards(false);
            }
         

      }
      };


      const fetchprofile = async () => {
        let accessToken = Cookies.get("access_token");
        if (accessToken) {
        try {
          const response = await axiosInstance.get('/bs-profile/');
          setUserprofile(response.data);
          setprofileloaded(true);
          console.log('user profile', response.data)
          // Cookies.set("userdata_token", response.data.token, { expires: 14 });
  
        } catch (error) {
          console.error("Error fetching job cards:", error);
        } finally {
          // setCompanyLoadingcards(false);
        }
      }
      };

function toggleexpert(){
    setexpertedit(!expertedit)
}
const updateaoesperties = async () => {
  const payload = {
      aosskill: selectedSkills, // Make sure this is in the correct format
  };

  console.log(payload);

  if (selectedSkills && selectedSkills.length > 0) {
      setexpertloading(true);
      try {
          const response = await axiosInstance.patch('/update-aosskill/', payload, {
              headers: {
                  'Content-Type': 'application/json', // Explicitly set Content-Type to application/json
              },
          });
          toast.success('Area Of Expertise Updated Successfully!');
          setUserprofile(response.data);
          toggleexpert();
      } catch (error) {
          toast.error(
              error.response 
                  ? error.response.data.message || 'Error updating Area Of Expertise' 
                  : 'Failed to connect to server'
          );
          console.error(error);
      } finally {
          setexpertloading(false); // Ensure loading state is reset
      }
  } else {
      toast.error('Please fill all fields');
      setexpertloading(false);
  }
};

      const fetchWorkExperience = async () => {
        let accessToken = Cookies.get("access_token");
        if (accessToken) {
        try {
            const response = await axiosInstance.get('/create_work_experience');
            setWorkExperience(response.data); // Store the data in the state variable
            console.log('Work Experience Data:', response.data);
        } catch (error) {
            console.error("Error fetching work experience:", error);
            toast.error('Failed to fetch work experience data');
        }
      }
      };

    const fetchUniversities = async () => {
      let accessToken = Cookies.get("access_token");
      if (accessToken) {
      try {
          const response = await axiosInstance.get('/universities/');
          setUniversities(response.data); // Store the data in the state variable
          console.log('Universities Data:', response.data);
      } catch (error) {
          console.error("Error fetching Universities data:", error);
          toast.error('Failed to fetch Universities data');
      }
    }
  };
  
  const fetchUniversitiesdata = async () => {
    let accessToken = Cookies.get("access_token");
    if (accessToken) {
    try {
        const response = await axiosInstance.get('/university_view/');
        setSelectedUniversity(response.data); // Store the data in the state variable
        console.log('Universities Data:', response.data);
    } catch (error) {
        console.error("Error fetching Universities data:", error);
        toast.error('Failed to fetch Universities data');
    }
  }
};
      
const applyForJob = async (jobRefId) => {
  try {
    const response = await axiosInstance.get(`applications/${jobRefId}/`);

    // Handle successful response with toast
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    // Handle errors and show toast notifications
    if (error.response) {
      toast.error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      toast.error("No response received from the server. Please try again.");
    } else {
      toast.error(`Error: ${error.message}`);
    }

    // Optionally, throw the error to handle it elsewhere
    throw error;
  }
};

const savejob = async (id) => {
  let accessToken = Cookies.get("access_token");
  console.log('is clicked')
  const payload = {
    post_id: id, // Replace with the actual university ID
};
  if (accessToken && id) {

      try {
        const response = await axiosInstance.post('/like_post/' , payload);
        if (response?.data?.jobcards){
          setAllJobs(response.data.jobcards);
        }
       
        toast.info(response.data.message)
      } catch (error) {
        console.error("Error fetching job cards:", error);
        toast.success('Error fetching job cards:')
      } finally {

      }
   

}
};

      const API_KEY = 'AIzaSyCmTIrEffXp5jBva5PKKfeCha3xs1Eba-8'; // Replace with your actual API key

      // Function to optimize business description using AI
      const optimizeBusinessDescription = async ( jobTitle, jobLevel, jobindustry) => {
        const prompt = `Generate a detailed job description for a ${jobTitle} at the ${jobLevel} in the ${jobindustry} industry, including:very detailed role overview, key responsibilities, qualifications, skills, just go straight to the point dont add any exta greeting text, i want only the detailed job description.`;
    
        try {
            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            const generatedText = res.data.candidates[0].content.parts[0].text;
            return generatedText;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const generateJobDescriptionOverview = async (organization_Name, jobTitle, jobService, jobSector) => {
      const prompt = `Generate a personalized and detailed job description overview for a ${jobTitle} at ${organization_Name} for my CV. The overview should be specific to my role and responsibilities within the ${jobService} service in the ${jobSector} industry. Focus on a precise and concise summary of the tasks typically associated with this job title. For example, a Frontend Developer might have a description like: 'Developed and maintained modern websites, optimized SEO strategies, and managed existing web infrastructure.' Similarly, a banker could have: 'Managed front desk operations, handled new and existing bank accounts, and resolved customer complaints.' Avoid extra greetings or fluff; simply describe the role`;
  
      try {
          const res = await axios.post(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
              {
                  contents: [
                      {
                          parts: [
                              {
                                  text: prompt,
                              },
                          ],
                      },
                  ],
              },
              {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
          );
  
          const generatedText = res.data.candidates[0].content.parts[0].text;
          return generatedText;
      } catch (error) {
          console.error('Error:', error);
          return null;
      }
  };


  const generateblogpost = async ({blogtitle}) => {
    const prompt = `Write an incredibly captivating and highly detailed blog post with the title "${blogtitle}". The article should have several paragraphs, with each paragraph being long and filled with engaging, informative content. Include a detailed explanation of key points, providing extensive insights and examples to keep the reader fully engaged. Ensure the total word count is at least 1000 words, delivering a comprehensive and compelling article that holds the reader's attention from start to finish. Avoid unnecessary greetings or fluff—focus purely on high-quality, insightful content.`;


    try {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const generatedText = res.data.candidates[0].content.parts[0].text;
        return generatedText;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};


const generatetrainingpost = async ({ trainingtitle }) => {
  console.log(trainingtitle)
  const prompt = `Write an incredibly captivating and highly detailed training/seminar post with the title "${trainingtitle}". The post should include the following in JSON format:
  {
    "title": "string",
    "body": "A detailed and descriptive body that introduces the training/seminar, highlights the key aspects, and explains the overall purpose of the seminar.",
    "category": "string",
    "modulesContent": [
      {
        "moduleTitle": "string",
        "moduleBody": "A comprehensive and detailed description of the module, including the key points, objectives, and what participants will learn."
      },
      {
        "moduleTitle": "string",
        "moduleBody": "A comprehensive and detailed description of the module, including the key points, objectives, and what participants will learn."
      },
      {
        "moduleTitle": "string",
        "moduleBody": "A comprehensive and detailed description of the module, including the key points, objectives, and what participants will learn."
      },
      {
        "moduleTitle": "string",
        "moduleBody": "A comprehensive and detailed description of the module, including the key points, objectives, and what participants will learn."
      }
    ]
  }
  Ensure that the body and each module description are elaborate, with enough details to give the reader a clear understanding of the value and purpose of the seminar.`;
if(trainingtitle) {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let generatedText = res.data.candidates[0].content.parts[0].text;
    // const generatedText = res.data.candidates[0].content.parts[0].text;
    // const parsedResponse = JSON.parse(generatedText); // Parse the response to map it to state variables
    generatedText = generatedText.replace(/```json|```/g, '').trim();

    const parsedResponse = JSON.parse(generatedText);


    return parsedResponse;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}else{
  toast.info('No Title Supplied')
}

};




const deleteUniversityRecord = async (universityId) => {
  try {
    const response = await axiosInstance.delete(`/delete-university-record/${universityId}/`);
    console.log(response.data.message); // Handle success message
    toast.success(response.data.message || 'successfully deleted')
    fetchUniversitiesdata()
  } catch (error) {
    console.error(error.response.data); // Handle error (e.g., permission denied)
  }
};




const deleteWorkExperience = async (experienceId) => {
  try {
    const response = await axiosInstance.delete(`/delete-work-experience/${experienceId}/`);
    console.log(response.data.message); // Handle success message
    toast.success(response.data.message || 'successfully deleted')
    fetchWorkExperience();
  } catch (error) {
    console.error(error.response.data); // Handle error (e.g., permission denied)
  }
};



function refetchdata(){
  userdata()
  fetchUniversities()
  let accessToken = Cookies.get("access_token");
  if (accessToken) {



  fetchprofile(),
  fetchJobs(),
  fetchWorkExperience(),
  fetchUniversitiesdata(),
  fetchsavedJobs(),
  fetchuserApplications(),
  fetchjobupdate(),
  fetchcompanyJobs(),
  fetchRoleMatch();
  }
}




function newupdateactiveuser(id){

  console.log('clickedddddddd')

      setActivechat(id);

    


      updateActiveUser(id);
    }


    function updateActiveUser(id) {
      
      
      let active = id;
      console.log('active is ', active);
      console.log('all chat is',  chatdata);
      console.log(allChat)
      if (!allChat.some(profile => profile.to_id == active || profile.from_id == active)) {
      console.log('waitttt')
      } else{
        const myactiveProfile = allChat.find(profile => profile.to_id == active || profile.from_id == active);


     const activeuser = chatdata.find(profile => String(profile.userid) === String(active));
       
        setActiveprofile(myactiveProfile)
        console.log('active user is', activeuser);
        setActivechatdata(activeuser)
        setconversationdata(myactiveProfile.conversationDatas);
        console.log('convo data is', conversationdata);
        const filteredArray = conversationdata?.filter(obj => obj?.imageUrl && obj.type !== "deleted");
      }


  

  }


function fdata() {
  axiosInstance.get('/chatdashboard') // Update endpoint for protected route
    .then(response => {
      console.log(response)
      continuation(response)
      setgottendata(response.data.usecase)
      console.log('fetchedddddddddddddddddddd')
    })
    .catch(error => {
      console.error(error.message);

    });
}

function formatChatDateTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    // Today: Show only time
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } else if (diffInDays === 1) {
    // Yesterday: Show 'Yesterday'
    return 'Yesterday';
  } else {
    // Other days: Show date in the format 'MM-DD-YYYY'
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
}
function getlasttime(id){
  const now = new Date();
  const mygdata = gottendata.find(gd => gd?.messageid?.messageid == id )
  
  if( mygdata  ){

    if(mygdata?.testj?.length > 0){

      return formatChatDateTime(mygdata?.testj?.pop()?.messagetime);

    }else{
     
     return formatChatDateTime(now);
    }
    
  } 
  else{
    return formatChatDateTime(now);
  }

}


function continuation(response){
  console.log('continue', response)
  const access = Cookies.get("access_token");
  const arrayToken = access.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  console.log(tokenPayload)
  setactiveuserid(tokenPayload?.user_id)
  let data = response?.data?.usecase
  let allusers = response?.data?.allprofile
  let newArray = [];
  let allusersarray = []

  if (data?.length > 0) {
    data.forEach(item => {
      const isSender = item?.sender?.id === tokenPayload?.user_id;
      const isReceiver = item?.reciever?.id === tokenPayload?.user_id;
  
      const user = isSender ? item.reciever : item.sender;
      const profile = isSender ? item.receiver_profile : item.sender_profile;
  
      newArray.push({
        id: isSender ? item.reciever.id : item.sender.id,
        userid: item.id,
        message_id: item.messageid,
        name: `${user.first_name} ${user.last_name}`,
        time: getlasttime(item.messageid),
        lastSeen: profile?.last_seen,
        phoneNumber: profile.phonenumber,
        email: user.email,
        avatar: profile?.avatar,
      });
    });
    
  }

    if (allusers.length > 0) {
      allusers.forEach(item => {  
       
        allusersarray.push({
          id: item?.user?.id,
          name: `${item?.user?.first_name} ${item?.user?.last_name}`,
          avatar: item?.avatar,
          userid: item?.user?.id,
          email: item?.user?.email,
          lastSeen: item?.last_seen,
          phoneNumber: item?.phonenumber,
        });

    })
  }


  setAllprofile(allusersarray)

  setChatdata(newArray)
  console.log('chatdata', newArray)

  fdatatwo(newArray)
}

let temporarydata 
function aud (id) {
  
  // console.log('temp', temporarydata.find(au => au.userid == id || au.id == id))
  return  temporarydata.find(au => au.userid == id || au.id == id)
  }

async function fdatatwo(data) {
  let allfetchmessage = []
  const access = Cookies.get("access_token");
  const arrayToken = access.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));

  temporarydata= data

  try {
    const response = await axiosInstance.get('/messagedashboard');
    console.log(response);
 
    // Redirect to success.html with the random ID as a parameter

    response?.data?.allmessages.forEach(item => {  

      if (item?.messageid?.sender?.id === tokenPayload?.user_id) {
      allfetchmessage.push({
        'chat_id': item?.messageid?.messageid,
         from_id: tokenPayload?.user_id, 
         to_id: aud(item?.messageid?.reciever?.id)?.userid,
          conversationDatas: item.testj
      });

    }
    else if (item?.messageid?.reciever?.id === tokenPayload?.user_id) {
      allfetchmessage.push({
        'chat_id': item?.messageid?.messageid,
         from_id: aud(item?.messageid?.sender?.id,)?.userid, 
         to_id:  tokenPayload?.user_id ,
          conversationDatas: item.testj
      });


    }

  
    })
    setAllchat(allfetchmessage) 
    // sortmessages(response?.data?.allmessages)
    


  } catch (error) {
    console.error(error.message);
    toast.error(error.message || 'An Error Occurred')
  }

}

async function acceptvisitor(ref){
  if (ref){
    if (ref !== 'close') {
      setloadingaccept(true)
         try {
           const payload = {
             post_id: ref,
           };
     
           // Define endpoint
           const endpoint = '/acceptvisitor';
           
           // Make the POST request
           const response = await axiosInstance.post(endpoint, payload);
     
           if (response.status == 200) {
             console.log('response', response);
      
             toast.success('Visitation details updated successfully');
             setVisitationdata(response.data?.visitorsdata);
             setVisitors(response.data?.visitorserializer);
            //  clearSearchParams();
           }
           setloadingaccept(false);
           togglevisitorbar('close');
         } catch (error) {
           if (error.response) {
             // Server responded with a status other than 200 range
             toast.error(error?.response?.data?.message);
             toast.error('An Error Occured')
             console.log(error)
           } else if (error.request) {
             // Request was made but no response received
             toast.error('No response received from the server.');
           } else {
             // Something else happened in setting up the request
             toast.error(error.message || 'No response received from the server.');
           }
         } finally {
      
           setloadingaccept(false);
         }
       }
  }
  
    };


const togglevisitorbar = async (ref) => {
  setisVistorbaropen((prevState) => !prevState);
  
  if (ref !== 'close') {
    setsideloading(true);
setVisitationdata([])
    try {
      const payload = {
        post_id: ref,
      };


      
      // Define endpoint
      const endpoint = 'https://bsjobapi.vercel.app/getvisitordetails';
      
      // Make the POST request
      const response = await axios.post(endpoint, payload);

      if (response.status === 200) {
        console.log('response', response);
        setVisitationdata(response.data?.visitorsdata);
        toast.success('Visitation details fetched successfully');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        toast.error(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        toast.error('No response received from the server.');
      } else {
        // Something else happened in setting up the request
        toast.error(error.message || 'No response received from the server.');
      }
    } finally {
      setsideloading(false);
    }
  }
};

async function signout(ref){
  if (ref){
    if (ref !== 'close') {
      setloadingaccept(true)
         try {
           const payload = {
             post_id: ref,
           };
     
           // Define endpoint
           const endpoint = '/logoutvisitor';
           
           // Make the POST request
           const response = await axiosInstance.post(endpoint, payload);
     
           if (response.status === 200) {
             console.log('response', response);
      
             toast.success('Visitor LoggedOut Successfully');
             setVisitationdata(response.data?.visitorsdata);
             fetchvisitors();
           }
           setloadingaccept(false);
           togglevisitorbar('close');
         } catch (error) {
           if (error.response) {
             // Server responded with a status other than 200 range
             toast.error(error.response.data.error);
           } else if (error.request) {
             // Request was made but no response received
             toast.error('No response received from the server.');
           } else {
             // Something else happened in setting up the request
             toast.error(error.message || 'No response received from the server.');
           }
         } finally {
      
           setloadingaccept(false);
         }
       }
  }
  
};

const fetchvisitors = () => {
  const accessToken = Cookies.get("access_token");
  const decodedToken = jwtDecode(accessToken);
  if (accessToken && decodedToken.is_corporate ) {
    axiosInstance
      .get("/visitor")
      .then((response) => {
        // Check if response is successful
        if (response.data) {
          setVisitors(response.data);
          console.log(response.data)
          const myvisitors = response.data
          setVisitordataloaded(true);
          if(myvisitors){
            const pendingVisitors = myvisitors.filter(
              (visitor) => visitor.status == "pending_approval"
            );
            const resheduleVisitors = myvisitors.filter(
              (visitor) => visitor.status === "reshedule"
            );
            const inProgressVisitors = myvisitors.filter(
              (visitor) => visitor.status === "inprogress"
            );
            const awaitingvisitors = myvisitors.filter(
              (visitor) => visitor.status === "awaiting_confirmation"
            );
        
            setPendingApproval(pendingVisitors);
            setReshedule(resheduleVisitors);
            setInProgress(inProgressVisitors);
            setAwaiting(awaitingvisitors);
            setVisitordataloaded(true);
          }

          // console.log('veezitors', response.data);
        } else {
          toast.error(`Anssssssss Error Occured`);
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        // Handle request error

        toast.error(`An Error Occured`);
        // You can handle errors or display them as needed
      });
  }
};


const fetchevents = () => {
  const accessToken = Cookies.get("access_token");
  const decodedToken = jwtDecode(accessToken);
  if (accessToken && decodedToken.is_corporate ) {
    axiosInstance
      .get("/mycourses")
      .then((response) => {
        // Check if response is successful
        if (response.data) {
          setMyevents(response.data);
          setLoadingevents(false)
          console.log(response.data)


          // console.log('veezitors', response.data);
        } else {
          toast.error(`Anssssssss Error Occured`);
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        // Handle request error

        toast.error(`An Error Occured`);
        // You can handle errors or display them as needed
      });
  }
};


function sortmessages(data ){
  // temporarydata = data
  let allfetchmessage = []
  const access = Cookies.get("access_token");
  const arrayToken = access.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  data.forEach(item => { 
    if (item?.messageid?.sender?.id === tokenPayload?.user_id) {
    allfetchmessage.push({
      'chat_id': item?.messageid?.messageid,
       from_id: tokenPayload?.user_id, 
       to_id: aud(item?.messageid?.reciever?.id)?.userid,
        conversationDatas: item.testj
    });

  }
  else if (item?.messageid?.reciever?.id === tokenPayload?.user_id) {
    allfetchmessage.push({
      'chat_id': item?.messageid?.messageid,
       from_id: aud(item?.messageid?.sender?.id,)?.userid, 
       to_id:  tokenPayload?.user_id ,
        conversationDatas: item.testj
    });


  }


  })
  setAllchat(allfetchmessage) 
  if(activechat){
    newupdateactiveuser(activechat)
  }
  // setAllchat(allfetchmessage) 
  // console.log('all fetch', allfetchmessage)
}


const togglePortfolioEditMode = () => {
  setPortfolioEditMode(!portfolioeditmode);
};

// Function to update the portfolio link
const updatePortfolio = async () => {
  const payload = {
      portfolioUrl: portfolioUrl, // Include the portfolio URL in the payload
  };

  console.log(payload);

  if (portfolioUrl) {
      setPortfolioEditLoading(true); // Set loading state to true
      try {
          const response = await axiosInstance.patch('/update-portfolio/', payload, {
              headers: {
                  'Content-Type': 'application/json', // Explicitly set Content-Type to application/json
              },
          });
          toast.success('Portfolio Updated Successfully!');
          // Optionally, update user profile state if necessary
          setUserprofile(response.data); // Uncomment if you manage user profile state
          togglePortfolioEditMode(); // Close the edit mode
      } catch (error) {
          toast.error(
              error.response 
                  ? error.response.data.detail || 'Error updating portfolio' 
                  : 'Failed to connect to server'
          );
          console.error(error);
      } finally {
          setPortfolioEditLoading(false); // Ensure loading state is reset
      }
  } else {
      toast.error('Please enter a valid portfolio URL');
      setPortfolioEditLoading(false); // Ensure loading state is reset
  }
};

useEffect(() => {
  async function fetchData() {
    try {
      // Run all asynchronous functions in parallel using Promise.all
      await Promise.all([
        userdata(),
        fetchUniversities(),
        fetchprofile(),
        fetchJobs(),
        fdata(),
        fetchvisitors(),
        fetchWorkExperience(),
        fetchUniversitiesdata(),
        fetchsavedJobs(),
        fetchuserApplications(),
        fetchjobupdate(),
        fetchcompanyJobs(),
        fetchRoleMatch(),
        fetchTrainingPosts(),

 
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
}, []);


    return (
        <VeeContext.Provider
          value={{
            profileloaded,
            userdata,
            test,
            allJobs,
            loadingcards,
            fetchJobdetail,
            joberror, 
            setJoberror,
            axiosInstance,
            fetchcompanyJobs,
            companyJobs,
            optimizeBusinessDescription,
            individualsdata,
            fetchprofile,
            workExperience, 
            setWorkExperience,
            Universities,
            selectedUniversity,
            userprofile,
            generateJobDescriptionOverview,
            savejob,
            allSavedJobs,
            applyForJob,
            applications,
            hideLoader, 
            setHideLoader,
            loaderVisible, 
            setLoaderVisible,
            jobupdate,
            Loadingjobupdate,
            loadingsaves,
            loadingapplications, 
            LoadingApplication_detail, 
            fetchApplication_detail,
            roleMatch,
            roleMatchLoading,
            refetchdata,
            generateblogpost,
            blogs,
            loading, 
            error,
            fetchBlogPosts,
            currentStep,
             setCurrentStep,
             deleteUniversityRecord,
             deleteWorkExperience,
             setUserprofile,
             published,
             filled,
             openroles,
             allprofiles,
             chatdata,
             newupdateactiveuser,
             activeuserid,
             activechat,
             activechatdata,
             conversationdata,
             setconversationdata,
             sortmessages,
             fdata,
             training,
             loadingtraining,
             fetchTrainingPosts,
             togglevisitorbar,
             sideloading, 
             setsideloading,
             acceptvisitor,
             loadingaccept,
             signout,
             fetchvisitors,
             visitordataloaded,
             awaiting,
             pendingApproval,
             reshedule,
             inProgress,
             visitors,
             isvisitorbaropen,
             generatetrainingpost,
             visitationdata,
             myevents,
             loadingevents,
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
            
          
          }}
        >
          {children}
        </VeeContext.Provider>
      );
    };