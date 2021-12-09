self.importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

const app = firebase.initializeApp({
    apiKey: "AIzaSyBvdjK7f3uxnWo_3v31U1YmK2WW0ffexsk",
    authDomain: "appetit-2c5d3.firebaseapp.com",
    projectId: "appetit-2c5d3",
    storageBucket: "appetit-2c5d3.appspot.com",
    messagingSenderId: "915134390722",
    appId: "1:915134390722:web:8eb3d2db096d258ce7f65b",
    measurementId: "G-DMYX46ND1P"
});

const messaging = app.messaging()

messaging.onBackgroundMessage(messaging, (payload) => {
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
      notificationOptions);
});
