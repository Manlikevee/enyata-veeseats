"use client";
import React, { useState, useContext, useEffect } from "react";
import { VeeContext } from "@/components/context/Chatcontext";
import axios from 'axios';

const FileUpload = () => {
    const { axiosInstance } = useContext(VeeContext);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');
    const [refId, setRefId] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage(''); // Clear previous messages

        if (!file) {
            setResponseMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf_file', file);

        try {
            const response = await axiosInstance.post('/upload-pdf/', formData, {
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percent = Math.round((event.loaded * 100) / event.total);
                        setProgress(percent);
                    }
                }
            });

            const { ref_id: responseRefId } = response.data;
            setRefId(responseRefId);
            setResponseMessage('File uploaded successfully. Parsing in progress...');

        } catch (error) {
            setResponseMessage('There was an error uploading the file.');
            console.error('Upload error:', error);
        }
    };

    useEffect(() => {
        let pollInterval;

        if (refId) {
            pollInterval = setInterval(async () => {
                try {
                    const statusResponse = await axiosInstance.get(`/check-status/${refId}/`);
                    const { is_parsed, parsed_data: jsonResponse } = statusResponse.data;

                    if (is_parsed) {
                        clearInterval(pollInterval); // Stop polling

                        // Remove the ```json markers if present
                        let cleanedResponse = jsonResponse;
                        if (cleanedResponse.includes('```json')) {
                            cleanedResponse = cleanedResponse.replace(/```json/g, '').replace(/```/g, '');
                        }

                        try {
                            const parsedData = JSON.parse(cleanedResponse);
                            const formattedJson = JSON.stringify(parsedData, null, 2);
                            setResponseMessage(formattedJson);
                        } catch (parseError) {
                            setResponseMessage('Error parsing JSON response.');
                            console.error('Parsing error:', parseError);
                        }
                    }
                } catch (error) {
                    console.error('Error checking parsing status:', error);
                }
            }, 5000); // Poll every 5 seconds
        }

        return () => clearInterval(pollInterval); // Cleanup on component unmount

    }, [refId, axiosInstance]);

    return (
        <div className="uploaddiv">
            <h3>Upload PDF File</h3>
            <p></p>
            <p className="overview-text-subheader">
            You can also try out our AI CV parser, which reads your CV and auto-populates your profile information for a faster setup.
            </p>
            
            <div className="overview-text-subheader">
            {progress > 0 && (
                <div style={{ marginTop: '10px' }}>
                    <progress value={progress} max="100" style={{ width: '100%' }}></progress>
                    <p>Upload Progress: {progress}%</p>
                </div>
            )}
            {responseMessage && (
                <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
                    {responseMessage}
                </pre>
            )}
            </div>
            <form onSubmit={handleSubmit}>
<br />
            <div className="miniforminput">
    <label htmlFor='Country'>PDF</label>
    <div className="miniforminputdata">

    <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                />
    </div>
    </div> 


             

                    <div className="mybtns">
    
  
   

          <button className='mybtn' >Save</button>


  
      
     
    


      </div>

            </form>

        </div>
    );
};

export default FileUpload;
