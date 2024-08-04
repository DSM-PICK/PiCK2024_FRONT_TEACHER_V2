import Layout from "@/components/layout/layout";
import Tab from "@/components/tab/tab";
import { getToday } from "@/utils/date";
import { useEffect, useState } from "react";
import ClassMove from "@/components/classMove/classMove";
import { RequestClassRoom } from "@/apis/class-room";
import { getStudentString } from "@/utils/util";

const MoveOkClassroom = () => {
  const TabContent = ["2층", "3층", "4층"];
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: ReqClassRoom, refetch: RequestClassRommData } =
    RequestClassRoom(selectedTab + 2, "OK");

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    RequestClassRommData();
  }, [selectedTab]);

  return (
    <Layout title="교실 이동 수락" subtitle={getToday()}>
      <Tab
        content={TabContent}
        onClick={handleTabClick}
        selectedIndex={selectedTab}
      />
      {ReqClassRoom?.map((item) => (
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
