import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import imgone from '../../../public/pending.png'
import imgtwo from '../../../public/success.png'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import dynamic from 'next/dynamic'

TimeAgo.addDefaultLocale(en)
const DynamicQrCodeScanner  = dynamic(() => import('../utils/QrCodeScanner'), {
  ssr: false,
});
const Visitationbar = ({fetchvisitors, signout, isvisitorbaropen, axiosInstance, visitationdata, setisVistorbaropen, togglevisitorbar, sideloading, acceptvisitor,
  loadingaccept, setVisitationdata}) => {

    useEffect(() => {
      const timeAgo = new TimeAgo('en-US');
      // You can now use timeAgo in your component
    }, []); // Empty dependency array ensures this runs only once

  const timeAgo = new TimeAgo('en-US')
  function formatDate(inputDate) {
    const date = inputDate ? new Date(inputDate) : new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  const handleQrscanner   = () =>  {
    setshowQrscanner(prevshowQrs => !prevshowQrs);
    console.log('clicked')
  };
  
  const [showQrscanner, setshowQrscanner ] = useState(false);
 
 return (
    <div className={`slidingovl ${isvisitorbaropen ? 'open' : ''} ${sideloading ? 'shimmers' : ''}`}>

<div className={`mysides  ${isvisitorbaropen ? 'open' : ''}`} id="sides">
{showQrscanner && visitationdata.ref  && <DynamicQrCodeScanner fetchvisitors={fetchvisitors} setVisitationdata={setVisitationdata} visitorsname={visitationdata.first_name + ' ' + visitationdata.last_name} axiosInstance={axiosInstance} handleQrscanner={handleQrscanner} myref={visitationdata?.ref} />}  
 
  <div className="jc">
    <h3 className="sectiontitle">Visitor Information</h3>
    <svg onClick={() => togglevisitorbar('close')}
      style={{ cursor: "pointer" }}
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9998 2.66669C8.65317 2.66669 2.6665 8.65335 2.6665 16C2.6665 23.3467 8.65317 29.3334 15.9998 29.3334C23.3465 29.3334 29.3332 23.3467 29.3332 16C29.3332 8.65335 23.3465 2.66669 15.9998 2.66669ZM20.4798 19.0667C20.8665 19.4534 20.8665 20.0934 20.4798 20.48C20.2798 20.68 20.0265 20.7734 19.7732 20.7734C19.5198 20.7734 19.2665 20.68 19.0665 20.48L15.9998 17.4134L12.9332 20.48C12.7332 20.68 12.4798 20.7734 12.2265 20.7734C11.9732 20.7734 11.7198 20.68 11.5198 20.48C11.1332 20.0934 11.1332 19.4534 11.5198 19.0667L14.5865 16L11.5198 12.9334C11.1332 12.5467 11.1332 11.9067 11.5198 11.52C11.9065 11.1334 12.5465 11.1334 12.9332 11.52L15.9998 14.5867L19.0665 11.52C19.4532 11.1334 20.0932 11.1334 20.4798 11.52C20.8665 11.9067 20.8665 12.5467 20.4798 12.9334L17.4132 16L20.4798 19.0667Z"
        fill="#CBCBCB"
      />
    </svg>
  </div>
  <div className="block">
    <div className="imgblk">
      <img
        src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=626&ext=jpg"
        alt=""
      />
    </div>
    <div className="nam" id="pname">
    {visitationdata?.first_name && visitationdata?.last_name 
    ? visitationdata.first_name + ' ' + visitationdata.last_name 
    : 'loading'} 
    </div>
    <div className="ema" id="pemail">
     {visitationdata?.email}
    </div>
    <div className="flxtwo"></div>
  </div>
  <div id="buttonblock">
    <div className="assigntag">
      <button>Reshedule</button>
      <button className="white">Cancel Visitation</button>
    </div>
  </div>
  <div className="sendingform">
    <b className="nam">Visitation Details</b>
    <div className="block bstart" id="bflx">
    <div className="bflex">
  <div className="bftag">
    <div className="bficon">
      {/* <div class="ch"><span class="material-symbols-outlined">
      done
      </span></div> */}
               <Image
         width={100}
         height={100}
         src={visitationdata?.stage_1? (imgtwo) : (imgone)} alt="" />

    </div>
    <div className="bftext">
      Visitation Request
      <small>
      {/* {formatDate(visitationdata?.clock_in)} */}
      {/* {timeAgo.format(visitationdata?.clock_in)} */}
      {timeAgo.format(visitationdata?.created_at ? new Date(visitationdata?.created_at) : new Date())}
      </small>
    </div>
  </div>


  <div className="bftag">
    <div className="bficon pi">
      <span className="material-symbols-outlined">more_vert</span>
    </div>
  </div>
  <div className="bftags">
    <div className="bftag">
      <div className="bficon">
      <Image
         width={100}
         height={100}
         src={visitationdata?.stage_2? (imgtwo) : (imgone)} alt="" />
      </div>
      <div className="bftext">
        Awaiting Confirmation
        <small> 
        
        {timeAgo.format(visitationdata?.accepted_time ? new Date(visitationdata?.accepted_time) : new Date())}
        </small>
      </div>
    </div>
    {visitationdata?.stage_1 && visitationdata?.stage_2 && !visitationdata?.stage_3 && !visitationdata?.stage_4 &&  !loadingaccept && (
   <div className="actives pnd">Under Review</div>

  ) }
 
  </div>
  <div className="bftag">
    <div className="bficon pi">
      <span className="material-symbols-outlined">more_vert</span>
    </div>
  </div>
  <div className="bftag">
    <div className="bficon">
    <Image
         width={100}
         height={100}
         src={visitationdata?.stage_3? (imgtwo) : (imgone)} alt="" />
    </div>
    <div className="bftext incomplete">
      Assign Tag
      <small>
      <small> 
      {visitationdata?.stage_1 && visitationdata?.stage_2 && visitationdata?.stage_3  && (
timeAgo.format(visitationdata?.clock_in ? new Date(visitationdata?.clock_in) : new Date())

  ) }
















        </small>

      </small>
    </div>
  </div>
  <div className="bftag">
    <div className="bficon pi">
      <span className="material-symbols-outlined">more_vert</span>
    </div>
  </div>
  <div className="bftag">
    <div className="bficon">
    <Image
         width={100}
         height={100}
         src={visitationdata?.stage_4? (imgtwo) : (imgone)} alt="" />
    </div>
    <div className="bftext">
      Signout
      <small>-</small>
    </div>
  </div>
</div>


    </div>
  </div>
  <div className="mycolbtn" id="statusbtn">


{visitationdata?.stage_1 && !visitationdata?.stage_2 && !visitationdata?.stage_3 && !visitationdata?.stage_4 &&  !loadingaccept && (
    <div className="assigntag grn gry">
  <button onClick={() => acceptvisitor(visitationdata?.ref)}>
    <span className="material-symbols-outlined">verified</span> Approve
  </button>
  </div>
  ) }

{visitationdata?.stage_1 && visitationdata?.stage_2 && !visitationdata?.stage_3 && !visitationdata?.stage_4 &&  !loadingaccept && (
<div className="assigntag grn">
<button onClick={handleQrscanner}>
  <span className="material-symbols-outlined">qr_code_scanner</span>
  Assign Tag
</button>
</div>

  ) }


{visitationdata?.stage_1 && visitationdata?.stage_2 && visitationdata?.stage_3 && !visitationdata?.stage_4 &&  !loadingaccept && (
<div className="assigntag grn">
<button onClick={() => signout(visitationdata?.ref)} >
  <span className="material-symbols-outlined">qr_code_scanner</span>
  SignOut
</button>
</div>

  ) }

<div className="assigntag ">
{loadingaccept && ( <button  id="loadingBtn" style={{ display: "flex" }} disabled="">
   <span className='loading-spinner'></span> Loading
    </button>) }
    </div>
  </div>
</div>
    </div>


  )
}

export default Visitationbar