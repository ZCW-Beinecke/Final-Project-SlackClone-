import React from 'react';
import Chat from '../Chat';
import './MainComponent.css';
import SideBar from '../Sidebar/sidebar.jsx';
import RightSideBar from '../RightSidebar/RightSidebar.jsx';

const home = () => {
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <Chat />
        <RightSideBar />
      </div>
    </div>
  );
};

export default home;
