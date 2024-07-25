import { AttendanceCheck } from "@/apis/attendance";
import { AttendType } from "@/apis/attendance/type";
import AttendanceList from "@/components/attendList";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import Tab from "@/components/tab/tab";
import { getStudentString } from "@/utils/util";
import { useEffect, useState } from "react";

const Attendance = () => {
  const tab = ["8교시", "9교시", "10교시"];
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);

  const { data: GetCheckList, refetch: ReGetCheckList } = AttendanceCheck(
    selectedGrade,
    selectedClass
  );

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  const handleGradeChange = (option: number) => {
    setSelectedGrade(option);
  };

  const handleClassChange = (option: number) => {
    setSelectedClass(option);
  };

  useEffect(() => {
    ReGetCheckList();
  }, [selectedGrade, selectedClass]);

  return (
    <Layout
      title="출석 체크"
      right={
        <>
          <Dropdown type="grade" onChange={handleGradeChange} />
          <Dropdown type="class" onChange={handleClassChange} />
        </>
      }
    >
      <Tab content={tab} onClick={handleTabClick} selectedIndex={selectedTab} />
      {GetCheckList?.map((item, index) => (
        <AttendanceList
          key={index}
          userInfo={getStudentString(item)}
          status={item.status6}
        />
      ))}
    </Layout>
  );
};

export default Attendance;
