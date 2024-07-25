import styled from "styled-components";
import useCalendarContext from "./useCalendarContext";
import PreArrow from "@/assets/svg/preArrow.svg";
import NextArrow from "@/assets/svg/nextArrow.svg";
import { theme } from "@/styles/theme";

const CalendarHeader = () => {
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <Container>
      <ChangeButton>
        <img src={PreArrow} alt="" onClick={dispatch.handlePrevMonth} />
        <DateTitle>
          {currentDate.year}년 {currentDate.month}월
        </DateTitle>
        <img src={NextArrow} alt="" onClick={dispatch.handleNextMonth} />
      </ChangeButton>
    </Container>
  );
};

export default CalendarHeader;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const DateTitle = styled.p`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

const ChangeButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  line-height: 25.6px;
`;
