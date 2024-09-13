import Titleddiv from '@/components/Titleddiv'
import Layout from '@/components/dashboard/Layout'
import Individualprofileupdate from '@/components/profileupdate/Individualprofileupdate'
import React from 'react'

const page = () => {

  // useEffect(() => {
  //   if (pathname == '/accounts/accountupdate' && userprofile && userprofile.profile_verified && !userdata.is_corporate && profileloaded   ) {
  //     router.replace('/accounts/accountupdate');
  //     toast.info('Kindly Complete Your Profile Update')
  //   }
  // }, [ userprofile]);

  return (
    <Layout>
            <div className="dashboard">
            <p></p>
<h4>Profile Update</h4>
            <Titleddiv title={'Personal Information Update'}>
<Individualprofileupdate/>
</Titleddiv>


            </div>

        </Layout>
  )
}

export default page