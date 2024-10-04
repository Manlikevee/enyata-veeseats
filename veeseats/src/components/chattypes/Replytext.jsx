import React, { useEffect, useRef , useContext, useState} from 'react'
import { VeeContext } from "@/components/context/Chatcontext";

const Replytext = ({ messagedata}) => {
  const { activeuserid, conversationdata  } = useContext(VeeContext);
  const [messQuote, setMessQuote] = useState(null);
  const message = messagedata
  useEffect(() => {
    if (message.type === 'replytext') {
      const messquote = conversationdata.find(obj => String(obj.id) === String(messagedata.quotedid));
      setMessQuote(messquote);
    }
  }, [messagedata]);
  return (
    <div className={message.senderid === activeuserid ? 'completemessagesent' : 'completemessagerec'}>
    <div className={message.senderid === activeuserid ? 'messagesent' : 'messagerec'} id={message.id ? message.id : '#'}>
      <div className="edgecontrol">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path
            d={message.senderid === activeuserid ? 'M18.5039 3.6641C20.1503 2.56645 19.3733 3.61246e-06 17.3944 3.52596e-06L2.60673e-06 -9.53989e-08L1.90735e-06 16L18.5039 3.6641Z' : 'M1.49615 3.6641C-0.150327 2.56645 0.626734 3.61246e-06 2.60555 3.52596e-06L20 -9.53989e-08L20 16L1.49615 3.6641Z'}
            fill={message.senderid === activeuserid ? 'var(--greenbar)' : 'var(--greybar)'}
          />
        </svg>
      </div>
      <div className="chatbubble quotedpost">
        <a className="quoted" href={message.quotedid ? '#' + message.quotedid : '#'}>
          <div className="quotetext">
            <div className="quotetitle uname">{messQuote?.from}</div>
            <small className="small twolines">
              {messQuote?.message}
            </small>
          </div>
        </a>
        <div className="www" >
          {message.message}
          <span className="smallspan">
           dd
            {/* <ion-icon name="checkmark-done-outline"></ion-icon> */}
          </span>
        </div>
        <div className="qts" style={{ display: 'flex', gap: '14px', fontSize: '19px', fontWeight: 900 }}>
          <div className="quot" >
            {/* <ion-icon name="arrow-undo-outline"></ion-icon> */}
          </div>
          <div className="edit">
            {/* <ion-icon name="create-outline"></ion-icon> */}
          </div>
          <div className="delete" >
            {/* <ion-icon name="trash-outline"></ion-icon> */}
          </div>
        </div>
      </div>
    </div>
    <div className="messageopt" >
      <span className="material-symbols-outlined">reply</span>
    </div>
  </div>
  )
}

export default Replytext