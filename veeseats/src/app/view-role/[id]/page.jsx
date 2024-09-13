
import React from 'react'
import Jobdetail from '@/components/Mypages/Jobdetail';

export async function generateMetadata({ params, searchParams }, parent) {
  // Read route params
  const id = params.id;

  try {
    // Fetch data
    const response = await fetch(`https://bsjobapi.vercel.app/seodetail/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const product = await response.json();

    
    return {
      title: product?.jobdetail?.jobtitle || 'Default Title',
      description:  product?.jobdetail?.jobdescription ,
      //       openGraph: {
      //   images: product?.jobdetail?.organization?.logo,
      // },
    
      // icons: {
      //   icon: product?.jobdetail?.organization?.logo,
      //   shortcut: product?.jobdetail?.organization?.logo, // for the shortcut icon
      //   apple: product?.jobdetail?.organization?.logo, // for apple devices
      // },
    };
  } catch (error) {
    console.error('Failed to fetch product data:', error);

    // Return default metadata in case of error
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }
}

const page = () => {


  return (
<Jobdetail/>
  )
}

export default page