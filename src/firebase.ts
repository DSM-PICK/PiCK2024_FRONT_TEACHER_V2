import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCj9UsdddHulL1CNzKMbQu3WzZ0-VgbDeg",
  authDomain: "pick-e29a1.firebaseapp.com",
  projectId: "pick-e29a1",
  storageBucket: "pick-e29a1.firebasestorage.app",
  messagingSenderId: "641794960771",
  appId: "1:641794960771:web:2b4141ad3e0eb38917dab6",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY });
    return token;
  } else {
    return null;
  };
};
