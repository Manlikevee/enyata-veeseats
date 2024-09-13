import React from 'react'
import ReadMoreArea from "@foxeian/react-read-more";
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { Mail, Phone, MapPin } from 'lucide-react'; 
const buttonStyle = {
    color: "#0275B1",
    width: "fit-content",
    textdecoration: "none",
    padding: 0,
  };
  const areasOfExpertise = [
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
    "Mobile App Development",
    "Data Science",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Machine Learning",
    "Blockchain Technology",
  ];
const Templateone = () => {
  return (
    <div className='tempgap'>
     
        <br />
        <div className="bbbox">
        Rosemarie Soto, Web-Designer
        </div>

        <div className="growsub">
        2207 Beach Avenue, Los Angeles, rosemariesoto@email.com, (914) 479-6342
        </div>

        <div className="contact-info story">
      <div className="contact-item">
        <Mail className="contact-icon" />
        <span>Email: example@example.com</span>
      </div>
      <div className="contact-item">
        <Phone className="contact-icon" />
        <span>Phone: +1234567890</span>
      </div>
      <div className="contact-item">
        <MapPin className="contact-icon" />
        <span>Address: 123 Main St, City, Country</span>
      </div>
    </div>

        <div className="socialmedia">
        <div className="social" >   <Twitter /> </div>
        <div className="social" >      <Linkedin  /> </div>
        <div className="social" >   <Instagram /> </div>
      </div>
        <div className="demar">
            
        </div>
  
        <div className="resumeflexs">
            <div className="rflxone">
                <div className="bbbox">
                    Profile
                </div>
            </div>

            <div className="rflxtwo">
                <div className="story">

                <ReadMoreArea
             style={{ display: "block", flexDirection: "column" }} // inline styles of main div
             expandLabel="See more" // Expand Label
             collapseLabel="See less" // Collapse Label
             buttonStyle={buttonStyle} // inline styles of button
             lettersLimit={850} // limit of letters (100 letters)
           >
  Graphic designer with +8 years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as well as sketching and hand drawing. Supervised 23 print design projects that resulted in an increase of 32% in savings. I'm Victor Odah, a passionate web developer with an unwavering enthusiasm for creating impactful digital products. My journey in web development is not just a career; it's a lifelong pursuit of mastery and innovation. I thrive on the challenge of turning ideas into functional, beautifully designed web applications that solve real-world problems and enhance user experiences. From the moment I wrote my first line of code, I was captivated by the endless possibilities that technology offers. This curiosity drives me to constantly explore new tools, frameworks, and technologies. Whether it's diving into the latest front-end libraries or understanding the nuances of backend architecture, I am always eager to learn and adapt. I believe that staying on the cutting edge of technology is essential in our rapidly evolving industry, and I make it a point to be well-versed in the latest trends and best practices. But for me, it's not just about keeping up with technology—it's about pushing the boundaries of what can be achieved. I am deeply committed to continuous improvement, both in my technical abilities and in my approach to problem-solving. Every project I work on is an opportunity to refine my skills, learn something new, and elevate my craft. I am driven by a desire to be better today than I was yesterday, and this mindset fuels my growth as a developer. Collaboration and communication are also central to my work. I believe that the best products are built when great minds come together, and I enjoy working with others who share my passion for technology and innovation. Whether I'm contributing to a team project or leading an initiative, I bring a positive, can-do attitude and a dedication to excellence that inspires those around me. Looking ahead, I am excited about the future of web development and the endless possibilities it holds. My ultimate goal is to continue growing as a developer, taking on more challenging projects, and making a meaningful impact in the tech world. I am confident that with my drive, determination, and love for what I do, I will achieve great things and help shape the future of technology.
</ReadMoreArea>

              
                </div>
            </div>
        </div>

        <div className="demar">
            
        </div>
        <div className="rflxones">
                <div className="bbbox">
                    Education
                </div>
            </div>
        <div className="resumeflexs">
            <div className="rflxone">
                <div className="lighttitle">
                Nov 2005 — Sep 2010
                </div>
            </div>

            <div className="rflxtwo">
                <div className="story">
<div className="schoolflx">
    <div className="schname">Los Angeles University</div>
    <div className="schoolcourse">Bachelor of Fine Arts in Graphic Design, GPA: 3.4/4.0</div>
</div>

              
                </div>
            </div>
        </div>

        <div className="resumeflexs">
            <div className="rflxone">
                <div className="lighttitle">
                Nov 2005 — Sep 2010
                </div>
            </div>

            <div className="rflxtwo">
                <div className="story">
<div className="schoolflx">
    <div className="schname">Los Angeles University</div>
    <div className="schoolcourse">Bachelor of Fine Arts in Graphic Design, GPA: 3.4/4.0</div>
</div>

              
                </div>
            </div>
        </div>


        <div className="demar">
            
        </div>
        <div className="rflxones">
                <div className="bbbox">
                Employment
                </div>
            </div>
        <div className="resumeflexs">



            <div className="rflxone">
            <div className="lighttitle">
                Nov 2005 — Sep 2010
                </div>
            </div>

            <div className="rflxtwo">
                <div className="story">


                    
                <div className="schname">UI Designer at Market Studios</div>
                <ReadMoreArea
             style={{ display: "block", flexDirection: "column" }} // inline styles of main div
             expandLabel="See more" // Expand Label
             collapseLabel="See less" // Collapse Label
             buttonStyle={buttonStyle} // inline styles of button
             lettersLimit={850} // limit of letters (100 letters)
           >
  Graphic designer with +8 years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as well as sketching and hand drawing. Supervised 23 print design projects that resulted in an increase of 32% in savings. I'm Victor Odah, a passionate web developer with an unwavering enthusiasm for creating impactful digital products. My journey in web development is not just a career; it's a lifelong pursuit of mastery and innovation. I thrive on the challenge of turning ideas into functional, beautifully designed web applications that solve real-world problems and enhance user experiences. From the moment I wrote my first line of code, I was captivated by the endless possibilities that technology offers. This curiosity drives me to constantly explore new tools, frameworks, and technologies. Whether it's diving into the latest front-end libraries or understanding the nuances of backend architecture, I am always eager to learn and adapt. I believe that staying on the cutting edge of technology is essential in our rapidly evolving industry, and I make it a point to be well-versed in the latest trends and best practices. But for me, it's not just about keeping up with technology—it's about pushing the boundaries of what can be achieved. I am deeply committed to continuous improvement, both in my technical abilities and in my approach to problem-solving. Every project I work on is an opportunity to refine my skills, learn something new, and elevate my craft. I am driven by a desire to be better today than I was yesterday, and this mindset fuels my growth as a developer. Collaboration and communication are also central to my work. I believe that the best products are built when great minds come together, and I enjoy working with others who share my passion for technology and innovation. Whether I'm contributing to a team project or leading an initiative, I bring a positive, can-do attitude and a dedication to excellence that inspires those around me. Looking ahead, I am excited about the future of web development and the endless possibilities it holds. My ultimate goal is to continue growing as a developer, taking on more challenging projects, and making a meaningful impact in the tech world. I am confident that with my drive, determination, and love for what I do, I will achieve great things and help shape the future of technology.
</ReadMoreArea>

              
                </div>
            </div>
        </div>

        <div className="demar">
            
        </div>
  
        <div className="resumeflexs">
            <div className="rflxone">
            <div className="bbbox">
              Skills
                </div>
            </div>

            <div className="rflxtwo">
                <div className="story">

                <div className="skillgrid">
             {areasOfExpertise.map((expertise, index) => (
               <div key={index} className="skillcard">
                 {expertise}
               </div>
             ))}
           </div>
              
                </div>
            </div>
        </div>
    </div>
  )
}

export default Templateone