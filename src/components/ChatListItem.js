import React from "react";
import './ChatListItem.css';

export default () => {
   return(
      <div className="chatListItem">
         <img className="chatListItem--avatar" src="https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg" alt="" />

         <div className="chatListItem--lines">
            <div className="chatListItem--line">
               <div className="chatListItem--name">Gabriel Norberto</div>
               <div className="chatListItem--date">19:00</div>
            </div>

            <div className="chatListItem--line">
               <div className="chatListItem--lastMsg">
                  <p>Opa, tudo bem? Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?</p>
               </div>
            </div>
         </div>
      </div>
   );
}