import React from 'react'
import Lazytext from './Lazytext'

const LazyJobcard = () => {
  return (
    <div className='rolecard shimmers'>

<div className="roleheader">
      <div className="rolelogo">
   <small>   <Lazytext size={3}/></small>

      </div>
      <div className="rolelocal fdc">
        <div className="gap">
          <img src="/lod.png" alt="" width="10px" height="13" />
 <small></small>
        </div>
        <div className="rtype">
        <Lazytext size={3}/>
            </div>
      </div>
    </div>
    <div className="dtitle">
      <div className="job-card-title">
<Lazytext size={3}/>
        </div>
      <small className="dservice">
      <Lazytext size={3}/>
        </small>
    </div>
    <div className="dcontent">
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    </div>
    <div className="rolefoot">
        <small><span className="material-symbols-outlined">bookmark_added</span> Saved</small>
        <small>     <Lazytext size={3}/> </small>
      </div>
    </div>
  )
}

export default LazyJobcard