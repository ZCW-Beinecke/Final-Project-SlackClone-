import React from "react";
import Message from "./Message";
import Sidebar from "./Sidebar/sidebar";
import RightSidebar from "./RightSidebar/RightSidebar";
import Header from "./Header"

const Messages = () => {
  return (
    <div className="messages">

      <Message />
      <Sidebar />
      <RightSidebar />
    </div>
  );
};

export default Messages;
