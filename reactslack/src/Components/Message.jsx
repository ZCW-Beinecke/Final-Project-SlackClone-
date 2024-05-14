import React from 'react';
import Jane from './Assets/Chris.jpg';
import './message.css';
//hi
const Message = ({ msg }) => {
  console.log(msg);
  return (
     <div className="message">
       <div className="messageContent">
         <p>{msg.message}</p>
         <div className="messageInfo">
           <span>{msg.author} - {new Date(msg.timestamp).toLocaleTimeString()}</span>
         </div>
       </div>
     </div>
   );
 };

export default Message;
