'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Cookies from "js-cookie";
import Loginlayout from '@/components/dashboard/Loginlayout'
import Rolefilter from '@/components/dashboard/Rolefilter'
import Rolecard from '@/components/Rolecard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Messagecard from '@/components/Messagecard';
import Topnav from '@/components/Topnav';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { VeeContext } from '@/components/context/Chatcontext';
import Messagegenerator from '@/components/chattypes/Messagegenerator';
import Pusher from 'pusher-js';


// Add locale-specific rules.
TimeAgo.addDefaultLocale(en);




const chatData = [
  {
    id: 899968,
    type: 'sent',
    message: 'Hey, I’m Victor Odah, the founder of Veeseats. It’s a job and board recruitment platform that uses AI to help users find and apply for roles seamlessly. We’re focusing on improving the job search process with personalized recommendations and simplifying recruitment for companies.',
    time: new Date()
  },
  {
    id: 899969,
    type: 'received',
    message: 'That sounds interesting! Could you tell me how Veeseats differs from other recruitment platforms?',
    time: new Date()
  },
  {
    id: 899970,
    type: 'sent',
    message: 'Sure! What sets Veeseats apart is our use of AI to match job seekers with roles based on their skills and career goals. We also provide tailored board recruitment services for organizations, streamlining the process of finding qualified candidates for leadership positions.',
    time: new Date()
  }
];
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
    


const page = () => {
  const { individualsdata, chatdata, newupdateactiveuser, fdata, activechat, activechatdata, conversationdata, axiosInstance, setconversationdata, sortmessages } = useContext(VeeContext);
  const [windowHeight, setWindowHeight] = useState(0); // Initial state set to 0
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showsearch, setshowsearch] = useState(false);


  
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    setIsOverlayOpen((prevState) => !prevState);
  };
  const togglesearch = () => {
    setshowsearch((prevState) => !prevState);

  };


  const toggleClass = () => {
    setIsShowing(!isShowing);
};

const handleAddMessage = () => {
  if (newMessage.trim()) {
    const newMessageObj = {
      id: Date.now(),
      type: 'sent',
      message: newMessage,
      time: new Date()
    };

    const autoResponse = {
      id: Date.now() + 1, // Ensuring unique ID
      type: 'received',
      message: "Thank you for your interest. We understand that you'd love to test this feature, but it's currently under development. Rest assured, we are working hard to release it soon. Your patience is appreciated. Cheers!",
      time: new Date()
    };

    setMessages([...messages, newMessageObj, autoResponse]);
    setNewMessage('');

    // Scroll to emptydiv after messages are updated
    setTimeout(() => {
      const emptyDiv = document.getElementById("emptydiv");
      if (emptyDiv) {
        emptyDiv.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure messages are rendered first
  }
};


async function postMessage() {
  const uniqueid = activechatdata?.message_id
  const payloaddata = {
    data: {
      id: getRandomNumber(1, 990000),
      type: "text",
       sender: "sent",
       from: "victor",
       message: newMessage,
       datetime: new Date(),
    }
  };

  try {
    // Sending a POST request to the provided URL with the payload data
    const response = await axiosInstance.post(`/messageportal/${activechatdata?.message_id}/`, {
     payloaddata  // Spread the payloaddata object to send it as the body
    });

    // You can handle the response if necessary
    console.log('Response:', response.data);
    if (uniqueid == activechatdata?.message_id){
      setconversationdata(response.data.messageserialized.testj)
      // sortmessages(response.data.allmessages)
    }

    setNewMessage('')

    return response.data;  // Optionally return the data
  } catch (error) {
    // Handle any error that occurs during the request
    console.error('Error posting message:', error.response ? error.response.data : error.message);
    
    // Optionally throw the error to handle it higher up in the call stack
    throw error;
  }
}

useEffect(() => {
  const access = Cookies.get("access_token");
  const arrayToken = access.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  const pusher = new Pusher('48ec4ad056af9b749e55', {
    cluster: 'mt1',
  });

  // Subscribe to the channel and event you want to listen to
  const channel = pusher.subscribe(`message-channel-${tokenPayload?.user_id}`);
  channel.bind('new-message', (data) => {
    // Update the message list when a new message is received
    setconversationdata(data.messageserialized.testj);

    // if (activechatdata?.message_id && data?.messageserialized?.messageid?.messageid == activechatdata?.message_id){
   
      
    // }
    fdata()
    // sortmessages(data.allmessages)
    console.log('newwwwwwwwwwww messsssssssssageeeeeeeeeeeeee')
  }); 

  // Cleanup function to unsubscribe when the component is unmounted
  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}, []); // Only run this effect once on mount


  useEffect(() => {
    // Function to update the height
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Set the initial height when the component mounts
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const divStyle = {
    height: `${windowHeight}px`,
    background: '#f7f3ef'
     // Add any other styling you need
  };

  const jobDescriptions = [
{
      companyLogo: '/images/Company=Instagram.png',
      jobTitle: 'Content Strategist',
      jobLocation: 'New York, NY',
      jobType: 'Contract',
      jobIndustry: 'Social Media',
      jobContent: 'Craft compelling content strategies and campaigns for Instagram. Collaborate with cross-functional teams to create engaging content that resonates with our users.',
      roleMatch: false,
      savedTime: 'Yesterday'
    },
    {
      companyLogo: '/images/Company=Intercom.png',
      jobTitle: 'Senior UX Designer',
      jobLocation: 'Dublin, Ireland',
      jobType: 'Full-time',
      jobIndustry: 'Customer Messaging',
      jobContent: 'Design intuitive and user-friendly interfaces for our messaging and customer support platform. Drive design thinking and user research initiatives.',
      roleMatch: true,
      savedTime: '4 Days Ago'
    },
    
    // Add more job descriptions as needed
  ];

  return (
    <Loginlayout isSidebarOpen={isSidebarOpen} isOverlayOpen={isOverlayOpen} setIsSidebarOpen={setIsSidebarOpen} setIsOverlayOpen={setIsOverlayOpen}>




<div className="viewroleflex loginbody" >
  <div className="viewrolecards vmessages" style={divStyle}>

    <div className="messageflex">
    <Topnav hidesidebartoggle isSidebarOpen={isSidebarOpen} isOverlayOpen={isOverlayOpen} toggleSidebar={toggleSidebar}  />
  
    <div id="top"></div>
    <div className="vmessflexsticky">
<div className="vrdtop">

</div>
<div className="messageflextitle jcsb">Messages  <span className="material-symbols-outlined" onClick={togglesearch}>
search
</span> </div>

{
  showsearch && (<div className="justflex jfs">
  <div className="filterbox">
    <div className="filtersearch">
      <input placeholder="Find Message" type="text" />{" "}
      <span className="material-symbols-outlined">search</span>
    </div>
  </div>
</div>)
}


    </div>

    {chatdata?.length > 0 ? (
        <>
    {chatdata?.map((info, index) => (

<div
className={`chatbubbled chatnum ${info.userid === activechat ? 'activebubble' : ''}`}
key={index}
onClick={() => newupdateactiveuser(info?.userid)}
>
  {info?.userid}
<Messagecard title={info.name} body={'Get Started With Veeseats'} toggleClass={toggleClass}/>
</div>

    ))}
    </>
      ) : ('Loadinggggggggggggg') }


 

    <a href="#top" id="scroll-to-top-btn">
    <span className="material-symbols-outlined">
arrow_upward
</span>
</a>
    </div>

 
  </div>


  <div className={`viewroledata ${isShowing ? 'showing' : ''}`} style={divStyle}>
  {/*  */}
    <div className="vrdtop">
      <div className="vrtop">
      <div className="roleheader">
      <div className="userdata">
      <span className="material-symbols-outlined pointer" onClick={toggleClass}>
arrow_back
</span> 
  <div className="profilephoto" >
  <img
      src="https://res.cloudinary.com/viktortech/image/upload/v1/media/default.jpg"
      alt=""
      id="profilephoto"
    />
  </div>
  <div className="usersname">
    <div>
      {" "}
      <small className="small uname">
        {" "}
        <span id="usersname">watershed cap   </span>{" "}
  
      </small>
    </div>
    <small className="small" id="lastseen">
      2:03 PM
    </small>
  </div>
</div>

 
    </div>

      </div>
  
    </div>
    <div className="vrdbottom vrdbottominbox">

      <div className="overview-text-subheader">
   
<div className='chatContainer' id="chatContainer">


{/* {messages.map((msg) => (
          <div key={msg.id} className={`complete${msg.type === 'sent' ? 'messagesent' : 'messagerec'}`}>
            <div className={msg.type === 'sent' ? 'messagesent' : 'messagerec'} id={msg.id}>
              <div className="edgecontrol">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="chatbubble">
                <div className="www">
                  {msg.message}
                  <div className='wwwdiv'>
                    <span className="smallspan">
                      <ReactTimeAgo date={msg.time} locale="en-US" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))} */}

{activechatdata && conversationdata && (<Messagegenerator messagedata={conversationdata} />)}


<div id="emptydiv"></div>

</div>



      </div>
 

    </div>
    <div className="footerbottom">
    <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <span className="material-symbols-outlined" onClick={postMessage}>
send
</span>
      </div>
  </div>
</div>

</Loginlayout>
  )
}

export default page