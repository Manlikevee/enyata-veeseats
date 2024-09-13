'use client'

import React, { useState } from 'react'

const Checkboxgroup = ({ options, groupName, onChange }) => {
    const [checkedItems, setCheckedItems] = useState([]);
  
    const handleCheckboxChange = (value) => {
      let updatedCheckedItems;
  
      if (value === 'all') {
        if (checkedItems.length === options.length - 1) {
          updatedCheckedItems = [];
        } else {
          updatedCheckedItems = options.filter(option => option.value !== 'all').map(option => option.value);
        }
      } else {
        if (checkedItems.includes(value)) {
          updatedCheckedItems = checkedItems.filter(item => item !== value);
        } else {
          updatedCheckedItems = [...checkedItems, value];
        }
      }
  
      setCheckedItems(updatedCheckedItems);
      onChange(groupName, updatedCheckedItems);
    };
  
    return (
    <>
    {groupName &&( <label className='labels'>{groupName}</label>)}
           
        <div className="checkbox-group">
        {options.map((option) => (
          <div key={option.value} className="checkbox-item">
            <input
              type="checkbox"
              id={`${groupName}-${option.value}`}
              name={groupName}
              value={option.value}
              checked={checkedItems.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            <label htmlFor={`${groupName}-${option.value}`}>{option.label}</label>
          </div>
        ))}
        </div>
    </>

  
    );
  };

export default Checkboxgroup