import Login from "@/pages/login";
import Main from "@/pages/main";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "main",
        element: <Main />,
      },
    ],
  },
]);
