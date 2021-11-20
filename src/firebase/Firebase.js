
import 'firebase/messaging';
import firebase from "firebase/compat";
import {Set_Token, URL_Services, vapidKey, firebaseConfig} from "../Const";
import {default as axios} from "axios";


// var firebaseConfig = {
//     apiKey: "AIzaSyBvdjK7f3uxnWo_3v31U1YmK2WW0ffexsk",
//     authDomain: "appetit-2c5d3.firebaseapp.com",
//     projectId: "appetit-2c5d3",
//     storageBucket: "appetit-2c5d3.appspot.com",
//     messagingSenderId: "915134390722",
//     appId: "1:915134390722:web:8eb3d2db096d258ce7f65b",
//     measurementId: "G-DMYX46ND1P"
// };
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();


export const getToken = (setTokenFound, clientId) => {
    return messaging.getToken({vapidKey: vapidKey}).then((currentToken) => {
        if (currentToken) {
            setClientTokenWeb(clientId, currentToken)
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });

const setClientTokenWeb = async (clientId, tokenWeb) => {
    const url = URL_Services() + Set_Token
    const axios = require('axios').default


    const bodyLogin = {
        clientId: clientId,
        tokenWeb: tokenWeb,
    }
    const sendMessageRequest = async () => {
        try {
            const response = await axios.post(
                url,
                bodyLogin,
            )
            return response.data
        } catch (err) {
            // Handle Error Here
            console.error(err)
            return null
        }
    }
    const finalResponse = await sendMessageRequest()
    return finalResponse.ok
}



