import React from 'react'
import datesBetween from 'dates-between';
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
const Educationcard = ({uinversitydata, onDelete}) => {
  return (
    <div className="globeheader">
    <div className="globea">
      <div className="worl">
        <img
          src={uinversitydata?.university?.schoollogo || 'https://static.vecteezy.com/system/resources/previews/007/688/840/non_2x/education-logo-free-vector.jpg' }
          alt={uinversitydata?.university.institution}
        />
      </div>
    </div>
    <div className="globebody">
      <div className="globetopflex">
        <div className="jtitle">
        {uinversitydata?.university.institution} - <small> {uinversitydata?.university.Acronym}</small> <span>({uinversitydata?.university.Type})</span>
        </div>
        <div className="flexx2">
        <div className="edit" >
        <span className="material-symbols-outlined">
edit
</span>
        </div>
        <div className="edit" >
        <span className="material-symbols-outlined" onClick={onDelete}>
delete
</span>
        </div>
      </div>
      </div>
      <div className="secloc">
        <div className="jsector"> {uinversitydata?.course}</div>
        <div className="jlocation">{uinversitydata?.degree}</div>
      </div>
      <div className="timeblock">
        <div className="jfrom">{uinversitydata?.start_date}—</div>
        <div className="jto">{uinversitydata?.finish_date}</div>
        <div className="jperiod"> {calculateDuration(uinversitydata?.start_date, uinversitydata?.finish_date)}   </div>
      </div>
    </div>
  </div>
  
  )
}

export default Educationcard