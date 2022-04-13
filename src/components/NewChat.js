import React, { useState, useEffect } from "react";
import './NewChat.css'

//Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Api from "../Api";

export default ({user, chatlist, show, setShow}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if(user !== null){
                let results = await Api.getContactList(user.id);
                setList(results)
            }
        }
        getList();

    }, [user]);

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

        handleClose();
    }

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
                    <div onClick={()=>addNewChat(item)} className="newChat--item" key={key}>
                        <img src={item.avatar} alt="" className="newChat--itemAvatar" />
                        <div className="newChat--itemName">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}