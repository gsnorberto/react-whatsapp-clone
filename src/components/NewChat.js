import React, { useState } from "react";
import './NewChat.css'

//Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({user, chatlist, show, setShow}) => {
    const [list, setList] = useState([
        {id: 123, avatar: 'https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg', name: 'Gabriel Norberto'},
        {id: 123, avatar: 'https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg', name: 'Gabriel Norberto'},
        {id: 123, avatar: 'https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg', name: 'Gabriel Norberto'},
        {id: 123, avatar: 'https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg', name: 'Gabriel Norberto'}
    ]);

    const handleClose = () => {
        setShow(false);
    }

    return(
        <div className="newChat" style={{left: show ? 0 : -415}}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backButton">
                    <ArrowBackIcon style={{color: '#919191'}} />
                </div>
                <div className="newChat--headTitle">Nova Conversa</div>
            </div>

            {/* Lista dos contatos */}
            <div className="newChat--list">
                {list.map((item, key) => (
                    <div className="newChat--item" key={key}>
                        <img src={item.avatar} alt="" className="newChat--itemAvatar" />
                        <div className="newChat--itemName">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}