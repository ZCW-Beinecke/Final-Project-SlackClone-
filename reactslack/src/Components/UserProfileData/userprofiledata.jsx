import React, { useState, useEffect } from 'react';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(true); // Add showUsers state

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user-profiles');
        if (!response.ok) {
          throw new Error('Failed to fetch online users');
        }
        const data = await response.json();
        setOnlineUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOnlineUsers();
  }, []);

  const renderUsers = () => {
    if (!showUsers) {
      return null; // Don't render anything if showUsers is false
    }
    if (isLoading) {
      return <p>Loading online users...</p>;
    } else if (error) {
      return <p>Error: {error}</p>;
    } else {
      return (
        <div className="online-users-container">
          {onlineUsers.map((user, index) => (
            <div className="user-card" key={index}>
              <p>{user.fullName}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  const handleButtonClick = () => {
    setShowUsers(false); // Set showUsers to false when the button is clicked
  };

  return (
    <div>

    </div>
  );
};

export default OnlineUsers;
