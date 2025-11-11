import ReactDOM from "react-dom/client";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    for (const reg of regs) {
      reg.update();
    }
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) => console.log("FCM Service Worker registered:", reg.scope))
      .catch((err) => console.error("SW registration failed:", err));
  });
}

const start = async () => {
  const cookieStore = (window as any).cookieStore;
  if (cookieStore) {
    try {
      const excludes = ["access_token", "refresh_token"];
      await cookieStore
        .getAll()
        .then((cookies: { name: string }[]) =>
          cookies
            .filter((cookie) => !excludes.includes(cookie.name))
            .map((cookie) => cookieStore.delete(cookie.name))
        );
    } catch (error) {
      console.error(error);
    }
  }
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
};

start();
