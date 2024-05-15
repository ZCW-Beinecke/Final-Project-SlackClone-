import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authenticatedUsername = localStorage.getItem('authenticatedUsername');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user-profiles/user/${authenticatedUsername}`);
        if (!response.ok) {
          throw new Error('Failed to fetch User Profile');
        }
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error('Empty response or invalid format');
        }

        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const renderUserData = () => {
    if (isLoading) {
      return <p>Loading User Profile...</p>;
    } else if (error) {
      return <p>Error: {error}</p>;
    } else if (!userProfile) {
      return <p>No user profile found.</p>;
    } else {
      const { fullName, phone, user } = userProfile;
      const { email, createdDate } = user;
const formattedCreatedDate = new Date(createdDate).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
      return (
        <div className="online-users-container">
          <div className="user-card">
            <p><u>Full Name:</u> {fullName}</p>
            <p><u>Username:</u> {authenticatedUsername}</p>
            <p><u>Email:</u> {email}</p>
            <p><u>Phone:</u> {phone}</p>
            <p><u>Created Date:</u> {formattedCreatedDate}</p>
          </div>
        </div>
      );
    }
  };

  return <div>{renderUserData()}</div>;
};

export default UserProfile;
