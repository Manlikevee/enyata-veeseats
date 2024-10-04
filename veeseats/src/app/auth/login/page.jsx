'use client'
import Authlayout from '@/components/authlayout/Authlayout'
import React, { useState, useContext } from 'react'
import Inputcomponent from '@/components/Inputcomponent'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { VeeContext } from '@/components/context/Chatcontext'
import Mylogocomponent from '@/components/Mylogocomponent'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
const page = () => {
  
  const { fetchprofile, refetchdata  } = useContext(VeeContext);
  const router = useRouter()
  const url = 'https://veezitorbackend.vercel.app/token/';
  const baseurl = 'https://bsjobapi.vercel.app'
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const handleClick = () => {

      router.push('/auth/verify-account/3333337')
    }
    const handlecorp = () => {

      router.push('/corporate/dashboard')
    }
    const handleLogin = () => {

      router.push('/auth/register/corporate')
    }


    const handleSignup = () => {

      router.push('/auth/register/individual')
    }

    React.useEffect(() => {
      // Call this function when the component mounts to handle the LinkedIn callback
      handleLinkedInCallback();
    }, []);
  

    const submitLogin = async () => {
      setIsloading(true)
      const payload = {
        username: email,
        password: currentPassword
      };
      const url = 'https://bsjobapi.vercel.app/token/';
  
      console.log(payload);
  
      if(email && currentPassword){
        axios.post(url, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          // Successful login
         
          Cookies.set('access_token', response.data.access, { expires: 14 });
          Cookies.set('refresh_token', response.data.refresh, { expires: 14 });
          const is_corporate = jwtDecode(response.data.access).is_corporate;
          const profiledata = fetchprofile();
          refetchdata();
          setTimeout(async function() {
            toast.success(`Login successfully`);
            if(is_corporate){
      
              router.push('/corporate/dashboard')
            }else{
         
                 router.push('/Individual/dashboard')
            }
         
          }, 1000);
  

          setIsloading(false)
      })
      .catch(error => {
          // Failed login
  
          toast.error(error.response ? error.response.data.message || 'Invalid Username or Password' : 'Failed to connect to server');
          // Hide loading spinner and enable submit button
          setIsloading(false)
      });
  
      } else{
        toast.error('Kindly Fill All Fields')
        setIsloading(false)
      }
  
      // Add logic to handle the login, e.g., API call to authenticate the user
    };



    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
  signinfunction(tokenResponse.access_token)
      },
      onFailure: error => console.error(error),
      // scope: 'profile email',
    });
  
 async function ssosigninfunction(mytoken){
  setIsloading(true);
      try {
        const response = await axios.post(`${baseurl}/api/auth/googletoken/`, {
          token: mytoken,
        });
  
        // console.localStorage(response.data.user);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        Cookies.set('access_token', response.data.access, { expires: 14 });
        Cookies.set('refresh_token', response.data.refresh, { expires: 14 });
        const token = response.data.access;
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        console.log(tokenPayload);
        setIsloading(false);
        const is_corporate = jwtDecode(response.data.access).is_corporate;
        const profiledata = fetchprofile();
        refetchdata();
        let params = new URLSearchParams(window.location.search);
        let nexturl = params.get('next');
        setTimeout(function() {
          if(nexturl){
            window.location.href = nexturl
            router.replace(nexturl)
          }else{
            toast.success(`Login successfully`);
            if(is_corporate){
      
              router.push('/corporate/dashboard')
            }else{
         
                 router.push('/Individual/dashboard')
            }
          }
        
        }, 1500);
  
        // Store the tokens in local storage or state management library
        // localStorage.setItem('access_token', response.data.access);
        // localStorage.setItem('refresh_token', response.data.refresh);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
  
  
   async function signinfunction(mytoken){
    setIsloading(true);
      try {
        const response = await axios.post('https://bsjobapi.vercel.app/api/auth/google/', {
          token: mytoken,
        });
  
        // console.localStorage(response.data.user);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        Cookies.set('access_token', response.data.access, { expires: 14 });
        Cookies.set('refresh_token', response.data.refresh, { expires: 14 });
        const token = response.data.access;
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        console.log(tokenPayload);
        setIsloading(false);
        const is_corporate = jwtDecode(response.data.access).is_corporate;
        const profiledata = fetchprofile();
        refetchdata();
        let params = new URLSearchParams(window.location.search);
        let nexturl = params.get('next');
        setTimeout(function() {
          if(nexturl){
            window.location.href = nexturl
            router.replace(nexturl)
          }else{
            toast.success(`Login successfully`);
            if(is_corporate){
      
              router.push('/corporate/dashboard')
            }else{
         
                 router.push('/Individual/dashboard')
            }
          }
        
        }, 1500);
  
        // Store the tokens in local storage or state management library
        // localStorage.setItem('access_token', response.data.access);
        // localStorage.setItem('refresh_token', response.data.refresh);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }


    const addLinkedIn = async () => {
      const callbackurl = `${window.location.protocol}//${window.location.host}/auth/login/`;
      const requesturl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=771udvmb7mdwvl&redirect_uri=${callbackurl}&scope=openid%20profile%20email`;
    
      // Redirect user to LinkedIn for authorization
      window.location.href = requesturl;
    };
    
    const handleLinkedInCallback = async () => {
    
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const callbackurl = `${window.location.protocol}//${window.location.host}/auth/login/`;
      if (code) {
        setIsloading(true);
        try {
          axios
            .get(
              `https://bsjobapi.vercel.app/linkedin/linkedinauth_callback/?code=${code}&redirect_uri=${callbackurl}`
            )
            .then((response) => {
              // Assuming the URL to redirect to is in response.data.redirectUrl
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);
              Cookies.set('access_token', response.data.access, { expires: 14 });
              Cookies.set('refresh_token', response.data.refresh, { expires: 14 });
              const token = response.data.access;
              const arrayToken = token.split('.');
              const tokenPayload = JSON.parse(atob(arrayToken[1]));
              console.log(tokenPayload);
              setIsloading(false);
              const is_corporate = jwtDecode(response.data.access).is_corporate;
              const profiledata = fetchprofile();
              refetchdata();
              let params = new URLSearchParams(window.location.search);
              let nexturl = params.get('next');
              setTimeout(function() {
                if(nexturl){
                  window.location.href = nexturl;
                  router.replace(nexturl)
                }else{
                  toast.success(`Login successfully`);
                  if(is_corporate){
            
                    router.push('/corporate/dashboard')
                  }else{
               
                       router.push('/Individual/dashboard')
                  }
                }
              
              }, 1500);
            })
            .catch((error) => {
              console.error("Error:", error);
              setIsloading(false);
            });
        } catch (error) {
          console.error("Error fetching LinkedIn data:", error);
          setIsloading(false);
        }
      }
    };



  return (
    <Authlayout>
  <div className='mybglogoimg'>   <Mylogocomponent /></div> 
    {/* <img src="https://boardseats.io/documents/20121/0/Boardseats+Logo.png/" alt=""  className='mylogoimg'/> */}
    

    <p className='loginhelper'>Welcome to Veeseats.</p>

    <div className="centered-text">Signup as</div>
    <div className="applyforroleflex">
<button className='mybtnwhite'  onClick={handleLogin}> 
Executives
</button>
   <button className='mybtnwhite' onClick={handleSignup}>   
   Corporate</button>
</div>


    <div className="miniformdiv">
    <Inputcomponent 
        inputState={email} 
        setInputState={setEmail} 
        label="Username" 
        inputType="text" 
        name="email" 
        id="email" 
        icontype='email'
      />

<Inputcomponent 
        inputState={currentPassword} 
        setInputState={setCurrentPassword} 
        label="Password" 
        inputType="password" 
        name="current-password" 
        id="current-password" 
        icontype='lock'
      />
{/* <small className='rightside'  onClick={handleClick}>Forgot Password?</small> */}
{isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
<button className='mybtn' onClick={submitLogin}>Login</button>
         }




</div>
<div className="centered-text">Or</div>
    <div className="applyforroleflex">
<button className='mybtnwhite' onClick={() => login()}> 
 <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <path
        d="M23.76 12.273c0-.851-.076-1.67-.218-2.455H12.24v4.642h6.458a5.52 5.52 0 01-2.394 3.622l1.939 1.505 1.939 1.506c2.269-2.09 3.578-5.166 3.578-8.82z"
        fill="#4285F4"
      />
      <path
        d="M12.24 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947l-2.004 1.555-2.005 1.554A11.996 11.996 0 0012.24 24z"
        fill="#34A853"
      />
      <path
        d="M5.525 14.28A7.213 7.213 0 015.15 12c0-.79.136-1.56.376-2.28L3.521 8.165 1.516 6.611A11.995 11.995 0 00.24 12c0 1.936.464 3.77 1.276 5.39l4.01-3.11z"
        fill="#FBBC05"
      />
      <path
        d="M12.24 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C18.191 1.19 15.475 0 12.24 0 7.55 0 3.49 2.69 1.516 6.61l4.01 3.11c.943-2.836 3.589-4.947 6.714-4.947z"
        fill="#EA4335"
      />
    </svg> Google</button>
   <button className='mybtnwhite' onClick={addLinkedIn}>   
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <path
        d="M20.45 20.449h-3.557V14.88c0-1.328-.024-3.038-1.85-3.038-1.851 0-2.135 1.447-2.135 2.941v5.665H9.352V8.997h3.414v1.565h.048a3.742 3.742 0 013.368-1.85c3.604 0 4.269 2.37 4.269 5.455l-.002 6.282zM5.34 7.43a2.064 2.064 0 11-.001-4.127 2.064 2.064 0 010 4.127zM7.118 20.45h-3.56V8.997h3.56v11.452zM22.222.002H1.771A1.751 1.751 0 000 1.732v20.535A1.753 1.753 0 001.771 24h20.451A1.756 1.756 0 0024 22.267V1.73A1.755 1.755 0 0022.222 0"
        fill="#0A66C2"
      />
    </svg> Linkdein</button>
</div>

    </Authlayout>

  )
}

export default page