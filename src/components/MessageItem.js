import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import './MessageItem.css'

export default ({ data, user }) => {
   const [time, setTime] = useState('');

   useEffect(() => {
      if (data.date > 0) {
         //o horário no BD está em segundos
         let d = new Date(data.date.seconds * 1000);
         let hours = d.getHours();
         let minutes = d.getMinutes();

         hours = hours < 10 ? '0' + hours : hours;
         minutes = minutes < 10 ? '0' + minutes : minutes;

         setTime(`${hours}:${minutes}`);
      }
   }, [data]);

   return (
      <div
         className="messageLine"
         style={{
            justifyContent: user.id === data.author ? 'flex-end' : 'flexStart'
         }}
      >
         <div className="messageItem" style={{ backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFFFFF' }}>
            <div className="messageText">{data.body}</div>
            <div className="messageDate">{time}</div>
         </div>
      </div>
   );
}