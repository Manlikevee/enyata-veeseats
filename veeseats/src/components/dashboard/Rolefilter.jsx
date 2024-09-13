'use client'
import React, { useState, useRef, useEffect } from 'react'
import lgaData from './lgaData.json';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Sheet } from 'react-modal-sheet';
import Toggleicon from '../Toggleicon';
const Rolefilter = ({searchtitle, setSearchtitle}) => {
    const [baropen, setbaropen] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedLga, setSelectedLga] = useState('');
    const [dates, setDates] = useState([null, null]);
    const [isOpen, setOpen] = useState(false);
    const filboxesRef = useRef(null);

    const handleSelect = (range) => {
      setDates(range);
    };
    const togglebar = () => {
      setbaropen((prevState) => !prevState);

    };

    const handleInputChange = (event) => {
   
      if (setSearchtitle) {
        setSearchtitle(event.target.value);
      }
    };
    
    const clearDates = () => {
      setDates([null, null]);
    };
    const handleStateChange = (event) => {
      setSelectedState(event.target.value);
      setSelectedLga(''); // Reset selected LGA when state changes
    };
  return (
<>
<div className='justflex'>
<div className='filterbox'>
        <div className="filtersearch">
            <input type="text" placeholder='Find roles'
            value={searchtitle || ""} 
            onChange={handleInputChange}
            />  <span className="material-symbols-outlined">
search
</span>
        </div>
     
 <div ref={filboxesRef} className={`filboxes ${baropen ? 'filboxesshow' : ''}`}>
<div className="searchfilter">


<select name="" id="">
  <option value="">Date Range</option>
</select>
<span className="material-symbols-outlined">
      event
</span>
        </div>

        <div className="searchfilter">
        <input type="text" placeholder='Board type'/>  <span className="material-symbols-outlined">
        badge
</span>
        </div>


        <div className="searchfilter">

        <select value={selectedState} onChange={handleStateChange}>
          <option value="">State</option>
          {Object.keys(lgaData).map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
  <span className="material-symbols-outlined">
search
</span>
        </div>

        <div className="searchfilter">
        <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)}>
        <option  >Select LGA</option>
        {selectedState && (
            <>
                 {lgaData[selectedState].map((lga, index) => (
              <option key={index} value={lga}>{lga}</option>
            ))} 
            </>
  )}

        </select> 
        
        <span className="material-symbols-outlined"  >
search
</span>
        </div>
</div>

    </div>
    {/* onClick={togglebar} */}
    <div className="close"    onClick={() => setOpen(true)}>
    <Toggleicon/>
</div>
</div>


<Sheet isOpen={isOpen} onClose={() => setOpen(false)}
           snapPoints={[500, 400, 100, 0]}
           initialSnap={1}
    >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>

          <Sheet.Scroller>
            <div className="jobdescription overview-text-subheader" style={{ height: 200, padding:10 }}>
            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing

            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing

            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing

            Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing. We are looking for a user-interface/user-experience (UI/UX) designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into sitemaps, user flows, customer journey maps, wire-frames, mock-ups and prototypes. The UI/UX designer will also be expected to design the overall functionality of the product, and in order to ensure a great user experience, iterate upon it in accordance with user-testing
            </div>
          </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>


</>

  )
}

export default Rolefilter