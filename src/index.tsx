import ReactDOM from "react-dom/client";
import App from "./App";

const cookieStore = (window as any).cookieStore;
const excludes = ["access_token", "refresh_token"];
cookieStore
  .getAll()
  .then((cookies: { name: string }[]) =>
    cookies
      .filter((cookie) => !excludes.includes(cookie.name))
      .map((cookie) => cookieStore.delete(cookie.name))
  );

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
