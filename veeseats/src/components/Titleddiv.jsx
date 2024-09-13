import React from 'react'

const Titleddiv = ({children, title, notitle, myfunc, edit, iconname}) => {
  return (
    <div className='titlediv'>
      {!notitle && (         <div className="profileflex">
            <div className="overview-text-header">

{title}

</div>

<div className="profileaddnew" onClick={myfunc || undefined}>
  {
    edit ? (<span className="material-symbols-outlined">
    edit_document
    </span> ) : (<span className="material-symbols-outlined">
 {iconname || 'add_box'}
</span>)
  }

</div>
        </div>)}
     

<div className="overview-text-subheader">
{children}

    </div>

    </div>
  )
}

export default Titleddiv