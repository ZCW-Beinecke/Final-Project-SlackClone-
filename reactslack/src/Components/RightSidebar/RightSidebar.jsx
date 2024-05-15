import React, { useState, useEffect } from 'react';
import Settings from '../Settings/settings';
import Users from '../Users/users';
import Profile from '../UserProfileData/userprofiledata';
import './RightSidebar.css'; // Assuming the CSS file remains the same

const user = localStorage.getItem('authenticatedUsername');

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const handleTabChange = tabName => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        const url = ''; //await fetchUserProfilePicture(); // Replace with your logic to fetch URL
        setProfilePictureUrl(url);
      } catch (err) {
        console.error('Error fetching profile picture:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfilePicture();
  }, []);

  return (
    <div className="right-side-bar">
      <div className="user-profile">
        {loading ? (
          <div className="profile-placeholder">Loading...</div>
        ) : profilePictureUrl ? (
          <img src={profilePictureUrl} alt="User Profile" />
        ) : (
          <div className="profile-placeholder">User</div>
        )}
        <h2>{user}</h2>
      </div>
      <ul className="right-sidebar-tabs">
        <li className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTabChange('Profile')}>
          Profile
        </li>
        <li className={activeTab === 'Settings' ? 'active' : ''} onClick={() => handleTabChange('Settings')}>
          Settings
        </li>
        <li className={activeTab === 'Users' ? 'active' : ''} onClick={() => handleTabChange('Users')}>
          Users
        </li>
      </ul>
      {activeTab === 'Profile' && <Profile />}
      {activeTab === 'Settings' && <Settings />}
      {activeTab === 'Users' && <Users />}
    </div>
  );
};

export default RightSidebar;
