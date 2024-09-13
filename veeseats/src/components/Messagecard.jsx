import Link from 'next/link'
import React from 'react'

const Messagecard = ({toggleClass, title, body, mylink}) => {
  return (
<Link href={mylink ? mylink : '#'} className="messagecard" onClick={toggleClass}>
    <img src="/avatar.png" alt="avatar"  className='messageavatar'/>
    <div className="messagecardtext">
      <div className="fromuser">{title}</div>
      <div className="frommessage">{body}</div>
    </div>
</Link>
  )
}

export default Messagecard