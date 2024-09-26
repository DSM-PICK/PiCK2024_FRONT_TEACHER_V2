import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "@/components/calendar";
import WeeklyCalendar from "@/components/calendar/weeklyCalendar";
import useCalendarContext from "@/components/calendar/useCalendarContext";
import downArrow from "@/assets/svg/downarrow.svg";
import { theme } from "@/styles/theme";

const CalendarComponents = ({ onDateChange }) => {
  const [isMonthlyView, setIsMonthlyView] = useState(false);
  const { selectedDate } = useCalendarContext();

  const handleDateClick = (date: string) => {
    const selected = new Date(date);

    const formattedDate = selected.toISOString().split("T")[0];

    selectedDate.selectDate(date);
    setIsMonthlyView(false);
    if (onDateChange) {
      onDateChange(formattedDate);
    }
  };

  const handleBackToMonthlyClick = () => {
    setIsMonthlyView(true);
  };

  return (
    <Container>
      {isMonthlyView ? (
        <>
          <img src={downArrow} alt="" onClick={() => setIsMonthlyView(false)} />
          <Calendar.Header />
          <Calendar.Body onClickDate={handleDateClick} />
        </>
      ) : (
        <WeeklyCalendar
          selectedDate={selectedDate.date}
          onBackToMonthlyClick={handleBackToMonthlyClick}
          onDateSelect={handleDateClick}
        />
      )}
    </Container>
  );
};

const WrappedCalendarComponents = ({ onDateChange }) => (
  <Calendar>
    <CalendarComponents onDateChange={onDateChange} />
  </Calendar>
);

export default WrappedCalendarComponents;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: ${theme.color.normal.white};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: ${theme["box-shadow"]};
`;
