import { useState } from 'react';
import React from 'react';

//Emojis
import EmojiPicker from 'emoji-picker-react';

//Styles
import './ChatWindow.css';

//Icons
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

export default () => {
    const [emojiOpen, setEmojiOpen] = useState(false);

    const handleEmojiClick = () => {

    }

    return (
        <div className="chatWindow">
            {/* INFORMAÇÕES DO CHAT DO CONTATO */}
            <div className="chatWindow--header">
                <div className="chatWindow--header-info">
                    <img className='chatWindow--avatar' src="https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg" alt="" />
                    <div className="chatWindow--name">Gabriel Norberto</div>
                </div>

                <div className="chatWindow--header-buttons">
                    <div className="chatWindow--btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{ color: '#919191' }} />
                    </div>
                </div>

            </div>

            {/* MENSAGENS DO CHAT */}
            <div className="chatWindow--body">

            </div>

            {/* ÁREA DOS EMOJIS */}
            <div className="chatWindow--emoji-area">
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                />
            </div>

            {/* ÁREA DE DIGITAÇÃO DO CHAT */}
            <div className="chatWindows--footer">
                <div className="chatWindow--pre">
                    <div className="chatWindow--btn">
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>

                    <div className="chatWindow--btn">
                        <InsertEmoticonIcon style={{ color: '#919191' }} />
                    </div>
                </div>

                <div className="chatWindow--inputarea">
                    <input
                        className='chatWindow--input'
                        type="text"
                        placeholder='Digite uma mensagem'
                    />
                </div>

                <div className="chatWindow--pos">
                    <div className="chatWindow--btn">
                        <SendIcon style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}