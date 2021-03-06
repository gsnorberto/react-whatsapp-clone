import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
    // Função de Login com a conta do Facebook
    fbPopup: async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(provider);
        return result;
    },

    // Adiciona os dados do usuário no BD quando ele loga com Facebook.
    addUser: async (u) => {
        await db.collection('users').doc(u.id).set({
            name: u.name,
            avatar: u.avatar
        }, { merge: true }); // Se o "id" do usuário já estiver cadastrado no BD, faz a alteração. Caso contrário, cria um novo usuário. 
    },

    // Obtem a lista de contatos do usuário
    getContactList: async (userId) => {
        let list = [];
        let results = await db.collection('users').get(); //Lista de usuários

        results.forEach(result => {
            let data = result.data();

            if (result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                })
            }
        })

        return list;
    },

    // Inicia nova conversa
    addNewChat: async (user, user2) => {
        let newChat = await db.collection('chats').add({
            messages: [],
            users: [user.id, user2.id]
        });

        // Usuário 1
        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({ //adiciona o item em um array já existente
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        });

        // Usuário 2
        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({ //adiciona o item em um array já existente
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });
    },

    //Monitorar lista de chats (tempo real)
    onChatList: (userId, setChatList) => {

        return db.collection('users').doc(userId).onSnapshot((doc) => {
            if (doc.exists) {
                let data = doc.data();

                if (data.chats) {
                    setChatList(data.chats);
                }
            }
        })
    },

    //Monitorar conteúdo do chat (tempo real)
    onChatContent: (chatId, setList, setUsers) => {

        return db.collection('chats').doc(chatId).onSnapshot((doc) => {
            if(doc.exists){
                let data = doc.data();
                setList(data.messages);
                setUsers(data.users);
            }
        })
    },

    sendMessage: async (chatData, userId, type, body, users) => {

        let dateNow = new Date ();

        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userId,
                body,
                date: dateNow
            })
        });

        for(let i in users){
            let u = await db.collection('users').doc(users[i]).get();
            let uData = u.data();

            if(uData.chats){
                let chats = [...uData.chats];

                for(let e in chats){
                    if(chats[e]. chatId === chatData.chatId){
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate = dateNow;
                    }
                }

                await db.collection('users').doc(users[i]).update({
                    chats
                })
            }
        }
    }
}