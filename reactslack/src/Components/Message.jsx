import React from 'react';
import Jane from './Assets/Chris.jpg';
import './message.css';

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
    <div className="message">
      <div className="messageInfo">
        <img src={Jane} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Message;
