import React, { useState, useEffect } from "react";

//style
import './App.css';

//icons
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

//components
import ChatListItem from './components/ChatListItem'
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow"
import NewChat from "./components/NewChat";
import Login from "./components/Login";

//Api
import Api from "./Api";

//https://mui.com/pt/components/material-icons/-**//8*          31

export default () => {
    const [activeChat, setActiveChat] = useState({});
    const [showNewChat, setShowNewChat] = useState(false);

    const [user, setUser] = useState({
        id: '3aqmvzmt42cWUg8McfeWUXU5N5k1',
        name: 'Gabriel Norbertto',
        avatar: 'https://graph.facebook.com/4486931294741430/picture'
    });

    const [chatlist, setChatlist] = useState([ ]);

    const handleNewChat = () => {
        setShowNewChat(true);
    }

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        };

        await Api.addUser(newUser);

        setUser(newUser);
    }

    if(user === null){
        return(<Login onReceive={handleLoginData}/>)
    }

    return (
        <div className="app-window">

            {/* SIDE BAR */}
            <div className="side-bar">
                <NewChat
                    chatlist={chatlist}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />

                <header>
                    <img className="header--avatar" src={user.avatar} alt="" />

                    <div className="header--buttons">
                        <div className="header--btn">
                            <DonutLargeIcon style={{ color: '#919191' }} />
                        </div>
                        <div onClick={handleNewChat} className="header--btn">
                            <ChatIcon style={{ color: '#919191' }} />
                        </div>
                        <div className="header--btn">
                            <MoreVertIcon style={{ color: '#919191' }} />
                        </div>
                    </div>
                </header>

                <div className="search">
                    <div className="search--input">
                        <SearchIcon fontSize="small" style={{ color: '#919191' }} />
                        <input type="search" placeholder="Procurar ou começar uma nova conversa" />
                    </div>
                </div>

                <div className="chat-list">
                    {chatlist.map((item, key) => (
                        <ChatListItem
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatlist[key].chatId}
                            onClick={() => setActiveChat(chatlist[key])}
                        />
                    ))}
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="content-area">
                {activeChat.chatId !== undefined &&
                    <ChatWindow user={user} />
                }
                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }
            </div>
        </div>
    );
}