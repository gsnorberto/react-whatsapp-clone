import { useState, useEffect, useRef } from 'react';
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

//components
import MessageItem from './MessageItem'

export default ({ user }) => {
    const body = useRef();

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
        { author: 'autor1', body: 'testando a mensagem 1' },
        { author: 'autor2', body: 'Ok, isso é legal' },
        { author: 'autor2', body: 'nada' },
    ]);

    //Exibir conteúdo da parte final da barra de rolagem dentro do chat de mensagens
    useEffect(() => {
        //Se a altura total do body (contando todo scroll) for maior que a altura de visualização da mensagem no display
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, []);

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if (recognition !== null) {
            // Quando começar a gravar com o microfone
            recognition.onstart = () => {
                setListening(true);
            }
            // Quando parar de gravar
            recognition.onend = () => {
                setListening(false);
            }
            // Quando receber o resultado
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();
        }
    }

    const handleSendClick = () => {

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
            <div ref={body} className="chatWindow--body">
                {list.map((msg, index) => (
                    <MessageItem
                        key={index}
                        data={msg}
                        user={user}
                    />
                ))}
            </div>

            {/* ÁREA DOS EMOJIS */}
            <div
                className="chatWindow--emoji-area"
                style={{ height: emojiOpen ? '200px' : '0px' }}
            >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                />
            </div>

            {/* ÁREA DE DIGITAÇÃO DO CHAT */}
            <div className="chatWindows--footer">
                <div className="chatWindow--pre">
                    {/* Fechar aba de emojis */}
                    <div
                        className="chatWindow--btn"
                        onClick={handleCloseEmoji}
                        style={{ display: emojiOpen ? 'flex' : 'none' }}
                    >
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>

                    {/* Abrir aba de emojis */}
                    <div
                        className="chatWindow--btn"
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
                    </div>
                </div>

                {/* Digitar mensagem */}
                <div className="chatWindow--inputarea">
                    <input
                        className='chatWindow--input'
                        type="text"
                        placeholder='Digite uma mensagem'
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>

                {/* Botões de Enviar e Microfone */}
                <div className="chatWindow--pos">
                    {text === '' &&
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
                        </div>
                    }
                    {text !== '' &&
                        <div onClick={handleSendClick} className="chatWindow--btn">
                            <SendIcon style={{ color: '#919191' }} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}