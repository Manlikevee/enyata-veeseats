'use client'
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const MessageComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher('48ec4ad056af9b749e55', {
      cluster: 'mt1',
    });

    // Subscribe to the channel and event you want to listen to
    const channel = pusher.subscribe('message-channel-258726489452101');
    channel.bind('new-message', (data) => {
      // Update the message list when a new message is received
      setMessages(data.messageserialized.testj);
    });

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []); // Only run this effect once on mount

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.messag}</li> // Assuming 'content' is a field in the message
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;
