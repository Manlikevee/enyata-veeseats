import React from 'react'

function truncateText(text, maxLength = 20) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}


const Visitorstable = ({mydata , tabletype, togglevisitorbar}) => {
    console.log(mydata)
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      }

  return (
  <>
  {mydata?.length > 0 ? (

<>
    {mydata?.map((info, index) => (

<div className="tabledata" onClick={() => togglevisitorbar(info?.ref)}  key={index}>
<div className="acc">
  <div className="accflx">
    <div className="init">
      {info?.first_name.charAt( 0)}
      {info?.last_name.charAt(0)}
    </div>
    <div className="accnames">
      <div className="name">
        {info?.first_name} {info?.last_name}
      </div>
    </div>
  </div>
</div>
<div className="acc">
  <div className="email">
    {info?.email}
  </div>
</div>
<div className="acc initialize">
  <div className="eid">
    {info?.phonenumber}
  </div>
</div>
<div className="acc initialize stfname">

  {truncateText(info?.event?.title, 20)}
  
</div>
<div className="acc initialize stfname">
  <div className="pending ${info?.status}">
    <span className="material-symbols-outlined">pending_actions</span>
    Confirmation
  </div>
</div>
<div className="acc initialize stfname">
  {formatDate(info?.clock_in)}
</div>
</div>

    ))}
</>

) : (
  <div className="tabledata" id="tableusers">
    <div className="acc nodata">
      <img src="Group26780.png" alt="" />
      <h5 className="sectiontitle" style={{ fontSize: 20 }}>
        No Employees
      </h5>
    </div>
  </div>
)}
  </>
  )
}

export default Visitorstable