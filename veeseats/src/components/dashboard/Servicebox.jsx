import React from 'react'
import Titleddiv from '../Titleddiv'
import ReadMoreArea from "@foxeian/react-read-more";
import Link from 'next/link';
const Servicebox = ({pageTitle, imageUrl, sectionTitle, sectionBody, sectionList, requestId}) => {
 
    const buttonStyle = {
        color: "#0275B1",
        width: "fit-content",
        textdecoration: "none",
        padding: 0,
      };
 
 return (
<Titleddiv title={pageTitle} >

<div className="serviceflex">
<div className="sided">
<img src={imageUrl||'/6963.jpg'} alt="" />
</div>

<div className="sided">
    <div className="sectiontitle">{sectionTitle}</div>
    
    <div className="overview-text-subheader">
    <ReadMoreArea
            style={{ display: "block", flexDirection: "column" }} // inline styles of main div
            expandLabel="See more" // Expand Label
            collapseLabel="See less" // Collapse Label
            buttonStyle={buttonStyle} // inline styles of button
            lettersLimit={200} // limit of letters (100 letters)
          >
 {sectionBody}
 </ReadMoreArea>
 <div className="myul">
 {sectionList && sectionList.map((item, index) => (

        <div key={index} className="myli"><span className="material-symbols-outlined">
        radio_button_checked
        </span> {item}</div>
      ))}
        </div>




   <Link href="mailto:odahviktor@gmail.com?subject=Service Inquiry&body=How can I provide service for you" className='mybtn' > Request now</Link>

    </div>
</div>
</div>

    </Titleddiv>
  )
}

export default Servicebox