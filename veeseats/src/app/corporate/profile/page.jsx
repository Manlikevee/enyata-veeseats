import Corporateprofile from '@/components/Corporateprofile'
import Layout from '@/components/dashboard/Layout'
import React from 'react'

const page = () => {
  return (
    <Layout>
    <div className="dashboard gaptransiton">
    <br />
   <Corporateprofile/>
   </div>
   </Layout>
  )
}

export default page