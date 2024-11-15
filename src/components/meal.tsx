import { styled } from "styled-components";
import { theme } from "@/styles/theme";

interface Meal {
  title: string;
  content: string[];
}

const MealInfo = ({ title, content }: Meal) => {
  return (
    <MealInfoWrap>
      <MealTitle>{title}</MealTitle>
      <MealContentWrap>
        {content.length === 1 || content.length === 0 ? (
          <MealContent>급식 정보가 없습니다</MealContent>
        ) : (
          content.map((item) => <MealContent>{item}</MealContent>)
        )}
      </MealContentWrap>
    </MealInfoWrap>
  );
};

export default MealInfo;

export const MealInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 132px;
  padding: 20px 24px;
  height: 100%;
  gap: 16px;
  background-color: ${theme.color.main[50]};
  border-radius: 12px;
`;

export const MealTitle = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
  color: ${theme.color.main[500]};
`;

export const MealContent = styled.p`
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  white-space: nowrap;
`;

export const MealContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
