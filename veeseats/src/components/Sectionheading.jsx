import React from 'react'

const Sectionheading = ({title, subtitle}) => {
  return (
    <div className='mysectiondiv'>
        <div className='mysectiontitle'>{title}</div>
        <div className='mysectionsubtitle'>{subtitle}</div>
    </div>
  )
}

export default Sectionheading