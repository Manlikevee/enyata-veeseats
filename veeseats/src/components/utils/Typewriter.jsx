'use client';

import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50, onDone = () => {} }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else {
      onDone();  // Trigger the callback when typing is complete
    }

    return () => clearTimeout(timeout);  // Cleanup timeout on component unmount or rerun
  }, [index, text, speed, onDone]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
