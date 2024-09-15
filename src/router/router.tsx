import Calendar from "@/components/calendar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import Attendance from "@/pages/attendance";
import Bug from "@/pages/bug";
import Login from "@/pages/login";
import Main from "@/pages/main";
import MoveClassroom from "@/pages/moveClassRoom";
import MoveOkClassroom from "@/pages/moveClassRoom/AcceptClass";
import OutAccept from "@/pages/outAccept";
import OutList from "@/pages/outList";
import PreviousList from "@/pages/preList";
import PreviousDetail from "@/pages/preList/detail";
import WrappedCalendarComponents from "@/pages/selfStudy";
import CalendarComponents from "@/pages/selfStudy";
import { element } from "prop-types";
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
      {
        path: "outAccept",
        element: <OutAccept />,
      },
      {
        path: "outList",
        element: <OutList />,
      },
      {
        path: "previousList",
        children: [
          {
            path: "",
            element: <PreviousList />,
          },
          {
            path: ":detail",
            element: <PreviousDetail />,
          },
        ],
      },
      {
        path: "bugReport",
        element: <Bug />,
      },
      {
        path: "selfStudyList",
        element: <Attendance />,
      },
      {
        path: "calendar",
        element: <CalendarComponents />,
      },
      {
        path: "selfStudy",
        element: <WrappedCalendarComponents />,
      },
    ],
  },
]);
