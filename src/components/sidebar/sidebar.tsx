import { theme } from "@/styles/theme";
import { styled } from "styled-components";
import MealInfo from "../meals/meal";
import { TodayMeals } from "@/apis/meal";
import { getFullToday, getToday, getWeekDay } from "@/utils/date";
import { TodaySelfStudyList } from "@/apis/self-study";
import HelfMenu from "../helpMenu/helpMenu";
import { useEffect, useState } from "react";

interface SidebarProp {
  onClick: () => void;
}

const Sidebar = ({ onClick }: SidebarProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { data: TodayMeal } = TodayMeals();
  const { data: selfStudyData } = TodaySelfStudyList();

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        onClick();
      }, 500);
    }
  }, [isOpen, onClick]);

  return (
    <>
      <Menu onClick={handleClose} />
      <Container className={isOpen ? "open" : "close"}>
        <Top>
          <ContentWrap>
            <SemiTitle>오늘의 급식({getToday()})</SemiTitle>
            <MealWrap>
              <MealInfo
                title="점심"
                content={TodayMeal?.meals.lunch.slice(0) || []}
              />

              <MealInfo
                title="저녁"
                content={TodayMeal?.meals.dinner.slice(0) || []}
              />
            </MealWrap>
          </ContentWrap>
          <ContentWrap>
            <SemiTitle>오늘의 자습 감독 선생님</SemiTitle>
            <SelfStudyListWrap>
              {selfStudyData?.length === 0
                ? "오늘의 자습감독 정보가 없습니다"
                : selfStudyData?.map((item) => (
                    <TextWrap>
                      <FloorText>{item.floor}층</FloorText>
                      <TeacherNameText>
                        {item.teacher_name} 선생님
                      </TeacherNameText>
                    </TextWrap>
                  ))}
            </SelfStudyListWrap>
          </ContentWrap>
        </Top>
        <Line />
        <HelfMenu />
      </Container>
    </>
  );
};

export default Sidebar;

const Line = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${theme.color.gray[100]};
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
`;

const SemiTitle = styled.p`
  font-size: ${theme.font.body[2].size};
  color: ${theme.color.gray[800]};
`;

const MealWrap = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 350px) {
    display: flex;
    flex-direction: column;
  }
`;

const Container = styled.div`
  position: fixed;
  height: 100%;
  overflow: scroll;
  background-color: ${theme.color.normal.white};
  z-index: 2;
  right: 0;
  top: 0;
  &.open {
    animation: slidein 0.5s forwards;
  }

  &.close {
    animation: slideout 0.5s forwards;
  }

  @keyframes slidein {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideout {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

const SelfStudyListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  gap: 10px;
  border-radius: 12px;
  background-color: ${theme.color.main[50]};
`;

const FloorText = styled.p`
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.main[600]};
`;

const TeacherNameText = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
`;

const TextWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

const Menu = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${theme.color.normal.black};
  opacity: 0.5;
  top: 0;
  left: 0;
`;
