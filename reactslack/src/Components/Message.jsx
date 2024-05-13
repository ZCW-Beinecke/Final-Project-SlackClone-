
import React from 'react';
import Jane from './Assets/Chris.jpg';

const Message = ({ msg }) => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img src={Jane} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{msg}</p>

import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FaImage, FaCloudUploadAlt } from 'react-icons/fa';
//import './Message.css'; // Assuming you have a CSS file for styling
const socket = io.connect('http://localhost:9000');
const Message = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedJWT = localStorage.getItem('token');
    console.log('------->TOKEN ', storedJWT);
    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedJWT}`,
        },
        body: JSON.stringify({ uploads: messageText }),
      });
      if (!response.ok) {
        throw new Error('Error sending message');
      }
      setMessageText('');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error (display a message to the user)
    }
  };
  const [room, setRoom] = useState('');
  const joinRoom = () => {
    if (room.trim() !== '') {
      socket.emit('join_room', room);
    } else {
      alert('Please enter a room number.');
    }
  };
  const sendMessage = () => {
    if (messageText.trim() !== '') {
      socket.emit('send_message', { message: messageText, room });
      setMessages((prevMessages) => [...prevMessages, { text: messageText, fromMe: true }]);
      setMessageText('');
    } else {
      alert('Please enter a message.');
    }
  };
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, { text: data.message, fromMe: false }]);
    };
    socket.on('receive_message', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, []);
  return (
    <div className="message-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromMe ? 'message from-me' : 'message from-others'}>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="input">
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
        <input
          type="text"
          placeholder="Type something"
          value={messageText}
          onChange={(event) => {
            setMessageText(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>

      </div>
    </div>
  );
};

export default Message;
