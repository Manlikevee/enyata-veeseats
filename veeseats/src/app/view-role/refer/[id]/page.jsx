
import React from 'react'
import Jobdetail from '@/components/Mypages/Jobdetail';
import Referform from '@/components/Mypages/Referform';

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
      description: product?.jobdetail?.jobdescription ,
            openGraph: {
        images: 'https://res.cloudinary.com/viktortech/image/upload/v1/media/organizations_images/CompanyRazorpay_n2tt7n',
      },
    
      icons: {
        icon: 'https://res.cloudinary.com/viktortech/image/upload/v1/media/organizations_images/CompanyRazorpay_n2tt7n',
        shortcut: 'https://res.cloudinary.com/viktortech/image/upload/v1/media/organizations_images/CompanyRazorpay_n2tt7n', // for the shortcut icon
        apple: 'https://res.cloudinary.com/viktortech/image/upload/v1/media/organizations_images/CompanyRazorpay_n2tt7n', // for apple devices
      },
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
  <Referform/>
  )
}

export default page