import React from 'react'
import datesBetween from 'dates-between';
import ReadMoreArea from '@foxeian/react-read-more';

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = [...datesBetween(start, end)].length;

  let years = Math.floor(totalDays / 365);
  let remainingDays = totalDays % 365;
  let months = Math.floor(remainingDays / 30);
  let days = remainingDays % 30;

  let duration = '';
  if (years > 0) {
    duration += `${years} year${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
    if (duration) duration += ', ';
    duration += `${months} month${months > 1 ? 's' : ''}`;
  }
  if (days > 0) {
    if (duration) duration += ', ';
    duration += `${days} day${days > 1 ? 's' : ''}`;
  }

  return duration || '0 days';
};

const Workexperiencecard = ({organization_name, jobtitle, jobservice, industry, location, lga, startdate, enddate, jobdescription, onDelete }) => {
    const buttonStyle = {
        color: "#a92f41",
        width:'fit-content',
        textdecoration:'none',
        padding:'10px'
      };
  return (
<div className="globeheader">
  <div className="globea">
    <div className="globe">
    <span className="material-symbols-outlined">
language
</span>
    </div>
  </div>
  <div className="globebody">
    <div className="globetopflex">
      <div className="jtitle">
       {jobtitle} <span>({jobservice})</span>
      </div>
      <div className="flexx2">
        <div className="edit">
        <span className="material-symbols-outlined">
edit
</span>
        </div>
        <div className="edit">
        <span className="material-symbols-outlined"  onClick={onDelete}>
delete
</span>
        </div>
      </div>
    </div>
    <div className="secloc">
      <div className="jsector">{organization_name}</div>
      <div className="jlocation">{location}, {lga}</div>
    </div>
    <div className="timeblock">
      <div className="jfrom">{startdate} —</div>
      <div className="jto">{enddate}</div>
      <div className="jperiod">  {calculateDuration(startdate, enddate)} </div>
    </div>
    <div className="jobdescription overview-text-subheader">

    <ReadMoreArea
      style={{ display: 'block', flexDirection: 'column' }} // inline styles of main div
      expandLabel="See more" // Expand Label
      collapseLabel="See less" // Collapse Label
      buttonStyle={buttonStyle} // inline styles of button
      lettersLimit={480} // limit of letters (100 letters)
    >
  {jobdescription}
  </ReadMoreArea>

     
    </div>
  </div>
</div>

  )
}

export default Workexperiencecard