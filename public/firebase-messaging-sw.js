// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyBvdjK7f3uxnWo_3v31U1YmK2WW0ffexsk",
    authDomain: "appetit-2c5d3.firebaseapp.com",
    projectId: "appetit-2c5d3",
    storageBucket: "appetit-2c5d3.appspot.com",
    messagingSenderId: "915134390722",
    appId: "1:915134390722:web:8eb3d2db096d258ce7f65b",
    measurementId: "G-DMYX46ND1P"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // eslint-disable-next-line no-undef,no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});