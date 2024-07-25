import { ReactNode } from "react";
import styled from "styled-components";

import { CalendarContext } from "./useCalendarContext";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./calendarBody";
import useCalendar from "@/hooks/useCalendar";
import SelectedDate from "./SelectedDate";

const CalendarRoot = ({ children }: { children: ReactNode }) => {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
      <Container>{children}</Container>
    </CalendarContext.Provider>
  );
};

const Calendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  Body: CalendarBody,
  Footer: SelectedDate,
});

export default Calendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
