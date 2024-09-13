import React, { useState } from 'react';
import styled from "styled-components";

const Radio = ({ handleStep }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
    
        if (value === 'yes') {
          handleStep(6.46);  // Move to step 6.46 if 'Yes Please' is selected
        } else {
          handleStep(6.5);   // Move to step 6.5 if 'Currently No' is selected
        }
      };

  return (
    <StyledWrapper>
      <div className="radio-buttons-container">
        <div className="radio-button">
          <input
            name="radio-group"
            id="radio2"
            className="radio-button__input"
            type="radio"
            value="yes"
            checked={selectedOption === 'yes'}
            onChange={handleChange}
          />
          <label htmlFor="radio2" className="radio-button__label">
            <span className="radio-button__custom" />
        Yes Please
          </label>
        </div>
        <div className="radio-button">
          <input
            name="radio-group"
            id="radio1"
            className="radio-button__input"
            type="radio"
            value="no"
            checked={selectedOption === 'no'}
            onChange={handleChange}
          />
          <label htmlFor="radio1" className="radio-button__label">
            <span className="radio-button__custom" />
           Currently No
          </label>
        </div>
   
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-buttons-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.radio-button {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-button__label {
  display: inline-block;
  padding-left: 30px;
  margin-bottom: 10px;
  position: relative;
 
  color: var(--subtitle-color3);
    line-height: 1.6em;
    font-size: 13.5px;
    font-family: Plus Jakarta Sans;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.radio-button__custom {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.radio-button__input:checked + .radio-button__label .radio-button__custom {
  transform: translateY(-50%) scale(0.9);
  border: 5px solid #4c8bf5;
  color: #4c8bf5;
}

.radio-button__input:checked + .radio-button__label {
  color: #4c8bf5;
}

.radio-button__label:hover .radio-button__custom {
  transform: translateY(-50%) scale(1.2);
  border-color: #4c8bf5;
  box-shadow: 0 0 10px #4c8bf580;
}


`;

export default Radio;
