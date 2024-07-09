import Test from "@/pages/text";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    children: [],
  },
]);
