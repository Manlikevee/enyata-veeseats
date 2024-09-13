import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TurndownService from 'turndown';

const MarkdownWithHTML = ({ content }) => {
  const [markdownContent, setMarkdownContent] = useState(content);

  useEffect(() => {
    // Function to check if the content is HTML
    const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

    // If content is HTML, convert it to Markdown
    if (isHTML(content)) {
      const turndownService = new TurndownService();
      const convertedMarkdown = turndownService.turndown(content);
      setMarkdownContent(convertedMarkdown);
    }
  }, [content]);

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

export default MarkdownWithHTML;
