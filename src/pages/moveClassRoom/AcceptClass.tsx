import Layout from "@/components/layout/layout";
import Tab from "@/components/tab/tab";
import { getToday } from "@/utils/date";
import { useState } from "react";
import ClassMove from "@/components/classMove/classMove";
import { RequestClassRoom } from "@/apis/class-room";
import { getStudentString } from "@/utils/util";

const MoveOkClassroom = () => {
  const TabContent = ["2층", "3층", "4층"];
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: ReqClassRoom } = RequestClassRoom(selectedTab + 2, "OK");

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Layout title="교실 이동 현황" subtitle={getToday()}>
      <Tab
        content={TabContent}
        onClick={handleTabClick}
        selectedIndex={selectedTab}
      />
      {ReqClassRoom?.length! > 0 ? (
        ReqClassRoom?.map((item) => (
          <ClassMove
            key={item.user_id}
            selected={false}
            userInfo={getStudentString(item)}
            pre={item.move}
            next={item.classroom_name}
            time={`${item.start}교시 ~ ${item.end}교시`}
            onClick={() => {}}
          />
        ))
      ) : (
        <p>교실이동중인 학생이 없습니다</p>
      )}
    </Layout>
  );
};

export default MoveOkClassroom;
