import Header from "@/components/header/header";
import WrappedCalendarComponents from "./components";
import { styled } from "styled-components";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { getFullToday } from "@/utils/date";
import { useSelectDaySelfStudyList } from "@/apis/self-study";

const SelfStudyPage = () => {
  const [dates, setDates] = useState<string>(getFullToday());

  const { data: selectTeacherListData } = useSelectDaySelfStudyList(dates);

  const handleDateChange = (newDate: string) => {
    setDates(newDate);
  };

  function formatDate(dateString: string) {
    if (dateString) {
      const [year, month, day] = dateString.split("-");
      return `${month}월 ${day}일`;
    }
  }

  console.log(selectTeacherListData);

  const today = getFullToday() === dates;

  return (
    <div>
      <Header />
      <Content>
        <Title>
          <SelectedDay today={!today}>{formatDate(dates)}</SelectedDay>
          <SelectedDay today={today}>
            {today ? "오늘의 자습 감독" : "자습 감독"} 선생님 입니다
          </SelectedDay>
        </Title>
        {selectTeacherListData?.length !== 0 ? (
          selectTeacherListData?.map((item) => (
            <TeacherList>
              <FloorText>{item.floor}층</FloorText>
              <TeacherText>{item.teacher_name} 선생님</TeacherText>
            </TeacherList>
          ))
        ) : (
          <TeacherList>등록된 자습감독 정보가 없습니다</TeacherList>
        )}
      </Content>
      <SubText>웹에서 자습 감독 선생님 변경이 가능합니다.</SubText>
      <WrappedCalendarComponents onDateChange={handleDateChange} />
    </div>
  );
};

export default SelfStudyPage;

const Content = styled.div`
  margin-top: 24px;
  padding: 16px 0px;
`;

const SubText = styled.p`
  font-size: ${theme.font.body[4].size};
  font-weight: ${theme.font.body[4].fontweight};
  color: ${theme.color.gray[600]};
  display: flex;
  justify-content: center;
`;

const SelectedDay = styled.div<{ today: boolean }>`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
  color: ${({ today }) =>
    today ? theme.color.main[500] : theme.color.normal.black};
`;

const TeacherList = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
`;

const FloorText = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
  color: ${theme.color.gray[800]};
`;

const TeacherText = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
`;

const Title = styled.p`
  padding: 16px 24px;
`;
