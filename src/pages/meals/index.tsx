import Header from "@/components/header/header";
import WrappedCalendarComponents from "./component";
import { styled } from "styled-components";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { getFullToday } from "@/utils/date";
import { useMonthMeals } from "@/apis/meal";
import { MealsCard } from "./component/mealCard";

const Meals = () => {
  const [date, setDate] = useState<string>(getFullToday());

  const { data: selectMeals, isLoading } = useMonthMeals(date);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  function formatDate(dateString: string) {
    if (dateString) {
      const [year, month, day] = dateString.split("-");
      return `${month}월 ${day}일`;
    }
  }

  const today = getFullToday() === date;

  return (
    <div>
      <Header />
      <Content>
        <Title>
          <SelectedDay today={!today}>{formatDate(date)}</SelectedDay>
          <SelectedDay today={today}>
            {today ? "오늘의 " : ""} 급식입니다
          </SelectedDay>
        </Title>
        {selectMeals && <MealsContainer>
          <MealsCard
            cal={selectMeals?.meal_list.breakfast.cal!}
            title="아침"
            content={selectMeals?.meal_list.breakfast.menu.slice(0) || []}
          />
          <MealsCard
            cal={selectMeals?.meal_list.lunch.cal!}
            title="점심"
            content={selectMeals?.meal_list.lunch.menu.slice(0) || []}
          />
          <MealsCard
            title="저녁"
            content={selectMeals?.meal_list.dinner.menu.slice(0) || []}
            cal={selectMeals?.meal_list.dinner.cal!}
          /></MealsContainer>}
      </Content>
      <WrappedCalendarComponents onDateChange={handleDateChange} />
    </div>
  );
};

export default Meals

const Content = styled.div`
  margin-top: 24px;
  padding: 16px 0px;
`;

const MealsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
`;



const SelectedDay = styled.div<{ today: boolean }>`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
  color: ${({ today }) =>
    today ? theme.color.main[500] : theme.color.normal.black};
`;

const Title = styled.p`
  padding: 16px 24px;
`;
