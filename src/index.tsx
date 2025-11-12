import ReactDOM from "react-dom/client";
import App from "./App";
import { version as CURRENT_VERSION } from "../package.json";

const CACHE_VERSION_KEY = "pick_cache_version";

(async () => {
  if (!navigator.onLine || !("caches" in window)) return;

  const savedVersion = localStorage.getItem(CACHE_VERSION_KEY);

  if (savedVersion !== CURRENT_VERSION) {
    try {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !key.includes("firebase"))
          .map((key) => caches.delete(key))
      );

      localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
      console.log(`[CACHE] Cleared and updated to version ${CURRENT_VERSION}`);

      window.location.reload();
    } catch (error) {
      console.error("[CACHE] Failed to clear cache:", error);
      localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
    }
  }
})();

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
