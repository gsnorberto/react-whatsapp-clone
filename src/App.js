import React, {useState, useEffect} from "react";

//style
import './App.css';

//icons
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

//components
import ChatListItem from './components/ChatListItem'

//https://mui.com/pt/components/material-icons/-**//8*          31

export default () => {

   const [chatlist, setChatlist] = useState([{},{},{},{},{},{},{},{},{},{},{},{},{}]);

   return (
      <div className="app-window">

         {/* SIDE BAR */}
         <div className="side-bar">
            <header>
               <img className="header--avatar" src="https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg" alt="" />

               <div className="header--buttons">
                  <div className="header--btn">
                     <DonutLargeIcon style={{color: '#919191'}} />
                  </div>
                  <div className="header--btn">
                     <ChatIcon style={{color: '#919191'}} />
                  </div>
                  <div className="header--btn">
                     <MoreVertIcon style={{color: '#919191'}} />
                  </div>
               </div>
            </header>

            <div className="search">
               <div className="search--input">
                  <SearchIcon fontSize="small" style={{color: '#919191'}} />
                  <input type="search" placeholder="Procurar ou começar uma nova conversa"/>
               </div>
            </div>

            <div className="chat-list">
               {chatlist.map((item, key)=>(
                  <ChatListItem 
                     key={key}
                  />
               ))}
            </div>
         </div>

         {/* CONTENT AREA */}
         <div className="content-area">
            ...
         </div>
      </div>
   );
}