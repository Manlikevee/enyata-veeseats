'use client'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '@/components/dashboard/Layout'
import Titleddiv from '@/components/Titleddiv';
import Inputcomponent from '@/components/Inputcomponent';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import Roledetailbox from '@/components/Roledetailbox';
import {  toast } from 'sonner'
import { PaystackButton } from 'react-paystack'
import { marked } from 'marked';
import lgaData from '@/components/dashboard/lgaData.json';
import { VeeContext } from '@/components/context/Chatcontext';
import { Wand } from 'lucide-react';
import { useRouter } from 'next/navigation'
const DynamicQuillEditor = dynamic(() => import('@/components/QuillEditor'), {
  ssr: false,
});


const page = () => {
  const { individualsdata , axiosInstance, optimizeBusinessDescription} = useContext(VeeContext);
  const router = useRouter()

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

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [roleTitle, setRoleTitle] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [companyOrganization, setCompanyOrganization] = useState('');
    const [industry, setIndustry] = useState('');
    const [boardseatType, setBoardseatType] = useState('');
    const [roleStatus, setRoleStatus] = useState('');
    const [tenure, setTenure] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [managerialExperience, setManagerialExperience] = useState('');
    const [boardExperience, setBoardExperience] = useState('');
    const [remuneration, setRemuneration] = useState('');
    const [remunerationForRole, setRemunerationForRole] = useState('');
    const [skills, setSkills] = useState(['']);
    const [requirements, setRequirements] = useState(['']);
    const [jobDescription, setJobDescription] = useState('');
    const [myJobDescription, setmyJobDescription] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedLga, setSelectedLga] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [reference, setReference] = useState(null);
    const [aigenerated, setAigenerated] = useState(null);
 

    const publicKey = 'pk_test_5cff1482a437c3feb9114d509f327eda9366d37e';
    const componentProps = {
     
      email: individualsdata.email || '',
      amount : 20000 * 100,
      metadata: {
        'Payment For': `${roleTitle}`,
        'Contact Email': individualsdata.email || '',
      },
      publicKey,
      text: `Pay Now`,
      onSuccess: ({ reference }) => {
        setReference(reference)
        // alert(`Your purchase was successful! Transaction reference: ${reference}`),
        handlePrint(reference)
      
      },
      onClose: () => alert("Wait! You need this, don't go!!!!"),
    }
  


    function saveforlater() {
      const payload = {
        selectedSkills,
        roleTitle,
        numberOfSeats,
        companyOrganization,
        industry,
        boardseatType,
        roleStatus,
        tenure,
        workExperience,
        managerialExperience,
        boardExperience,
        remuneration,
        remunerationForRole,
        skills,
        requirements,
        jobDescription : myJobDescription,
        selectedState,
        selectedLga,
        reference: reference
      };
    
      console.log("Payload:", payload);
    
      // Make the POST request using Axios
      axiosInstance.post('/createjobpost/', payload)
        .then(response => {
          console.log('Response:', response.data);
          toast.success('Job Posted Successfully')
          router.push('/corporate/dashboard')
          // Handle success (e.g., display a success message or navigate to another page)
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error (e.g., display an error message)
        });
    
      return payload;
    }


    function handlePrint(myref) {
      const payload = {
        selectedSkills,
        roleTitle,
        numberOfSeats,
        companyOrganization,
        industry,
        boardseatType,
        roleStatus,
        tenure,
        workExperience,
        managerialExperience,
        boardExperience,
        remuneration,
        remunerationForRole,
        skills,
        requirements,
        jobDescription : myJobDescription,
        selectedState,
        selectedLga,
        reference: myref
      };
    
      console.log("Payload:", payload);
    
      // Make the POST request using Axios
      axiosInstance.post('/createjobpost/', payload)
        .then(response => {
          console.log('Response:', response.data);
          toast.success('Job Posted Successfully')
          router.push('/corporate/dashboard')
          // Handle success (e.g., display a success message or navigate to another page)
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error (e.g., display an error message)
        });
    
      return payload;
    }

    const handleAddField = (setState, state) => {
      if (state.some(field => field === '')) {
        alert('Please fill all fields before adding a new one.');
        return;
      }
      setState([...state, '']);
    };
  

    const handleStateChange = (event) => {
      setSelectedState(event.target.value);
      setSelectedLga(''); // Reset selected LGA when state changes
    };

    const handleInputChange = (index, event, setState, state) => {
      const values = [...state];
      values[index] = event.target.value;
      setState(values);
    };
  
    const handleRemoveField = (index, setState, state) => {
      const values = [...state];
      values.splice(index, 1);
      setState(values);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (skills.some(skill => skill === '') || requirements.some(requirement => requirement === '')) {
        alert('Please fill all fields before submitting.');
        
        return;
      }
      const data = {
        skills,
        requirements,
      };
      console.log('Input Fields as JSON:', JSON.stringify(data));
    };

    const handleChange = (selected) => {
      setSelectedSkills(selected);
    };

      const handleNext = () => {
        if (currentStep === 1) {
          // Check if all fields are filled
          if (
            roleTitle.trim() === '' ||
            numberOfSeats.trim() === '' ||
            companyOrganization.trim() === '' ||
            industry.trim() === '' ||
            selectedState.trim() === '' ||
            selectedLga.trim() === '' ||
            boardseatType.trim() === '' ||
            tenure.trim() === '' ||
            workExperience.trim() === '' ||
            managerialExperience.trim() === '' ||
            boardExperience.trim() === '' ||
            remuneration.trim() === '' ||
            remunerationForRole.trim() === ''
          ) {
            toast.info('Please fill in all the fields before proceeding to the next step.')
         
            return; // Prevent moving to the next step
          }
        }
      
        // If all fields are filled, proceed to the next step
        setCurrentStep(prevStep => prevStep + 1);
      };
  
    const handleBack = () => {
      setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
    };

    
    async function tryai(){
      // setLoading(true);
    
      try {
        const optimizedDescription = await optimizeBusinessDescription(roleTitle, boardseatType, industry);
        // setResponse(optimizedDescription);
         setAigenerated(optimizedDescription)
   
      } catch (error) {
        console.error('Error optimizing description:', error);
      }
    
      // setLoading(false);
    }
  
      useEffect(() => {

        // 'individualsdata'
        console.log(individualsdata)
        setCompanyOrganization(individualsdata.username)
        // Convert Markdown to HTML
        const markdownText = jobDescription
        let htmlContent = marked(markdownText);
        setJobDescription(markdownText);
        setmyJobDescription(markdownText)
     
      }, []);

  return (
    <Layout>

    <div className="dashboard">
        <p></p>
        <h4></h4>

        {currentStep === 1 && (
    <Titleddiv title={'Boardseats Premium Posting'}>
    <div className="reggrid">
    <Inputcomponent 
        inputState={roleTitle} 
        setInputState={setRoleTitle} 
        label="Role Title" 
        inputType="text" 
        name="roleTitle" 
        id="roleTitle" 
      />
      <Inputcomponent 
        inputState={numberOfSeats} 
        setInputState={setNumberOfSeats} 
        label="Number of seats to be filled?" 
        inputType="number" 
        name="numberOfSeats" 
        id="numberOfSeats" 
      />
      <Inputcomponent 
        inputState={companyOrganization} 
        setInputState={setCompanyOrganization} 
        label="Company/Organization" 
        inputType="text" 
        name="companyOrganization" 
        id="companyOrganization" 
        readonly
      />
      {/* <Inputcomponent 
        inputState={industry} 
        setInputState={setIndustry} 
        label="Industry" 
        inputType="text" 
        name="industry" 
        id="industry" 
      /> */}


<div className="miniforminput">
    <label htmlFor='Country'>Industry</label>
    <div className="miniforminputdata">

   

        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
      <option value="Accounting">Accounting</option>
<option value="Airlines/Aviation">Airlines/Aviation</option>
<option value="Alternative Dispute Resolution">Alternative Dispute Resolution</option>
<option value="Alternative Medicine">Alternative Medicine</option>
<option value="Animation">Animation</option>
<option value="Apparel/Fashion">Apparel/Fashion</option>
<option value="Architecture/Planning">Architecture/Planning</option>
<option value="Arts/Crafts">Arts/Crafts</option>
<option value="Automotive">Automotive</option>
<option value="Aviation/Aerospace">Aviation/Aerospace</option>
<option value="Banking/Mortgage">Banking/Mortgage</option>
<option value="Biotechnology/Greentech">Biotechnology/Greentech</option>
<option value="Broadcast Media">Broadcast Media</option>
<option value="Building Materials">Building Materials</option>
<option value="Business Supplies/Equipment">Business Supplies/Equipment</option>
<option value="Capital Markets/Hedge Fund/Private Equity">Capital Markets/Hedge Fund/Private Equity</option>
<option value="Chemicals">Chemicals</option>
<option value="Civic/Social Organization">Civic/Social Organization</option>
<option value="Civil Engineering">Civil Engineering</option>
<option value="Commercial Real Estate">Commercial Real Estate</option>
<option value="Computer Games">Computer Games</option>
<option value="Computer Hardware">Computer Hardware</option>
<option value="Computer Networking">Computer Networking</option>
<option value="Computer Software/Engineering">Computer Software/Engineering</option>
<option value="Computer/Network Security">Computer/Network Security</option>
<option value="Construction">Construction</option>
<option value="Consumer Electronics">Consumer Electronics</option>
<option value="Consumer Goods">Consumer Goods</option>
<option value="Consumer Services">Consumer Services</option>
<option value="Cosmetics">Cosmetics</option>
<option value="Dairy">Dairy</option>
<option value="Defense/Space">Defense/Space</option>
<option value="Design">Design</option>
<option value="E-Learning">E-Learning</option>
<option value="Education Management">Education Management</option>
<option value="Electrical/Electronic Manufacturing">Electrical/Electronic Manufacturing</option>
<option value="Entertainment/Movie Production">Entertainment/Movie Production</option>
<option value="Environmental Services">Environmental Services</option>
<option value="Events Services">Events Services</option>
<option value="Executive Office">Executive Office</option>
<option value="Facilities Services">Facilities Services</option>
<option value="Farming">Farming</option>
<option value="Financial Services">Financial Services</option>
<option value="Fine Art">Fine Art</option>
<option value="Fishery">Fishery</option>
<option value="Food Production">Food Production</option>
<option value="Food/Beverages">Food/Beverages</option>
<option value="Fundraising">Fundraising</option>
<option value="Furniture">Furniture</option>
<option value="Gambling/Casinos">Gambling/Casinos</option>
<option value="Glass/Ceramics/Concrete">Glass/Ceramics/Concrete</option>
<option value="Government Administration">Government Administration</option>
<option value="Government Relations">Government Relations</option>
<option value="Graphic Design/Web Design">Graphic Design/Web Design</option>
<option value="Health/Fitness">Health/Fitness</option>
<option value="Higher Education/Acadamia">Higher Education/Acadamia</option>
<option value="Hospital/Health Care">Hospital/Health Care</option>
<option value="Hospitality">Hospitality</option>
<option value="Human Resources/HR">Human Resources/HR</option>
<option value="Import/Export">Import/Export</option>
<option value="Individual/Family Services">Individual/Family Services</option>
<option value="Industrial Automation">Industrial Automation</option>
<option value="Information Services">Information Services</option>
<option value="Information Technology/IT">Information Technology/IT</option>
<option value="Insurance">Insurance</option>
<option value="International Affairs">International Affairs</option>
<option value="International Trade/Development">International Trade/Development</option>
<option value="Internet">Internet</option>
<option value="Investment Banking/Venture">Investment Banking/Venture</option>
<option value="Investment Management/Hedge Fund/Private Equity">Investment Management/Hedge Fund/Private Equity</option>
<option value="Judiciary">Judiciary</option>
<option value="Law Enforcement">Law Enforcement</option>
<option value="Law Practice/Law Firms">Law Practice/Law Firms</option>
<option value="Legal Services">Legal Services</option>
<option value="Legislative Office">Legislative Office</option>
<option value="Leisure/Travel">Leisure/Travel</option>
<option value="Library">Library</option>
<option value="Logistics/Procurement">Logistics/Procurement</option>
<option value="Luxury Goods/Jewelry">Luxury Goods/Jewelry</option>
<option value="Machinery">Machinery</option>
<option value="Management Consulting">Management Consulting</option>
<option value="Maritime">Maritime</option>
<option value="Market Research">Market Research</option>
<option value="Marketing/Advertising/Sales">Marketing/Advertising/Sales</option>
<option value="Mechanical or Industrial Engineering">Mechanical or Industrial Engineering</option>
<option value="Media Production">Media Production</option>
<option value="Medical Equipment">Medical Equipment</option>
<option value="Medical Practice">Medical Practice</option>
<option value="Mental Health Care">Mental Health Care</option>
<option value="Military Industry">Military Industry</option>
<option value="Mining/Metals">Mining/Metals</option>
<option value="Motion Pictures/Film">Motion Pictures/Film</option>
<option value="Museums/Institutions">Museums/Institutions</option>
<option value="Music">Music</option>
<option value="Nanotechnology">Nanotechnology</option>
<option value="Newspapers/Journalism">Newspapers/Journalism</option>
<option value="Non-Profit/Volunteering">Non-Profit/Volunteering</option>
<option value="Oil/Energy/Solar/Greentech">Oil/Energy/Solar/Greentech</option>
<option value="Online Publishing">Online Publishing</option>
<option value="Other Industry">Other Industry</option>
<option value="Outsourcing/Offshoring">Outsourcing/Offshoring</option>
<option value="Package/Freight Delivery">Package/Freight Delivery</option>
<option value="Packaging/Containers">Packaging/Containers</option>
<option value="Paper/Forest Products">Paper/Forest Products</option>
<option value="Performing Arts">Performing Arts</option>
<option value="Pharmaceuticals">Pharmaceuticals</option>
<option value="Philanthropy">Philanthropy</option>
<option value="Photography">Photography</option>
<option value="Plastics">Plastics</option>
<option value="Political Organization">Political Organization</option>
<option value="Primary/Secondary Education">Primary/Secondary Education</option>
<option value="Printing">Printing</option>
<option value="Professional Training">Professional Training</option>
<option value="Program Development">Program Development</option>
<option value="Public Relations/PR">Public Relations/PR</option>
<option value="Public Safety">Public Safety</option>
<option value="Publishing Industry">Publishing Industry</option>
<option value="Railroad Manufacture">Railroad Manufacture</option>
<option value="Ranching">Ranching</option>
<option value="Real Estate/Mortgage">Real Estate/Mortgage</option>
<option value="Recreational Facilities/Services">Recreational Facilities/Services</option>
<option value="Religious Institutions">Religious Institutions</option>
<option value="Renewables/Environment">Renewables/Environment</option>
<option value="Research Industry">Research Industry</option>
<option value="Restaurants">Restaurants</option>
<option value="Retail Industry">Retail Industry</option>
<option value="Security/Investigations">Security/Investigations</option>
<option value="Semiconductors">Semiconductors</option>
<option value="Shipbuilding">Shipbuilding</option>
<option value="Sporting Goods">Sporting Goods</option>
<option value="Sports">Sports</option>
<option value="Staffing/Recruiting">Staffing/Recruiting</option>
<option value="Supermarkets">Supermarkets</option>
<option value="Telecommunications">Telecommunications</option>
<option value="Textiles">Textiles</option>
<option value="Think Tanks">Think Tanks</option>
<option value="Tobacco">Tobacco</option>
<option value="Translation/Localization">Translation/Localization</option>
<option value="Transportation">Transportation</option>
<option value="Utilities">Utilities</option>
<option value="Venture Capital/VC">Venture Capital/VC</option>
<option value="Veterinary">Veterinary</option>
<option value="Warehousing">Warehousing</option>
<option value="Wholesale">Wholesale</option>
<option value="Wine/Spirits">Wine/Spirits</option>
<option value="Wireless">Wireless</option>
<option value="Writing/Editing">Writing/Editing</option>
      </select>
    </div>
    </div> 


      {/* <Inputcomponent 
        inputState={country} 
        setInputState={setCountry} 
        label="Country" 
        inputType="text" 
        name="country" 
        id="country" 
      /> */}
    <div className="miniforminput">
    <label htmlFor='Country'>State</label>
    <div className="miniforminputdata">

    <select value={selectedState} onChange={handleStateChange}>
          <option value="">State</option>
          {Object.keys(lgaData).map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
    </div>
    </div> 



<div className="miniforminput">
    <label htmlFor='Country'>Select LGA</label>
    <div className="miniforminputdata">

    <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)}>
        <option  >Select LGA</option>
        {selectedState && (
            <>
                 {lgaData[selectedState].map((lga, index) => (
              <option key={index} value={lga}>{lga}</option>
            ))} 
            </>
  )}

        </select> 
    </div>
    </div> 

      {/* <Inputcomponent 
        inputState={boardseatType} 
        setInputState={setBoardseatType} 
        label="Boardseat Type" 
        inputType="text" 
        name="boardseatType" 
        id="boardseatType" 
      /> */}

<div className="miniforminput">
    <label htmlFor='Country'>Boardseat Type</label>
    <div className="miniforminputdata">
    <select
        id="boardseatType"
        value={boardseatType}
        onChange={(e) => setBoardseatType(e.target.value)}
      >
        <option value="">-- Select Working Level --</option>
        <option value="beginner">Beginner</option>
        <option value="junior">Junior</option>
        <option value="intermediate">Intermediate</option>
        <option value="mid-level">Mid-Level</option>
        <option value="senior">Senior</option>
        <option value="advanced">Advanced</option>
        <option value="expert">Expert</option>
        <option value="master">Master</option>
      </select>
    </div>
    </div> 

      <Inputcomponent 
        inputState={roleStatus} 
        setInputState={setRoleStatus} 
        label="Is the role(s) new or existing" 
        inputType="text" 
        name="roleStatus" 
        id="roleStatus" 
      />
      <Inputcomponent 
        inputState={tenure} 
        setInputState={setTenure} 
        label="Tenure (years) candidate is expected to serve" 
        inputType="number" 
        name="tenure" 
        id="tenure" 
      />
      <Inputcomponent 
        inputState={workExperience} 
        setInputState={setWorkExperience} 
        label="Years of Work Experience" 
        inputType="number" 
        name="workExperience" 
        id="workExperience" 
      />
      <Inputcomponent 
        inputState={managerialExperience} 
        setInputState={setManagerialExperience} 
        label="Years of Managerial Experience" 
        inputType="number" 
        name="managerialExperience" 
        id="managerialExperience" 
      />
      <Inputcomponent 
        inputState={boardExperience} 
        setInputState={setBoardExperience} 
        label="Years of Board Experience" 
        inputType="number" 
        name="boardExperience" 
        id="boardExperience" 
      />
      {/* <Inputcomponent 
        inputState={remuneration} 
        setInputState={setRemuneration} 
        label="Remuneration" 
        inputType="text" 
        name="remuneration" 
        id="remuneration" 
      /> */}

<div className="miniforminput">
    <label htmlFor='remuneration'>remuneration</label>
    <div className="miniforminputdata">
    <select
        id="boardseatType"
        value={remuneration}
        onChange={(e) => setRemuneration(e.target.value)}
      >

      <option value="" disabled>Select remuneration</option>
      <option value="Pro Bono">Pro Bono (Unpaid)</option>
      <option value="$10,000 - $20,000">$10,000 - $20,000</option>
      <option value="$20,000 - $50,000">$20,000 - $50,000</option>
      <option value="$50,000 - $100,000">$50,000 - $100,000</option>
      <option value="$100,000 - $200,000">$100,000 - $200,000</option>
      <option value="$200,000+">$200,000+</option>
      <option value="Equity Based">Equity-Based Compensation</option>
      <option value="Variable Pay">Variable Pay (Performance-Based)</option>
      <option value="Stipend Only">Stipend Only</option>

      </select>
    </div>
    </div> 

      <Inputcomponent 
        inputState={remunerationForRole} 
        setInputState={setRemunerationForRole} 
        label="Remuneration for Role" 
        inputType="text" 
        name="remunerationForRole" 
        id="remunerationForRole" 
      />
    </div>
    </Titleddiv>
        )}

{currentStep === 2 && (
    <Titleddiv title={'Role description and criteria'}>

<div className="miniforminput">
    <label htmlFor='Country'>skillAreas</label>
    <div className="miniforminputdata ">

    <Select
    isMulti
    name="colors"
    options={skillAreas}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={handleChange}
  />
    </div>
    </div> 

   <br />

   <div className="miniforminput">
    <label htmlFor='Country'>Job Description     <Wand size={20} color='#a92f41' className='aigenerate'  onClick={tryai}/> </label>
    <div className="miniforminputdata giant">
<p></p>
 
         <DynamicQuillEditor jobdescriptiondata={jobDescription} setmyJobDescription={setmyJobDescription}  aigenerated={aigenerated}
         
         /> 
    </div>
    </div> 
 
     


    </Titleddiv>
  )}

{currentStep === 3 && (
  <>
  

    <Titleddiv title={'Role Requirements'}>
 <div>
        <h3>Skills</h3>
        {skills.map((skill, index) => (



          <div key={index} className='mfi'>
<div className="miniforminput">
<div className="miniforminputdata">
<input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(event) => handleInputChange(index, event, setSkills, skills)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setSkills, skills)}
              disabled={skills.length === 1}
            >
              Remove
            </button>
    </div>
</div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setSkills, skills)}
        >
          Add Skill
        </button>
      </div>
    </Titleddiv>
    <Titleddiv  title={'Requirements'}>
            <div>
        <h3>Requirements</h3>
        {requirements.map((requirement, index) => (
          <div key={index} className='mfi'>

<div className="miniforminput">
    <div className="miniforminputdata">
         <input
              type="text"
              placeholder="Requirement"
              value={requirement}
              onChange={(event) => handleInputChange(index, event, setRequirements, requirements)}
            />
            
            <button
              type="button"
              onClick={() => handleRemoveField(index, setRequirements, requirements)}
              disabled={requirements.length === 1}
            >
              Remove
            </button>
    </div>
    </div> 

          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setRequirements, requirements)}
        >
          Add Requirement
        </button>
      </div>
    </Titleddiv>

    </>
  )}

{currentStep === 4 && (
<Roledetailbox roleTitle={roleTitle} jobdescriptiondata={myJobDescription} requirements={requirements}  selectedState={selectedState} selectedLga={selectedLga} 
industry={industry} skills={skills}
/>
)} 
      <div className="mybtns">
        {currentStep > 1 && (
          <button className='mybtnwhite' onClick={handleBack}>Back</button>
        )}
        {currentStep < 4 && (
          <button className='mybtn' onClick={handleNext}>Proceed</button>
        )}

    {currentStep == 4 && (
      
          <button className='mybtn' onClick={saveforlater}>Save For Later</button>
        )}

{currentStep == 4 && (
  <PaystackButton className="mybtn blbtn" {...componentProps} />

        )}
      </div>
    <br />
    <br />
    </div>

    </Layout>
  )
}

export default page