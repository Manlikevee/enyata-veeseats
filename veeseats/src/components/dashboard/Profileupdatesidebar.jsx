'use client'

import React, { useContext } from 'react';
import { VeeContext } from '../context/Chatcontext';

const steps = [
  { id: 1, icon: 'badge', title: 'Personal Details Update', story: 'Update your personal information, including leadership and board experience.' },
  { id: 2, icon: 'backpack', title: 'Educational History', story: 'Provide details on your academic background and qualifications.' },
  { id: 3, icon: 'work', title: 'Work Experience', story: 'Outline your professional experience and career milestones.' },
  { id: 4, icon: 'account_balance_wallet', title: 'Plans And Pricing', story: 'Choose the appropriate plan and pricing that fits your needs.' },
  { id: 5, icon: 'sync_saved_locally', title: 'Save', story: 'Review and save your updates for future reference.' }
];

const ProfileUpdateSidebar = () => {
  const { currentStep } = useContext(VeeContext);

  return (
    <div className="sidebardatasflex">
      {steps.map(step => (
        <div key={step.id} className={`${currentStep === step.id ? 'activestep' : ''}`}>
          <div className={`dashflex ${currentStep === step.id ? 'active' : ''}`}>
            <div className="dashflexicon">
              <span className="material-symbols-outlined">{step.icon}</span>
            </div>
            <div className="dashflextext">{step.title}</div>
          </div>
          <small className="storysmall">{step.story}</small>
        </div>
      ))}
    </div>
  );
};

export default ProfileUpdateSidebar;
