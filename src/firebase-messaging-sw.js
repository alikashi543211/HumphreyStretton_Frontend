// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config
//  const firebaseConfig = {

//     apiKey: "AIzaSyAm6blV0hs82ElUDgjSPwrpf40O6ncUjd0",
//     authDomain: "humphrey-stretton.firebaseapp.com",
//     databaseURL: "https://humphrey-stretton.firebaseio.com",
//     projectId: "humphrey-stretton",
//     storageBucket: "humphrey-stretton.appspot.com",
//     messagingSenderId: "545119041119",
//     appId: "1:545119041119:web:b7094a8883697a6e6bcdea"
//  };
const firebaseConfig = {
    apiKey: "AIzaSyCM6eRC08uXM7aMLm-SvJi-I4k7E1nz4Os",
    authDomain: "humphrey-2a081.firebaseapp.com",
    databaseURL: "https://humphrey-2a081-default-rtdb.firebaseio.com",
    projectId: "humphrey-2a081",
    storageBucket: "humphrey-2a081.appspot.com",
    messagingSenderId: "888798923943",
    appId: "1:888798923943:web:0a3ebb0ffa20a4b0d95f82",
    measurementId: "G-D79BYD315K"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
