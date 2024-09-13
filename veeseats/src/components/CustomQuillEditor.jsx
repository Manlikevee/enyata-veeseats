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





const CustomQuillEditor = ({ value, setValue , aigenerated }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'], // Add the image option in the toolbar
          ],
          handlers: {
            image: imageHandler // Custom image handler
          }
        }
      },
      placeholder: 'Write your blog post here...',
    });

    // Handle the Quill content change and update the parent state
    quillRef.current.on('text-change', () => {
      const content = quillRef.current.root.innerHTML;
      setValue(convertToHTML(content));
    });

  }, [setValue]);

  // Custom Image Handler for inserting images via URL
  const imageHandler = () => {
    const imageUrl = prompt('Please enter the image URL');
    if (imageUrl) {
      const range = quillRef.current.getSelection();
      quillRef.current.insertEmbed(range.index, 'image', imageUrl);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.innerHTML = convertToHTML(aigenerated);
    }
  }, [aigenerated]);

  return (
    <div>
      <div ref={editorRef} style={{ height: '400px',  }} />
    </div>
  );
};

export default CustomQuillEditor;
