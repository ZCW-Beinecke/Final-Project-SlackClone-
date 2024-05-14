import React, { useState, useEffect } from 'react';
import { FaHeadset, FaUserPlus } from 'react-icons/fa';
import Messages from './Messages';
// Library for real-time bidirectional event-based communication.
import io from 'socket.io-client';  

// Establishes a connection to a Socket.IO server running locally on port 9000.
const socket = io.connect('http://localhost:9000');

const Chat = () => {
  // State variable to hold the text of the message being typed.
  const [messageText, setMessageText] = useState('');

  // State variable to hold the current room number.
  const [room, setRoom] = useState('');

  // State variable to hold an array of messages.
  const [messages, setMessages] = useState([]);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const storedJWT = localStorage.getItem('token');
  //   try {
  //     const response = await fetch('http://localhost:8080/api/messages', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${storedJWT}`,
  //       },
  //       body: JSON.stringify({ message: messageText }), // Changed "uploads" to "message"
  //     });
  //     if (!response.ok) {
  //       throw new Error('Error sending message');
  //     }
  //     setMessageText('');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle the error (display a message to the user)
  //   }
  // };

  // Function to join a room.
  const joinRoom = () => {
    if (room.trim() !== '') {
      // Emit a 'join_room' event to the server with the room number.
      socket.emit('join_room', room);
    } else {
      alert('Please enter a room number.');
    }
  };

// Function to send a message.
  const sendMessage = () => {
    if (messageText.trim() !== '') {
      // Emit a 'send_message' event to the server with the message and room number.
      socket.emit('send_message', { message: messageText.trim(), room });
      setMessages(prevMessages => [...prevMessages, messageText.trim()]);
      // Clear the input after sending the message.
      setMessageText(''); 
    } else {
      alert('Please enter a message.');
    }
  };

// useEffect hook to listen for 'receive_message' events from the server.
  useEffect(() => {
    // Function to handle received messages.
    const handleReceiveMessage = data => {
      setMessages(prevMessages => [...prevMessages, data.message]);
    };
// Listen for 'receive_message' events.
    socket.on('receive_message', handleReceiveMessage);

// Clean up the event listener when the component is unmounted.
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, []);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <FaHeadset />
          <FaUserPlus />
        </div>
      </div>
      <Messages messages={messages} />
      <div className="input">
        <input
          placeholder="Room Number..."
          onChange={event => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
        <input
          type="text"
          placeholder="Type something"
          value={messageText}
          onChange={event => {
            setMessageText(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Chat;
