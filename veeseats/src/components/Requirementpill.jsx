import React from 'react'

const Requirementpill = ({reqtitle, reqvalue}) => {
  return (
    <div className='reqpill'>
        <div className="reqicon">
        <svg
  width={9}
  height={9}
  viewBox="0 0 9 9"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="4.10913" cy="4.40601" r="4.10913" fill="#A91F2F" />
</svg>

        </div>
        <div className="reqtext">
            <div className="retitle">{reqtitle}</div>
            <div className="rebody">{reqvalue}</div>
        </div>
       </div>
  )
}

export default Requirementpill