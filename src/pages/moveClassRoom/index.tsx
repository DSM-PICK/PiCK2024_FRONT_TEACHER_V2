import Button from "@/components/button/button";
import Layout from "@/components/layout/layout";
import Tab from "@/components/tab/tab";
import { getToday } from "@/utils/date";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import ClassMove from "@/components/classMove/classMove";
import { AcceptClassroom, RequestClassRoom } from "@/apis/class-room";
import { RequestClassRoomType } from "@/apis/class-room/type";
import { getStudentString } from "@/utils/util";
import useAcceptListSelection from "@/hooks/userSelect";
import { useNavigate } from "react-router-dom";

const MoveClassroom = () => {
  const TabContent = ["2층", "3층", "4층"];
  const [selectedTab, setSelectedTab] = useState(0);

  const router = useNavigate();

  const { selectedStudents, handleAcceptListClick } = useAcceptListSelection();

  const disabled = !selectedStudents.length;
  const { data: ReqClassRoom, refetch: RequestClassRoomData } =
    RequestClassRoom(selectedTab + 2, "QUIET");
  const { mutate: Accept } = AcceptClassroom();

  const handleOK = (accept: boolean) => () => {
    const statusProp = accept ? "OK" : "NO";
    Accept(
      { status: statusProp, ids: selectedStudents },
      {
        onSuccess: () => {
          alert("성공");
          RequestClassRoomData();
        },
        onError: () => {
          console.log("실패");
        },
      }
    );
  };

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Layout
      title="교실 이동 수락"
      subtitle={getToday()}
      right={
        <ButtonWrap>
          <Button
            onClick={handleOK(false)}
            disabled={disabled}
            error={true}
            width="65px"
          >
            거절
          </Button>
          <Button onClick={handleOK(true)} disabled={disabled} width="65px">
            수락
          </Button>
        </ButtonWrap>
      }
    >
      <Tab
        content={TabContent}
        onClick={handleTabClick}
        selectedIndex={selectedTab}
      />
      {ReqClassRoom?.map((item) => (
        <ClassMove
          key={item.user_id}
          selected={selectedStudents.includes(item.user_id)}
          userInfo={getStudentString(item)}
          pre={item.move}
          next={item.classroom_name}
          time={`${item.start_period}교시 ~ ${item.end_period}교시`}
          onClick={() =>
            handleAcceptListClick(item.user_id, getStudentString(item))
          }
        />
      ))}
      <BottomButton>
        <Button
          onClick={() => {
            router("ok");
          }}
          width="100%"
        >
          교실 이동 학생 보기
        </Button>
      </BottomButton>
    </Layout>
  );
};

export default MoveClassroom;

const ButtonWrap = styled.div`
  height: 34px;
  display: flex;
  gap: 10px;
`;

const BottomButton = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;
  padding: 0px 6%;
`;
