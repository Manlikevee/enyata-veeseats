'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '@/components/dashboard/Layout'
import Titleddiv from '@/components/Titleddiv';
import Inputcomponent from '@/components/Inputcomponent';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import {  toast } from 'sonner'
import { Wand } from 'lucide-react';
import Blogcard from '@/components/Blogcard';
import { VeeContext } from '@/components/context/Chatcontext';
const DynamicQuillEditor = dynamic(() => import('@/components/CustomQuillEditor'), {
    ssr: false,
  });

const page = () => {
    const { axiosInstance, generatetrainingpost  } = useContext(VeeContext);
    const [blogimage, setBlogImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [modulesContent, setModulesContent] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const inputEl = useRef(null);
    const [isLoading, setIsloading] = useState(false);
    const [aigenerated, setAigenerated] = useState('');
    const [aidata, setaidata] = useState('');
    const [resourceLink, setResourceLink] = useState('');
    const [isPhysical, setIsPhysical] = useState(false);
    const [isDigital, setIsDigital] = useState(false);
    const [language, setLanguage] = useState('English');
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0.0);
    const [eventDate, setEventDate] = useState(null);
    const [skillAreas, setSkillAreas] = useState([
        { value: 'frontend', label: 'Frontend Development' },
        { value: 'backend', label: 'Backend Development' },
        { value: 'fullstack', label: 'Full Stack Development' },
        { value: 'mobile', label: 'Mobile Development' },
        { value: 'data', label: 'Data Science' },
        { value: 'devops', label: 'DevOps' },
        { value: 'uiux', label: 'UI/UX Design' },
        { value: 'ml', label: 'Machine Learning' },
        { value: 'cloud', label: 'Cloud Computing' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
        { value: 'networking', label: 'Networking' },
        { value: 'ai', label: 'Artificial Intelligence' },
        { value: 'blockchain', label: 'Blockchain' },
        { value: 'quantum', label: 'Quantum Computing' },
        { value: 'iot', label: 'Internet of Things' },
        { value: 'vr', label: 'Virtual Reality' },
        { value: 'ar', label: 'Augmented Reality' },
        { value: 'robotics', label: 'Robotics' },
        { value: 'database', label: 'Database Management' },
        { value: 'bigdata', label: 'Big Data' },
        { value: 'game', label: 'Game Development' },
        { value: 'aiops', label: 'AIOps' },
        { value: 'seo', label: 'SEO Optimization' },
        { value: 'content', label: 'Content Creation' },
        { value: 'graphic', label: 'Graphic Design' },
        { value: 'video', label: 'Video Editing' },
        { value: 'photography', label: 'Photography' },
        { value: 'writing', label: 'Creative Writing' },
        { value: 'translation', label: 'Translation' },
        { value: 'marketing', label: 'Digital Marketing' },
        { value: 'smm', label: 'Social Media Management' },
        { value: 'advertising', label: 'Advertising' },
        { value: 'branding', label: 'Branding' },
        { value: 'product', label: 'Product Management' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'finance', label: 'Finance' },
        { value: 'accounting', label: 'Accounting' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'legal', label: 'Legal' },
        { value: 'project', label: 'Project Management' },
        { value: 'supply', label: 'Supply Chain Management' },
        { value: 'logistics', label: 'Logistics' },
        { value: 'healthcare', label: 'Healthcare Management' },
        { value: 'nursing', label: 'Nursing' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'pharmacy', label: 'Pharmacy' },
        { value: 'nutrition', label: 'Nutrition' },
        { value: 'psychology', label: 'Psychology' },
        { value: 'counseling', label: 'Counseling' },
        { value: 'education', label: 'Education' },
        { value: 'teaching', label: 'Teaching' },
        { value: 'research', label: 'Research' },
        { value: 'architecture', label: 'Architecture' },
        { value: 'civil', label: 'Civil Engineering' },
        { value: 'mechanical', label: 'Mechanical Engineering' },
        { value: 'electrical', label: 'Electrical Engineering' },
        { value: 'chemical', label: 'Chemical Engineering' },
        { value: 'biotech', label: 'Biotechnology' },
        { value: 'environmental', label: 'Environmental Science' },
        { value: 'agriculture', label: 'Agriculture' },
        { value: 'food', label: 'Food Science' },
        { value: 'horticulture', label: 'Horticulture' },
        { value: 'veterinary', label: 'Veterinary Medicine' },
        { value: 'sports', label: 'Sports Management' },
        { value: 'fitness', label: 'Fitness Training' },
        { value: 'yoga', label: 'Yoga Instruction' },
        { value: 'dance', label: 'Dance' },
        { value: 'music', label: 'Music Production' },
        { value: 'theater', label: 'Theater Arts' },
        { value: 'filmmaking', label: 'Filmmaking' },
        { value: 'journalism', label: 'Journalism' },
        { value: 'broadcasting', label: 'Broadcasting' },
        { value: 'animation', label: 'Animation' },
        { value: 'illustration', label: 'Illustration' },
        { value: 'interior', label: 'Interior Design' },
        { value: 'fashion', label: 'Fashion Design' },
        { value: 'photography', label: 'Photography' },
        { value: 'carpentry', label: 'Carpentry' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrician', label: 'Electrical Work' },
        { value: 'automotive', label: 'Automotive Repair' },
        { value: 'aviation', label: 'Aviation' },
        { value: 'logistics', label: 'Logistics Management' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'hospitality', label: 'Hospitality Management' },
        { value: 'culinary', label: 'Culinary Arts' },
        { value: 'bakery', label: 'Bakery' },
        { value: 'wine', label: 'Wine Making' },
        { value: 'tourism', label: 'Tourism Management' },
        { value: 'event', label: 'Event Planning' },
        { value: 'customer_service', label: 'Customer Service' },
        { value: 'retail', label: 'Retail Management' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'entrepreneurship', label: 'Entrepreneurship' },
        { value: 'innovation', label: 'Innovation Management' },
        { value: 'sustainability', label: 'Sustainability' },
        { value: 'csr', label: 'Corporate Social Responsibility' },
        { value: 'ngo', label: 'Nonprofit Management' },
        { value: 'fundraising', label: 'Fundraising' },
        { value: 'grant_writing', label: 'Grant Writing' },
    ]);


      
      const handleAddModule = () => {
        setModulesContent([...modulesContent, { moduleTitle: '', moduleBody: '' }]);
      };
      
      const handleUpdateModule = (index, module) => {
        setModulesContent(modulesContent.map((m, i) => {
          if (i === index) {
            return module;
          }
          return m;
        }));
      };
      
      const handleDeleteModule = (index) => {
        setModulesContent(modulesContent.filter((m, i) => i !== index));
      };

      const handleselectChange = (event) => {
        const selectedValue = event.target.value;
    
        if (selectedValue === 'digital') {
          setIsDigital(true);
          setIsPhysical(false);
        } else if (selectedValue === 'physical') {
          setIsPhysical(true);
          setIsDigital(false);
        }
      };



async function tryai(){
        // setLoading(true);
        // Mastering Digital Marketing in 2024
      if(title){
        try {
          const optimizedDescription = await generatetrainingpost({trainingtitle: title});

        setaidata(optimizedDescription)
        setTitle(optimizedDescription?.title);
        setAigenerated(optimizedDescription?.body);
        setCategory(optimizedDescription?.category);
        setModulesContent(optimizedDescription?.modulesContent);
        console.log(optimizedDescription?.modulesContent)
      } catch (error) {
        console.error('Error optimizing description:', error);
      }
      }
else{
  toast.info('Kindly Input A Title')
}
      
        // setLoading(false);
      }
    
      const handleImageChange = () => {
        const file = inputEl.current.files[0];
      
        if (file) {
          setImagePreview(URL.createObjectURL(file)); // Show image preview
      
          const img = new Image();
          img.src = URL.createObjectURL(file);
      
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
      
            canvas.toBlob(
              (newBlob) => {
                if (newBlob) {
                  const compressedImageFile = new File([newBlob], file.name.replace(/\.\w+$/, '.webp'), {
                    type: 'image/webp',
                  });
                  setBlogImage(compressedImageFile); // Save the compressed image file
                } else {
                  console.error('Image compression failed.');
                }
              },
              'image/webp', // Convert to WebP format
              0.7 // Compression quality (70%)
            );
          };
      
          img.onerror = () => {
            console.error('Error loading the image.');
          };
        } else {
          console.error('No file selected.');
        }
      };
      
      const handleLogPayload = () => {
        const formData = new FormData();
      
        formData.append('title', title);
        formData.append('body', body);
        formData.append('category', category);
        formData.append('resourceLink', resourceLink);
        formData.append('isPhysical', isPhysical);
        formData.append('isDigital', isDigital);
        formData.append('language', language);
        formData.append('date', date.toISOString()); // Convert date to string
        formData.append('price', price);
        formData.append('eventDate', eventDate );
        formData.append('modules_content', JSON.stringify(modulesContent));
      
        if (blogimage) {
          formData.append('blogimage', blogimage); // Append the compressed image file
        } else {
          toast.error('Please upload an image.');
          return;
        }
      
        setIsloading(true);
      
        axiosInstance
          .post('/create_training_post/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log('Response:', response.data);
            toast.success('Blog Posted Successfully');
            setIsloading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.error('An error occurred while posting the blog.');
            setIsloading(false);
          });
      
        console.log('Payload (FormData):', formData);
      };


  return (
    <Layout>

    <div className="dashboard">
        <p></p>
        <h4></h4>
        <div className="blogtwocolbox">
        <Titleddiv title={'Create New Training'}>

            <div className="story">At Veeseats, we believe in the power of knowledge sharing. Our platform allows you to design and host engaging webinars tailored to your audience’s needs. Whether you’re focusing on industry insights, skill development, or thought leadership, we’re here to support you every step of the way.

Get started by filling out the form below, and let’s create something impactful together! </div>
      


<div className="reggrid">
<Inputcomponent
      inputState={title}
      setInputState={setTitle}
      label="Blog Title"
      inputType="text"
      name="title"
      id="title"
    />

    <Inputcomponent
      inputState={category}
      setInputState={setCategory}
      label="Category"
      inputType="text"
      name="category"
      id="category"
    />


<div className="miniforminput">
<label htmlFor="webinarType">Select Training Type:</label>
    <div className="miniforminputdata">

    
    <select id="webinarType" onChange={handleselectChange}>
        <option value="">--Choose an option--</option>
        <option value="physical">Physical</option>
        <option value="digital">Digital</option>
      </select>
    </div>
    </div> 

{isDigital && (    <Inputcomponent
      inputState={resourceLink}
      setInputState={setResourceLink}
      label="Resource Link"
      inputType="url"
      name="resourceLink"
      id="resourceLink"
    />)}


    {/* <Inputcomponent
      inputState={isPhysical}
      setInputState={setIsPhysical}
      label="Is Physical"
      name="isPhysical"
      id="isPhysical"
    />
    <Inputcomponent
      inputState={isDigital}
      setInputState={setIsDigital}
      label="Is Digital"
      name="isDigital"
      id="isDigital"
    /> */}
    <Inputcomponent
      inputState={language}
      setInputState={setLanguage}
      label="Language"
      inputType="text"
      name="language"
      id="language"
    />
    <Inputcomponent
      inputState={price}
      setInputState={setPrice}
      label="Price"
      inputType="number"
      name="price"
      id="price"
    />
    <Inputcomponent
      inputState={eventDate}
      setInputState={setEventDate}
      label="Event Date"
      inputType="date"
      name="eventDate"
      id="eventDate"
    />




    <div className="miniforminput">
    <label htmlFor='Blog Image'>Blog Image</label>
    <div className="miniforminputdata">
   
        <input type='file' name='blogimage' id='blogimage'  
                        accept="image/*"
                        ref={inputEl}    
           
        onChange={handleImageChange}   />
    </div>
    </div> 








</div>

<div className="miniforminput">
<label htmlFor='Country'>Blog Description     <Wand size={20} color='#a92f41' className='aigenerate'  onClick={tryai}/>  </label>
    <div className="miniforminputdata giant">
<p></p>
 
         <DynamicQuillEditor value={body} setValue={setBody} aigenerated={aigenerated} /> 
    </div>
    </div> 
  

    <>

{modulesContent && modulesContent.length > 0 ? (
  modulesContent.map((module, index) => (
    <div key={index}>
      <br />
      <button onClick={() => handleDeleteModule(index)} className="login">
        Delete Module
      </button>
      <div className="miniforminput">
        <label htmlFor="moduleTitle">Module Title:</label>
        <div className="miniforminputdata">
          <input
            type="text"
            value={module.moduleTitle}
            onChange={(e) =>
              handleUpdateModule(index, { ...module, moduleTitle: e.target.value })
            }
          />
        </div>
      </div>
      <div className="miniforminput">
        <label htmlFor="moduleBody">Module Description:</label>
        <div className="miniforminputdata">
          <textarea
            value={module.moduleBody}
            onChange={(e) =>
              handleUpdateModule(index, { ...module, moduleBody: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  ))
) : (
  <p>No modules available.</p>
)}

    <button onClick={handleAddModule} className='login'>Add Module</button>
  </>


      <div className="mybtns">


      
        
          {isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
        <button className='mybtn' onClick={handleLogPayload} >Submit Training Post</button>
         }



      </div>

    </Titleddiv>

    <div className="blogsecond">
    <Blogcard 
       
          image={imagePreview}
          title={title}
          tag={selectedSkills}
          subtext={body}
        />
</div>
        </div>

        </div>
        </Layout>
  )
}

export default page