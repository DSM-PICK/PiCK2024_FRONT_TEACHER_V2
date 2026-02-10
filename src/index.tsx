import ReactDOM from "react-dom/client";
import App from "./App";
import { version as CURRENT_VERSION } from "../package.json";

const CACHE_VERSION_KEY = "pick_cache_version";

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

type OSType = "Android" | "iOS" | "Windows" | "macOS" | "Linux" | "Unknown";

const getOS = (): OSType => {
  const { userAgent: ua, platform: plt } = navigator;

  // navigator.userAgentData.platform 우선 참조
  const platform: string = (navigator as any).userAgentData?.platform || plt || "";

  // 1. Android
  if (/android/i.test(ua)) return "Android";

  // 2. iOS (iPhone, iPad, iPod)
  const isIOS: boolean = /iPhone|iPad|iPod/i.test(ua) ||
    (/MacIntel/.test(platform) && navigator.maxTouchPoints > 1);
  if (isIOS) return "iOS";

  // 3. Windows
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "Windows";

  // 4. macOS
  if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return "macOS";

  // 5. Linux
  if (/Linux/i.test(platform) || /Linux/i.test(ua)) return "Linux";

  return "Unknown";
}

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
    }
  }

  if (typeof window !== "undefined") {
    const os = getOS();
    if (os === "iOS") {
      alert("admin앱으로 이동합니다.");
      window.open(
        "https://apps.apple.com/app/id6756826844",
        "_blank"
      );
      return;
    } else if (os !== "Android") {
      alert("pick-admin으로 이동합니다.");
      location.href = "https://pick-admin.dsmhs.kr";
      return;
    }
  }

  start();
})();
