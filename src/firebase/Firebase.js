
import 'firebase/messaging';
import firebase from "firebase/compat";
import {vapidKey} from "../Const";

var firebaseConfig = {
    apiKey: "AIzaSyBvdjK7f3uxnWo_3v31U1YmK2WW0ffexsk",
    authDomain: "appetit-2c5d3.firebaseapp.com",
    projectId: "appetit-2c5d3",
    storageBucket: "appetit-2c5d3.appspot.com",
    messagingSenderId: "915134390722",
    appId: "1:915134390722:web:8eb3d2db096d258ce7f65b",
    measurementId: "G-DMYX46ND1P"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

//BI8l38F8tahBDSy6qVqXTddhbbsXkOGhlqVjEX1I0QOAVd3lXGvQYuxrlX8suGJeZI0zTPh3VG_BJXGVCBtfo50
export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: vapidKey}).then((currentToken) => {
        if (currentToken) {
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