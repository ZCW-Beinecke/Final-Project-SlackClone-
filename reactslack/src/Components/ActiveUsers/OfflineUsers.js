import React, { useState, useEffect } from 'react';
import './OfflineUsers.css';

function OfflineUsers({ users }) {
  if (!users || users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <ul className="offline-users">
      {users.map(user => (
        <li key={user.id}>
          <img src={'http://localhost:8080/api/user-profiles/'} alt={user.username + ' profile picture'} />
          <span>{user.username}</span>
        </li>
      ))}
    </ul>
  );
}

export default OfflineUsers;
