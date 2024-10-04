'use client'
import React from "react";
import styled from "styled-components";

const Cookieconcent = () => {
  return (
    <StyledWrapper>
      <div className="cookie-card">
        <span className="title">&#127850; Cookie Notice</span>
        <p className="description">
          We use cookies to ensure that we give you the best experience on our
          website. <a href="#">Read cookies policies</a>.{" "}
        </p>
        <div className="actions">
          <button className="pref">Manage your preferences</button>
          <button className="accept">Accept</button>
        </div>
      </div>
    </StyledWrapper>
  )
}
const StyledWrapper = styled.div`
  .cookie-card {
  max-width: 40%;
  border: 1px solid #ddd;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
margin: auto;
position: relative;
}

.title {
  font-weight: 600;
  color: rgb(31 41 55);
}

.description {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(75 85 99);
}

.description a {
  --tw-text-opacity: 1;
  color: rgb(59 130 246);
}

.description a:hover {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  -moz-column-gap: 1rem;
  column-gap: 1rem;
  flex-shrink: 0;
}

.pref {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(31 41 55 );
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background-color: transparent;
}

.pref:hover {
  color: rgb(156 163 175);
}

.pref:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.accept {
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: rgb(17 24 39);
  font-weight: 500;
  border-radius: 0.5rem;
  color: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  border: none;
  transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
}

.accept:hover {
  background-color: rgb(55 65 81);
}

.accept:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
`;
export default Cookieconcent