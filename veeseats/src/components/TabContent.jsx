'use client'
import React, { useState } from "react";


const TabContent = () => {
  const [activeTab, setActiveTab] = useState("preview1");

  const handleTabClick = (target) => {
    setActiveTab(target);
  };

  return (
    <div className="explanationbox">
      <div className="explanationboxone" id="leftContainer">
        <div
          className={`tabone leftDiv ${activeTab === "preview1" ? "activeboxs" : ""}`}
          data-target="preview1"
          onClick={() => handleTabClick("preview1")}
        >
<div className="tabtitle">
  <div className="tablogo">
    <span className="material-symbols-outlined">school</span>
  </div>
  <div className="articlename">Interview Preparation</div>
</div>
<div className="story">
  Master your interviews with VeeSeats' interview prep tools. Get personalized mock interviews, questions tailored to your industry, and expert tips to help you land your dream role.
</div>
        </div>

        <div
          className={`tabone leftDiv ${activeTab === "preview2" ? "activeboxs" : ""}`}
          data-target="preview2"
          onClick={() => handleTabClick("preview2")}
        >
<div className="tabtitle">
  <div className="tablogo">
    <span className="material-symbols-outlined">group_add</span>
  </div>
  <div className="articlename">Job Referral System</div>
</div>
<div className="story">
  Leverage our job referral system to get introduced to potential employers. VeeSeats connects you with professionals who can refer you for the perfect job, boosting your chances of getting hired.
</div>
        </div>

        <div
          className={`tabone leftDiv ${activeTab === "preview3" ? "activeboxs" : ""}`}
          data-target="preview3"
          onClick={() => handleTabClick("preview3")}
        >
<div className="tabtitle">
  <div className="tablogo">
    <span className="material-symbols-outlined">description</span>
  </div>
  <div className="articlename">Modern Profile and Resume System</div>
</div>
<div className="story">
  Build a modern, sleek profile and resume on VeeSeats. Our platform helps you showcase your skills and experiences in a visually appealing way, making you stand out to employers.
</div>
        </div>
      </div>

      <div className="explanationsolution" id="rightContainer">
        <div className={`expsolbox rightDiv  ${activeTab === "preview1" ? "activeboxs" : ""}`} id="preview1">
          <img
            src="/iPhone-13-PRO-MAX-localhost.png"
            alt="Income Tracker Image 1"
            className="mobile"
          />


       <img
            src="/macbook.png"
            alt="Crypto Connection Image"
            className="desktop"
          />
        </div>

        <div className={`expsolbox rightDiv  ${activeTab === "preview2" ? "activeboxs" : ""}`} id="preview2">
          <img
            src="/cc.png"
            alt="Automated Invoicing Image"
            className="mobile"
          />
                   <img
            src="/mb3.png"
            alt="Income Tracker Image 1"
            className=" desktop" 
          />
        </div>

        <div className={`expsolbox rightDiv  ${activeTab === "preview3" ? "activeboxs" : ""}`} id="preview3">
        <img
            src="/mb2.png"
            alt="Income Tracker Image 1"
          className="desktop"
          />
                    <img
            src="/cc.png"
            alt="Automated Invoicing Image"
            className="mobile"
          />
        </div>
      </div>
    </div>
  );
};

export default TabContent;
