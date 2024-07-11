import Layout from "@/components/layout";
import Tab from "@/components/tab";
import { getToday } from "@/utils/date";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import ClassMove from "@/components/classMove";
import { RequestClassRoom } from "@/apis/class-room";
import { RequestClassRoomType } from "@/apis/class-room/type";
import { getStudentString } from "@/utils/util";

const MoveOkClassroom = () => {
  const TabContent = ["2층", "3층", "4층"];
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState<RequestClassRoomType[]>([]);

  const { mutate: ReqClassRoom } = RequestClassRoom();

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  const Get = () => {
    ReqClassRoom(
      { floor: selectedTab + 2, status: "OK" },
      {
        onSuccess: (data) => {
          setData(data);
        },
      }
    );
  };

  useEffect(() => {
    Get();
  }, [selectedTab]);

  return (
    <Layout title="교실 이동 수락" subtitle={getToday()}>
      <Tab
        content={TabContent}
        onClick={handleTabClick}
        selectedIndex={selectedTab}
      />
      {data.map((item) => (
        <ClassMove
          key={item.id}
          selected={false}
          userInfo={getStudentString(item)}
          pre={item.move}
          next={item.classroom_name}
          time={`${item.start_period}교시 ~ ${item.end_period}교시`}
          onClick={() => {}}
        />
      ))}
    </Layout>
  );
};

export default MoveOkClassroom;

const ButtonWrap = styled.div`
  height: 34px;
  display: flex;
  gap: 10px;
`;
