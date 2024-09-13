import React from 'react'

const Offercard = ({title, subtext}) => {
  return (
<div className="offercard">
  <div className="offercardimg">
    <img src="/gp1(1).png" alt="" />
  </div>
  <div className="offerheader">{title}</div>
  <div className="offercardcontentbody">
   {subtext}
  </div>
  <div className="offerbutton">
    <a href="#" className="offerbtn">
      Read More
    </a>
  </div>
</div>
  )
}

export default Offercard