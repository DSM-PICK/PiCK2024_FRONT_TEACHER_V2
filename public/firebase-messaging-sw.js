
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCj9UsdddHulL1CNzKMbQu3WzZ0-VgbDeg",
  authDomain: "pick-e29a1.firebaseapp.com",
  projectId: "pick-e29a1",
  storageBucket: "pick-e29a1.firebasestorage.app",
  messagingSenderId: "641794960771",
  appId: "1:641794960771:web:2b4141ad3e0eb38917dab6",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(); 

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon-512.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});