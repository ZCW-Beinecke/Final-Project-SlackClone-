import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'; // Import for navigation

const Settings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate(); // Utilize useNavigate hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getUserData(); // Replace with your user data fetching logic
        // setUserData(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setIsLoading(false); // Assuming you have an `isLoading` state for loading indication
      }
    };

    fetchData();
  }, []); // Run on component mount

  const handleInputChange = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      //   await updateUserData(userData); // Replace with your user data update logic
      alert('User data updated successfully!'); // Or display success message
    } catch (err) {
      setError(err.message); // Handle errors
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        // await deleteUserAccount(); // Replace with your user account deletion logic
        // Redirect to login page or handle user deletion appropriately
      } catch (err) {
        setError(err.message); // Handle errors
      }
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear user data, session, etc.)
    // Redirect to login page after logout
    navigate('/');
  };

  return (
    <div className="settings-container">
      {isLoading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} required />
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} required />
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
          <button type="submit">Update Profile</button>
        </form>
      )}
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;
