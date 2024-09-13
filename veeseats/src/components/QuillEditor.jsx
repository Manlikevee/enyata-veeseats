import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Marked } from 'marked';


function convertToHTML(markdown) {
  let html = markdown;

  // Convert headings (##) to <h2>
  html = html?.replace(/^##\s(.+)/gm, '<h2>$1</h2>');

  // Convert bold text (**text**) to <strong>
  html = html?.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert bullet points (*) to <li> and wrap them with <ul>
  html = html?.replace(/^\*\s(.+)/gm, '<li>$1</li>');


  // Convert paragraph breaks (double newlines) to <p>
  html = html?.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>'; // Wrap the entire content in a <p> tag

  return html;
}

const QuillEditor = ({jobdescriptiondata, setmyJobDescription, aigenerated}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null); // Use a ref to store the quill instance

  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
    });

    const quill = quillRef.current;

    // Optional: Add an event listener for text change
    quill.on('text-change', () => {
      console.log(quill.getContents());
      setmyJobDescription(quill.root.innerHTML);
    });

    // Set the initial content of the editor
    let htmlContent = jobdescriptiondata;
    quill.root.innerHTML = convertToHTML(htmlContent);

    // Cleanup function to destroy the quill instance
    return () => {
      quill.off('text-change');
    };
  }, [jobdescriptiondata, setmyJobDescription]);

  // Update Quill editor content when aigeneratedcontent changes
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.innerHTML = convertToHTML(aigenerated);
    }
  }, [aigenerated]);

  return (
    <div>
      <div ref={editorRef} style={{ height: '400px' }}>


      {jobdescriptiondata}


        
      </div>
    </div>
  );
};

export default QuillEditor;
