import { ApplicationChange, ApplicationRequest } from "@/apis/application";
import { ApplicaionList } from "@/apis/application/type";
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import OutRequest from "@/components/outRequest/outRequest";
import useAcceptListSelection from "@/hooks/userSelect";
import { theme } from "@/styles/theme";
import { getToday } from "@/utils/date";
import { getStudentString } from "@/utils/util";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [data, setData] = useState<ApplicaionList[]>([]);

  const { mutate: Application } = ApplicationRequest();
  const { mutate: Check } = ApplicationChange();

  const Change = (option: boolean) => () => {
    const statusProp = option ? "OK" : "NO";
    Check(
      { status: statusProp, ids: selectedStudents },
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

  const { selectedStudentName, selectedStudents, handleAcceptListClick } =
    useAcceptListSelection();

  const Get = () => {
    Application(
      { grade: selectedGrade, class: selectedClass },
      {
        onSuccess: (data) => {
          setData(data);
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  useEffect(() => {
    Get();
  }, [selectedGrade, selectedClass]);

  const handleGradeChange = (option: number) => {
    setSelectedGrade(option);
  };

  const handleClassChange = (option: number) => {
    setSelectedClass(option);
  };

  return (
    <Layout
      title="외출 수락"
      subtitle={getToday()}
      right={
        <ButtonWrap>
          <Button onClick={Change(false)} width="65px">
            거절
          </Button>
          <Button onClick={Change(true)} width="65px">
            수락
          </Button>
        </ButtonWrap>
      }
    >
      <TopContainer>
        <Title>외출 신청한 학생</Title>
        <DropdownWrap>
          <Dropdown type="grade" onChange={handleGradeChange} />
          <Dropdown type="class" onChange={handleClassChange} />
        </DropdownWrap>
      </TopContainer>
      <div>
        {data.map((item) => (
          <OutRequest
            selected={selectedStudents.includes(item.id)}
            time={`${item.start_time} - ${item.end_time}`}
            userInfo={getStudentString(item)}
            reason={item.reason}
            onClick={() =>
              handleAcceptListClick(item.id, getStudentString(item))
            }
          />
        ))}
      </div>
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
