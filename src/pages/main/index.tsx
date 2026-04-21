import { useGetTeacherinfo } from "@/apis/admin";
import Header from "@/components/header/header";
import RouterButton from "@/components/routerButton";
import useHomeRoomInformation from "@/stores/hoomroom";
import { theme } from "@/styles/theme";
import { getToday, getWeekDay } from "@/utils/date";
import { useEffect } from "react";
import { styled } from "styled-components";
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

  return (
    <div>
      <Header />
      <ContentArea>
        <FloatingNotice role="alert">
          <NoticeLabel>{"\uC11C\uBE44\uC2A4 \uC885\uB8CC \uC548\uB0B4"}</NoticeLabel>
          <NoticeText>
            {"PiCK Teacher\uB294 \uC11C\uBE44\uC2A4 \uC885\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4"}
          </NoticeText>
        </FloatingNotice>
        <Container>
          <SelfCheck>
            <Date>
              {getToday()} {getWeekDay()}
              {"\uC694\uC77C"}
            </Date>
            <p>{checkTeacher}</p>
          </SelfCheck>
          <RouterWrap>
            <RouterButton />
          </RouterWrap>
        </Container>
      </ContentArea>
    </div>
  );
};

export default Main;

const ContentArea = styled.div`
  position: relative;
`;

const FloatingNotice = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(calc(100% - 12%), 440px);
  padding: 18px 20px;
  border: 1px solid ${theme.color.error[300]};
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 40px rgba(20, 20, 20, 0.14);
  backdrop-filter: blur(10px);
`;

const NoticeLabel = styled.span`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
  color: ${theme.color.error[500]};
`;

const NoticeText = styled.p`
  font-size: ${theme.font.subTitle[2].size};
  font-weight: ${theme.font.subTitle[2].fontweight};
  color: ${theme.color.normal.black};
  line-height: 1.5;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 124px 6% 6%;
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
