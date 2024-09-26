import React from "react";
import styled from "styled-components";
import useCalendarContext from "./useCalendarContext";
import { theme } from "@/styles/theme";
import { useSwipeable } from "react-swipeable";

interface CalendarBodyProp {
  onClickDate: (date: string) => void;
}

const CalendarBody = ({ onClickDate }: CalendarBodyProp) => {
  const { dispatch, daysInMonth, selectedDate, currentDate } =
    useCalendarContext();
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  const handleChangeMonth = () => {
    dispatch.handleNextMonth();
  };

  const handleChangePreMonth = () => {
    dispatch.handlePrevMonth();
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleChangeMonth,
    onSwipedRight: handleChangePreMonth,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Container {...handlers}>
      <DayWrapper>
        {weeks.map((week) => (
          <CalendarItem key={week}>{week}</CalendarItem>
        ))}
      </DayWrapper>
      <DayWrapper>
        {daysInMonth.map((date) => (
          <Day
            onClick={() => onClickDate(date.date)}
            $isCurrentMonth={currentDate.month === date.month}
            $isSelectedDate={selectedDate.date === date.date}
            className={date.month}
            key={date.date}
          >
            <span>{date.day}</span>
          </Day>
        ))}
      </DayWrapper>
    </Container>
  );
};

export default CalendarBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  padding: 25px 0;
  border-radius: 20px;
`;

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
`;

const CalendarItem = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.color.normal.black};
`;

const Day = styled.div<{ $isCurrentMonth?: boolean; $isSelectedDate: boolean }>`
  padding: 10px;
  height: 50px;
  display: flex;
  font-size: ${theme.font.caption[1].size};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${({ $isCurrentMonth }) =>
    !$isCurrentMonth ? theme.color.gray[300] : theme.color.normal.black};
  background-color: ${({ $isSelectedDate, theme }) =>
    $isSelectedDate ? theme.color.main[50] : "transparent"};
`;
