import userEvent from "@testing-library/user-event";
import React from "react";
import './MessageItem.css'

export default ({data, user}) => {
   return(
      <div 
         className="messageLine"
         style={{
            justifyContent: user.id === data.author ? 'flex-end' : 'flexStart'
         }}
      >
         <div className="messageItem">
            <div className="messageText">{data.body}</div>
            <div className="messageDate">19:00</div>
         </div>
      </div>
   );
}