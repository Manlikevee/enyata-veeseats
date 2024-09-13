import React from 'react';
import Head from 'next/head';

const Headpage = ({ post }) => {
  const { title, excerpt, tags = [], image, slug } = post;
  return (

      <Head>
        {title && <title>{title} - My Next.js App</title>}
        {excerpt && <meta name="description" content={excerpt} />}
        {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}
        {title && <meta property="og:title" content={title} />}
        {excerpt && <meta property="og:description" content={excerpt} />}
        {image && <meta property="og:image" content={image} />}
        {slug && <meta property="og:url" content={`https://www.example.com/posts/${slug}`} />}
        {image && <meta name="twitter:card" content="summary_large_image" />}
        {title && <meta name="twitter:title" content={title} />}
        {excerpt && <meta name="twitter:description" content={excerpt} />}
        {image && <meta name="twitter:image" content={image} />}
      </Head>

  );
};

export default Headpage;
