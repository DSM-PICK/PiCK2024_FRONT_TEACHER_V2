import { useGetTeacherinfo } from "@/apis/admin";
import Header from "@/components/header/header";
import RouterButton from "@/components/routerButton";
import { theme } from "@/styles/theme";
import { getToday, getWeekDay } from "@/utils/date";
import { styled } from "styled-components";
import { useEffect } from "react";
import useHomeRoomInformation from "@/stores/hoomroom";
import { useCheckToday } from "@/apis/self-study";

const Main = () => {
  const { data: teacherInfomation } = useGetTeacherinfo();
  const { data: checkTeacher } = useCheckToday();
  const { setTeacherInfo } = useHomeRoomInformation();

  useEffect(() => {
    if (teacherInfomation) {
      setTeacherInfo({
        grade: teacherInfomation.grade,
        class_num: teacherInfomation.class_num,
        name: teacherInfomation.name,
      });
    }
  }, [teacherInfomation]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        alert("알맞지 않은 기기입니다. pick-admin 으로 이동합니다");
        location.href = "https://pick-admin.dsmhs.kr";
        return;
      }
    }
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <SelfCheck>
          <Date>
            {getToday()} {getWeekDay()}요일
          </Date>
          <p>{checkTeacher}</p>
        </SelfCheck>
        <RouterWrap>
          <RouterButton />
        </RouterWrap>
      </Container>
    </div>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6%;
  gap: 24px;
`;

const Date = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
  color: ${theme.color.gray[500]};
`;

const SelfCheck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 20px;
  background-color: ${theme.color.gray[50]};
  border-radius: 8px;
`;

const RouterWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
  column-gap: 22px;
`;
