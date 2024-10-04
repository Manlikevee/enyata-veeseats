import React, { useEffect, useRef , useContext} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";
import ReactTimeAgo from 'react-time-ago';

const Texttype = ({messagedata}) => {
    const { activeuserid,  } = useContext(VeeContext);
    const isActiveUser = messagedata?.senderid === activeuserid;
    // console.log(messagedata);
  return (


<div  className={`complete${isActiveUser ? 'messagesent' : 'messagerec'}`}>
<div className={isActiveUser ? 'messagesent' : 'messagerec'} id={messagedata.id}>
  <div className="edgecontrol">
    <span className="material-symbols-outlined">person</span>
  </div>
  <div className="chatbubble">
    <div className="www">
    {messagedata?.message} 
      <div className='wwwdiv'>
        <span className="smallspan">
          <ReactTimeAgo date={messagedata?.datetime} locale="en-US" />
        </span>
      </div>
    </div>
  </div>
</div>
</div>

  )
}

export default Texttype