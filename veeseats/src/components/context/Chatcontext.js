"use client";

import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Create the context
export const VeeContext = createContext();





export const VeeContextProvider = ({ children }) => {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(4);
  const [hideLoader, setHideLoader] = useState(false);
    const router = useRouter();
    const [test, setTest] = useState('');
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
    
    const [profileloaded, setprofileloaded] = useState(false);

    const [blogs, setBlogs] = useState([]); // Blog posts state
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch all blog posts
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
        setJobupdate(response.data);

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
    
            setTimeout(function () {
              // Redirect to success.html with the random ID as a parameter
              router.replace("/auth/login");
            }, 2000); // 2000 milliseconds = 2 seconds
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
  userdata(),
  fetchUniversities(),
  fetchprofile(),
  fetchJobs(),
  fetchWorkExperience(),
  fetchUniversitiesdata(),
  fetchsavedJobs(),
  fetchuserApplications(),
  fetchjobupdate(),
  fetchcompanyJobs(),
  fetchRoleMatch()
}

useEffect(() => {
  async function fetchData() {
    try {
      // Run all asynchronous functions in parallel using Promise.all
      await Promise.all([
        fetchUniversities(),
        fetchprofile(),
        userdata(),
        fetchJobs(),
        fetchWorkExperience(),
        fetchUniversitiesdata(),
        fetchsavedJobs(),
        fetchuserApplications(),
        fetchjobupdate(),
        fetchcompanyJobs(),
        fetchRoleMatch(),
 
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
             setUserprofile
            
            
          
          }}
        >
          {children}
        </VeeContext.Provider>
      );
    };