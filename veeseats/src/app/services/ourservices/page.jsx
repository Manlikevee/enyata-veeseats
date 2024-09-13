"use client";
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import ReadMoreArea from "@foxeian/react-read-more";
import Servicebox from "@/components/dashboard/Servicebox";

const services = [
    {
      pageTitle: "Web Development",
      imageUrl: "/6963.jpg",
      sectionTitle: "Our Web Development Services",
      sectionBody: "We provide cutting-edge web development services using the latest technologies We provide cutting-edge web development services using the latest technologies.  We provide cutting-edge web development services using the latest technologies. We provide cutting-edge web development services using the latest technologies. We provide cutting-edge web development services using the latest technologies. We provide cutting-edge web development services using the latest technologies. We provide cutting-edge web development services using the latest technologies. We provide cutting-edge web development services using the latest technologies. We provide cutting-edge web development services using the latest technologies.",
      sectionList: [
        "Responsive Design",
        "E-commerce Solutions",
        "Custom Web Applications",
      ],
      requestId: `REQ${Math.floor(Math.random() * 100000)}`,
    },
    {
      pageTitle: "Mobile App Development",
      imageUrl: "/7566.jpg",
      sectionTitle: "Our Mobile App Development Services",
      sectionBody: "We create user-friendly mobile applications for both Android and iOS platforms.",
      sectionList: [
        "iOS App Development",
        "Android App Development",
        "Cross-platform Solutions",
      ],
      requestId: `REQ${Math.floor(Math.random() * 100000)}`,
    },
    {
      pageTitle: "UI/UX Design",
      imageUrl: "/b(1).png",
      sectionTitle: "Our UI/UX Design Services",
      sectionBody: "We design intuitive and engaging user interfaces for web and mobile applications.",
      sectionList: [
        "Wireframing & Prototyping",
        "User Research",
        "Visual Design",
      ],
      requestId: `REQ${Math.floor(Math.random() * 100000)}`,
    },
    {
      pageTitle: "Interview Prep Feature",
      imageUrl: "/serv.png",
      sectionTitle: "Interview Prep Feature",
      sectionBody: "Veeseats’ Interview Prep feature scans users’ profiles to extract key information and generate tailored interview questions. By analyzing the details of a user’s experience, skills, and career goals, the feature creates relevant and personalized questions that align with their background.",
      sectionList: [
        "Ai Interview",
      ],
      requestId: `REQ${Math.floor(Math.random() * 100000)}`,
    },

  ];

const page = () => {
  return (
    <Layout>
{/* <div className="dashboard">
<p></p>
         <h3></h3>
</div> */}
<br />

     <div className="dashboard gaptransiton">

         {services.map((service, index) => (
         <Servicebox
         key={index}
         pageTitle={service.pageTitle}
         imageUrl={service.imageUrl}
         sectionTitle={service.sectionTitle}
         sectionBody={service.sectionBody}
         sectionList={service.sectionList}
         requestId={service.requestId}


         />
         ))}
</div>
    </Layout>
  )
}

export default page