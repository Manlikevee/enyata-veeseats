
import { Metadata } from 'next';
import Individualhomepage from '@/components/Mypages/Individualhomepage';

export const metadata = {
  title: 'Veeseats | Individual Dashboard',
  description: 'Access your personalized dashboard on Veeseats, the premier job portal for recruiting board members. Manage your profile, track applications, and connect with top companies seeking talented board members.',
  keywords: 'Veeseats, board members, job portal, recruitment, board member jobs, board member applications, connect with companies',
  author: 'Veeseats',
  robots: 'index, follow',
};

const page = () => {
  return (
<Individualhomepage/>

  )
}

export default page