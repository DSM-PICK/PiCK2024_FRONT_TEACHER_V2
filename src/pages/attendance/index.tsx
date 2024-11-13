import { AttendanceCheck } from "@/apis/attendance";
import { AttendType } from "@/apis/attendance/type";
import AttendanceList from "@/components/attendList";
import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import Tab from "@/components/tab/tab";
import useDropdownInformation from "@/stores/dropdown";
import { classOptions, gradeOptions } from "@/types/dropdown";
import { getStudentString } from "@/utils/util";

const Attendance = () => {
  const tab = ["8교시", "9교시", "10교시"];
  const { dropdownInfo, setDropdownInfo } = useDropdownInformation();

  const [selectedGrade, setSelectedGrade] = useState<number>(
    dropdownInfo?.grade || 1
  );
  const [selectedClass, setSelectedClass] = useState<number>(
    dropdownInfo?.class_num || 1
  );
  const [selectedTab, setSelectedTab] = useState<number>(
    dropdownInfo?.tab || 0
  );

  const { data: GetCheckList, refetch: ReGetCheckList } = AttendanceCheck(
    selectedGrade,
    selectedClass,
    selectedTab + 8
  );

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setDropdownInfo({
      grade: selectedGrade,
      class_num: selectedGrade,
      tab: index,
    });
  };

  const handleGradeChange = (option: number | string) => {
    const grade = Number(option);
    setSelectedGrade(grade);
    setDropdownInfo({
      grade: grade,
      class_num: selectedClass,
      tab: selectedTab,
    });
  };

  const handleClassChange = (option: number | string) => {
    const classNum = Number(option);
    setSelectedClass(classNum);
    setDropdownInfo({
      grade: selectedGrade,
      class_num: classNum,
      tab: selectedTab,
    });
  };

  useEffect(() => {
    ReGetCheckList();
  }, [selectedGrade, selectedClass]);

  return (
    <Layout
      title="자습시간 출결"
      right={
        <>
          <Dropdown
            options={gradeOptions}
            value={selectedGrade}
            changeHandler={handleGradeChange}
          />
          <Dropdown
            options={classOptions}
            value={selectedClass}
            changeHandler={handleClassChange}
          />
        </>
      }
    >
      <Tab content={tab} onClick={handleTabClick} selectedIndex={selectedTab} />
      {GetCheckList?.map((item, index) => (
        <AttendanceList
          key={index}
          userInfo={getStudentString(item)}
          status={item.status}
        />
      ))}
    </Layout>
  );
};

export default Attendance;
