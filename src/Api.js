import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
    // Função de Login com a conta do Facebook
    fbPopup:async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(provider);
        return result;
    },

    // Adiciona os dados do usuário no BD quando ele loga com Facebook.
    addUser:async(u) => {
        await db.collection('users').doc(u.id).set({
            name: u.name,
            avatar: u.avatar
        }, {merge: true}); // Se o "id" do usuário já estiver cadastrado no BD, faz a alteração. Caso contrário, cria um novo usuário. 
    },

    // Obtem a lista de contatos do usuário
    getContactList:async(userId) => {
        let list = [];
        let results = await db.collection('users').get(); //Lista de usuários

        results.forEach(result => {
            let data = result.data();

            if( result.id !== userId ){
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
    addNewChat:async (user, user2) => {
        let newChat = await db.collection('chats').add({
            messages: [],
            users: [user.id, user2.id]
        });

        // Usuário 1
        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.awwayUnion({ //adiciona o item em um array já existente
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        });

        // Usuário 2
        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.awwayUnion({ //adiciona o item em um array já existente
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });
    }
}