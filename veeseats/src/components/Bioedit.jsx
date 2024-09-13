import React, { useEffect, useRef, useState } from 'react';
import TextareaMarkdown from 'textarea-markdown';
import {  toast } from 'sonner'
const Bioedit = ({ biodata, togglebio, axiosInstance }) => {
  const [text, setText] = useState(biodata);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  const handleInputChange = (e) => {
    setText(e.target.value);
    setIsEditing(true); // Set editing flag to true when user starts typing
  };
  useEffect(() => {
    if (textareaRef.current) {
      new TextareaMarkdown(textareaRef.current);
    }
  }, []);

  const updatebio = async () => {
    const payload = {
        bio: text, // Replace with the actual university ID
    };

    if (text) {
        try {
            const response = await axiosInstance.patch('/UserProfileView/', payload);
            toast.success('Biography Updated Successfully!');
            console.log(response.data);
            togglebio();
        } catch (error) {
            toast.error(error.response ? error.response.data.message || 'Error Updated Biography instance' : 'Failed to connect to server');
            console.error(error);
        }
    } else {
        toast.error('Please fill all fields');
    }
};

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm('You have unsaved changes. Do you really want to cancel?')) {
        // Proceed with cancel action
        togglebio(); // Assuming togglebio is used to handle the cancel action
        setIsEditing(false);
      }
    } else {
      // Proceed with cancel action if no changes
      togglebio();
    }
  };

  const handleSave = () => {
    // Save the text here (you may need to pass a save function as a prop)
    setIsEditing(false);
    updatebio();
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isEditing) {
        e.preventDefault();
        e.returnValue = ''; // Standard way to prompt for confirmation
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditing]);

  return (
    <>
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleInputChange}
      cols="30"
      rows="10"
      className="mytextarea"
      placeholder="Enter Your Biography"
    ></textarea>

      <div className="mybtns">
        <button className="mybtnwhite" onClick={handleCancel}>
          Cancel
        </button>
        <button className="mybtn" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default Bioedit;
