import React from 'react';
import Message from './Message';
import './messages.css'; // Import the CSS file

const Messages = ({ messages }) => {
  // If there are no messages, display a message
  if (!messages || messages.length === 0) {
    return <p>Start conversation here!</p>;
  }

  return (
    // Loop through the messages and display them using the Message component
    <div className="messages">
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}
    </div>
  );
};

export default Messages;
