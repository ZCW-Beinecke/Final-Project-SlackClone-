import React, { useState, useEffect } from 'react';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return <div>{renderUsers()}</div>;
};

export default OnlineUsers;
