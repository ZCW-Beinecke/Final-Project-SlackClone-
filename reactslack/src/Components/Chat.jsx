import React, { useState, useEffect } from 'react';
import { FaHeadset, FaUserPlus } from 'react-icons/fa';
import Messages from './Messages';
// Library for real-time bidirectional event-based communication.
import io from 'socket.io-client';
let currentChannelName = '';

// Establishes a connection to a Socket.IO server running locally on port 9000.
const socket = io.connect('http://localhost:9000');

const Chat = () => {
  // State variable to hold the text of the message being typed.
  const [messageText, setMessageText] = useState('');

  // State variable to hold the current room number.
  const [room, setRoom] = useState('');

  // State variable to hold an array of messages.
  const [messages, setMessages] = useState([]);
  // Function to join a room.
  const joinRoom = async (roomNo, roomName) => {
    setRoom(roomNo);
    if (room.trim() !== '') {
      currentChannelName = roomName;
      console.log(localStorage.getItem('authenticatedUsername'));
      // Emit a 'join_room' event to the server with the room number.
      socket.emit('join_room', room);
      const token = localStorage.getItem('token');
      const users = await fetch(`http://localhost:8080/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!users.ok) {
        throw new Error(`HTTP error! status: ${users.status}`);
      }
      const usersArray = await users.json();
      const usersMap = {};

      usersArray.forEach(user => {
        usersMap[user.id] = user.login;
      });

      const response = await fetch(`http://localhost:8080/api/messages/channel/${room}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const oldMessages = await response.json();
      console.log(oldMessages);
      const formattedOldMessages = oldMessages.map(msg => ({
        message: msg.uploads, // replace 'messageText' with the actual property name in the old message object
        author: usersMap[msg.userProfile.id], // replace 'author' with the actual property name in the old message object
        timestamp: msg.timestamp, // replace 'timestamp' with the actual property name in the old message object
      }));
      setMessages(prevMessages => [...prevMessages, ...formattedOldMessages]);
      // } else {
      //   alert('Please enter a room number.');
    }
  };

  // Function to send a message.
  const sendMessage = async () => {
    if (messageText.trim() !== '') {
      const author = localStorage.getItem('authenticatedUsername');
      const token = localStorage.getItem('token');

      const response1 = await fetch(`http://localhost:8080/api/admin/users/${author}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response1.ok) {
        throw new Error(`HTTP error! status: ${response1.status}`);
      }
      const authorData = await response1.json();
      console.debug(authorData);
      const userID = authorData.id;

      const timestamp = Date.now(); // Current timestamp in milliseconds
      // Emit a 'send_message' event to the server with the message, author, timestamp, and room number.
      socket.emit('send_message', { message: messageText.trim(), author, timestamp, room });
      // Post the message to the db
      // const token = localStorage.getItem('token'); //duplicate
      let roomint = Number(room);
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          uploads: messageText.trim(),
          timestamp: timestamp,
          pinned: 0,
          channel: {
            id: roomint,
          },
          userProfile: {
            id: userID,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMessages(prevMessages => [...prevMessages, { message: messageText.trim(), author, timestamp }]);
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
      const { message, author, timestamp } = data;
      console.log('Received Message:', { message, author, timestamp });
      setMessages(prevMessages => [...prevMessages, { message, author, timestamp }]);
    };
    // Listen for 'receive_message' events.
    socket.on('receive_message', handleReceiveMessage);
    console.log(handleReceiveMessage);

    // Clean up the event listener when the component is unmounted.
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      console.log(handleReceiveMessage);
    };
  }, []);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{currentChannelName}</span>
        <div className="chatIcons">
          <FaHeadset />
          <FaUserPlus />
        </div>
      </div>
      <Messages messages={messages} />
      <div className="input">
        {/* <input
          placeholder="Room Number..."
          onChange={event => {
            setRoom(event.target.value);
          }}
        /> */}
        <button onClick={() => joinRoom('1', 'General')}>Join Room</button>
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
