import { ApplicationChange, useApplicationRequest } from "@/apis/application";
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import OutRequest from "@/components/outRequest/outRequest";
import Tab from "@/components/tab/tab";
import useAcceptListSelectionStore from "@/stores/handleAcceptList";
import useHomeRoomInformation from "@/stores/hoomroom";
import { theme } from "@/styles/theme";
import { AllOption, AllclassOptions } from "@/types/dropdown";
import { getToday } from "@/utils/date";
import { getStudentString } from "@/utils/util";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const OutAccept = () => {
  const { teacherInfo } = useHomeRoomInformation();
  const [selectedGrade, setSelectedGrade] = useState<number>(
    teacherInfo?.grade || 5
  );
  const [selectedClass, setSelectedClass] = useState<number>(
    teacherInfo?.class_num || 5
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { data: Application, refetch: ReApplication } = useApplicationRequest(
    selectedGrade,
    selectedClass,
    selectedTab === 0 ? "application" : "early-return"
  );
  const { mutate: Check } = ApplicationChange();

  const Change = (option: boolean) => () => {
    const statusProp = option ? "OK" : "NO";
    Check(
      {
        status: statusProp,
        ids: selectedStudents,
        type: selectedTab === 0 ? "application" : "early-return",
      },
      {
        onSuccess: () => {
          alert("성공");
          window.location.reload();
        },
        onError: (error) => {
          console.log(error.name);
        },
      }
    );
  };

  const { selectedStudents, handleAcceptListClick } =
    useAcceptListSelectionStore();
  const disabled = !selectedStudents.length;

  useEffect(() => {
    ReApplication();
  }, [selectedGrade, selectedClass]);

  const handleGradeChange = (option: number | string) => {
    const newGrade = Number(option);
    setSelectedClass(
      newGrade === 5 ? 5 : selectedClass === 5 ? 1 : selectedClass
    );
    setSelectedGrade(newGrade);
  };

  const handleClassChange = (option: number | string) => {
    const newGrade = Number(option);
    setSelectedGrade(
      newGrade === 5 ? 5 : selectedGrade === 5 ? 1 : selectedGrade
    );
    setSelectedClass(newGrade);
  };

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Layout
      title="외출 수락"
      subtitle={getToday()}
      right={
        <ButtonWrap>
          <Button
            onClick={Change(false)}
            error
            disabled={disabled}
            width="65px"
          >
            거절
          </Button>
          <Button onClick={Change(true)} disabled={disabled} width="65px">
            수락
          </Button>
        </ButtonWrap>
      }
    >
      <TopContainer>
        <Title>외출 신청한 학생</Title>
        <DropdownWrap>
          <Dropdown
            options={AllOption}
            value={selectedGrade}
            changeHandler={handleGradeChange}
          />
          <Dropdown
            options={AllclassOptions}
            value={selectedClass}
            changeHandler={handleClassChange}
          />
        </DropdownWrap>
      </TopContainer>
      <Tab
        content={["외출", "조기귀가"]}
        onClick={handleTabClick}
        selectedIndex={selectedTab}
        two
      />
      <Container>
        {Application?.map((item) => (
          <OutRequest
            selected={selectedStudents.includes(item.id)}
            time={item.end ? `${item.start} - ${item.end}` : `${item.start} ~`}
            userInfo={getStudentString(item)}
            reason={item.reason}
            onClick={() =>
              handleAcceptListClick(item.id, getStudentString(item))
            }
          />
        ))}
      </Container>
    </Layout>
  );
};

export default OutAccept;

const ButtonWrap = styled.div`
  height: 34px;
  display: flex;
  gap: 10px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.gray[500]};
`;
const DropdownWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
