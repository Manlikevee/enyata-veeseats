import React from 'react'

const Benefitcards = ({title, body, iconName}) => {
  return (


<div className="benefits-wrapper">
  <div className="icon-wrapper">
    {/* <img
      src="https://cdn.prod.website-files.com/66a670efde55ad37d6d22b43/66a9fee569366b0b05bb137a_stats-down-square.svg"
      loading="lazy"
      alt=""
    /> */}
    <span className="material-symbols-outlined">
{iconName}
</span>
  </div>
  <div className="benefits-item">
    <div className="valuetitle">{title}</div>
    <div className="story">
 {body}
    </div>
  </div>
</div>

  )
}

export default Benefitcards