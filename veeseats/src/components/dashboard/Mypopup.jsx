import React from 'react'

const Mypopup = ({togglemodal, pagetitle, children}) => {
  return (
    <div className="loading-over2" style={{ display: "flex" }}>
    <div className="popup">
     <h5>{pagetitle}   <p id="close2" onClick={togglemodal}>×</p></h5>
      <div className="secoact">
     


{children}




      </div>
      {/* {
        activeSection &&(    <div className="proceedbtn">
        <button className='mybtn' onClick={handlecorp}>Proceed</button>
        </div>)
      } */}
  

    </div>
  </div>
  )
}

export default Mypopup