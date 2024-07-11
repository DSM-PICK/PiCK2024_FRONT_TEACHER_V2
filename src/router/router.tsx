import Login from "@/pages/login";
import Main from "@/pages/main";
import MoveClassroom from "@/pages/moveClassRoom";
import MoveOkClassroom from "@/pages/moveClassRoom/AcceptClass";
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
      {
        path: "moveClassRoom",
        children: [
          {
            path: "",
            element: <MoveClassroom />,
          },
          {
            path: "ok",
            element: <MoveOkClassroom />,
          },
        ],
      },
    ],
  },
]);
