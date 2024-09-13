'use client'

import React, { useState, useEffect } from 'react';




const SpeechToText = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [voices, setVoices] = useState([]);
  
    const [recognition, setRecognition] = useState(null);
  
    useEffect(() => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Your browser does not support Speech Recognition.');
        return;
      }
  
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
  
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
  
      recognitionInstance.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(' ');
        setTranscript(currentTranscript);
      };
  
      recognitionInstance.onend = () => {
        if (isRecording) {
          recognitionInstance.start();
        }
      };
  
      setRecognition(recognitionInstance);
  
      return () => {
        recognitionInstance.stop();
      };
    }, [isRecording]);
  
    useEffect(() => {
      const handleVoicesChanged = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
  
      handleVoicesChanged();
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }, []);
  
    const handleStart = () => {
      if (recognition) {
        recognition.start();
        setIsRecording(true);
      }
    };
  
    const handleStop = () => {
      if (recognition) {
        recognition.stop();
        setIsRecording(false);
      }
    };
  
    // Function to preprocess spoken text
    const preprocessText = (text) => {
      return text
        .replace(/ dot /g, '.')
        .replace(/ comma /g, ',')
        .replace(/ exclamation mark /g, '!')
        .replace(/ question mark /g, '?')
        .replace(/ colon /g, ':')
        .replace(/ semicolon /g, ';')
        .replace(/ left parenthesis /g, '(')
        .replace(/ right parenthesis /g, ')')
        .replace(/ quote /g, '"')
        .replace(/ apostrophe /g, "'")
        .replace(/ new line /g, '\n')
        .replace(/\s\s+/g, ' '); // Replace multiple spaces with a single space
    };
  
    const handlePlayback = () => {
      if (transcript) {
        const processedText = preprocessText(transcript);
        const utterance = new SpeechSynthesisUtterance(processedText);
        utterance.rate = 0.8; // Set rate (0.1 to 10)
        utterance.voice = voices.find(voice => voice.name === 'Google UK English Male'); // Replace with your desired voice name
        window.speechSynthesis.speak(utterance);
      }
    };
  
    return (
      <div>
        <h2>Speech to Text with Playback</h2>
        <button onClick={isRecording ? handleStop : handleStart}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button onClick={handlePlayback} disabled={!transcript}>
          Play Text
        </button>
        <textarea
          rows="10"
          cols="50"
          value={preprocessText(transcript)}
          readOnly
          placeholder="Your words will appear here..."
        ></textarea>
      </div>
    );
  };
  
  export default SpeechToText;