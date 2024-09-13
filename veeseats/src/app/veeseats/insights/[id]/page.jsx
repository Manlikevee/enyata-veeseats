'use client'
import Heropage from '@/components/Landingpage/Home/Heropage'
import Productivity from '@/components/Landingpage/Home/Productivity'
import Landinglayout from '@/components/Landingpage/Landinglayout'
import Landingpagecard from '@/components/Landingpagecard'
import Linebgdiv from '@/components/Linebgdiv'
import Offercard from '@/components/Offercard'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Lazytext from '@/components/Lazyloading/Lazytext'
import MarkdownWithHTML from '@/components/MarkdownWithHTML'
import axios from 'axios'
import Link from 'next/link'

const page = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlogPost = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`https://bsjobapi.vercel.app/blogposts/${id}/`);
          setBlogPost(response.data);
        } catch (err) {
          setError('Failed to fetch blog post.');
          console.error('Error fetching blog post:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchBlogPost();
    }
  }, [id]); // Refetch when `id` changes

  return (
    <Landinglayout>


<div className="startimageblock">
<div className="herocontainer fdc">


<div className="landingtitle creativetext">
{blogPost?.title} {loading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} 
</div>
</div>
</div>
<br />
<div className="herocontainer benefits-items ">
<div className="story ">
<div className="country-list">
  <div className="country-item">
    <Link href="/">Home</Link>
  </div>
  <div className="country-item">
    <Link href="/veeseats/insights">Research</Link>
  </div>
  <div className="country-item">
    <a href="#">{blogPost?.title} {loading && ( <div className='shimmer lngr'> <Lazytext size={3}/> </div>)} </a>
  </div>
</div>
<br />
{blogPost?.body && ( <MarkdownWithHTML content={blogPost?.body} />)}



{loading && (
  <div className='shimmers dfg longer'>
      <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/>
    <Lazytext size={3}/> 
    <Lazytext size={3}/>
    <Lazytext size={3}/>
  </div>
)}

    </div>
</div>




  



    </Landinglayout>

  )
}

export default page