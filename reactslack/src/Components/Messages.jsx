import React from 'react';
import Message from './Message';


const Messages = ({ messages }) => {
  // If there are no messages, display a message
  if (!messages || messages.length === 0) {
    return <p>Start conversation here!</p>;
  }

  return (
    // Loop through the messages and display them
    <div className="messages">
      {messages.map((msg, index) => (
        // Pass the message
        <Message key={index} msg={msg} />
      ))}
    </div>
  );
};

export default Messages;
