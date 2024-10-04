'use client'
import React, { useEffect, useState } from 'react';
import TurndownService from 'turndown';

const PlainTextRenderer = ({ content }) => {
  const [plainText, setPlainText] = useState('');

  useEffect(() => {
    // Function to check if the content is HTML
    const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

    let textContent = content;

    // If content is HTML, convert it to Markdown first
    if (isHTML(content)) {
      const turndownService = new TurndownService();
      // Customize Turndown options if needed
      turndownService.keep(['b', 'strong']); // Optionally keep certain tags
      textContent = turndownService.turndown(content);
    }

    // Clean up unwanted characters and remove multiple line breaks
    const cleanedText = textContent
      .replace(/[#_*`~>\[\]]+/g, '') // Remove Markdown symbols
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove any remaining HTML tags
      .replace(/(\r\n|\n|\r){2,}/g, '\n') // Replace multiple line breaks with a single one
      .replace(/^\s*[-]+\s*$/gm, ''); // Remove lines that are just dashes

    setPlainText(cleanedText.trim());
  }, [content]);

  return plainText;
};

export default PlainTextRenderer;
