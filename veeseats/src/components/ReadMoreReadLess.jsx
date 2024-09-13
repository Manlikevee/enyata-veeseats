'use client'
import React, { useState, useRef, useEffect } from 'react';


const ReadMoreReadLess = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (str, num) => {
    return str.length > num ? str.slice(0, num) + '...' : str;
  };

  return (
    <div className="read-more-read-less">
      <div className="content-wrapper">
        <p>
          {isExpanded ? text : truncateText(text, 300)}
        </p>
        {text.length > 300 && (
          <button onClick={toggleReadMore} className="toggle-button">
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
      {isExpanded && (
        <div ref={contentRef} className="content-full" style={{ height: contentHeight }}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default ReadMoreReadLess;
