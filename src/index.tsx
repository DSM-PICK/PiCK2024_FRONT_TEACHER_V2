import ReactDOM from "react-dom/client";
import App from "./App";

if (navigator.onLine && "caches" in window) {
  caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (!key.includes("firebase")) {
        caches.delete(key);
      }
    });
  });
  window.location.reload();
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
