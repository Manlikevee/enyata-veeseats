import Link from 'next/link'
import React from 'react'
import PlainTextRenderer from './PlainTextRenderer'

const Blogcard = ({image, title, tag, subtext, id}) => {

  const href = id ? `/veeseats/insights/${id}` : '#';
  return (
    <Link href={href} className="subgridbox blogbox">
    <div className="blogimg">
<img src={image} alt="" />
    </div>
    <div className="articletags">
        <div className="articletag">{tag}</div>
        <div className="readtime">5 min read</div>
    </div>
    <div className="articlename">
   {title}
    </div>
    <div className="story">
 
   {subtext && ( <PlainTextRenderer content={subtext} />)}
    </div>

</Link>
  )
}

export default Blogcard