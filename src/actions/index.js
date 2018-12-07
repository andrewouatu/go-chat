import types from './types';
import { db } from '../firebase';

export function getAllMessages(){
    return async function(dispatch){
        const dbRef = db.ref('/messages');

        db.ref('/messages').on('value', (snapshot) => {

            dispatch({
                type: types.GET_CHAT_MESSAGES,
                messages: snapshot.val()
            })
        });

        return dbRef;
    }
}

export const sendMessage = message => async dispatch => {
    return db.ref('/messages').push({
        message: message,
        name: localStorage.getItem('chat_name')
    })
};

