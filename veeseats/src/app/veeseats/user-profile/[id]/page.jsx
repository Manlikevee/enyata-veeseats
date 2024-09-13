import Landinglayout from '@/components/Landingpage/Landinglayout'
import Userprofile from '@/components/Mypages/Userprofile'
import Templateone from '@/components/resumetemplates/Templateone'
import React from 'react'

const page = () => {
  return (
    <Landinglayout hidelinks >
<div className="startimageblock telephone shorters"></div>
<div className="herocontainer fdc serv bgap">
{/* <Userprofile/> */}
<Templateone/>
</div>
        </Landinglayout>
  )
}

export default page