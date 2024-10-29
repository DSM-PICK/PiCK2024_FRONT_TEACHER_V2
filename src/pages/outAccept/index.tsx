import { ApplicationChange, useApplicationRequest } from "@/apis/application";
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import OutRequest from "@/components/outRequest/outRequest";
import useAcceptListSelection from "@/hooks/userSelect";
import useAcceptListSelectionStore from "@/stores/handleAcceptList";
import { theme } from "@/styles/theme";
import { AllOption, AllclassOptions } from "@/types/dropdown";
import { getToday } from "@/utils/date";
import { getStudentString } from "@/utils/util";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);

  const { data: Application, refetch: ReApplication } = useApplicationRequest(
    selectedGrade,
    selectedClass
  );
  const { mutate: Check } = ApplicationChange();

  const Change = (option: boolean) => () => {
    const statusProp = option ? "OK" : "NO";
    Check(
      { status: statusProp, id_list: selectedStudents },
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
    useAcceptListSelectionStore();
  const disabled = !selectedStudents.length;

  useEffect(() => {
    ReApplication();
  }, [selectedGrade, selectedClass]);

  const handleGradeChange = (option: number | string) => {
    setSelectedGrade(Number(option));
  };

  const handleClassChange = (option: number | string) => {
    setSelectedClass(Number(option));
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
      <Container>
        {Application?.map((item) => (
          <OutRequest
            selected={selectedStudents.includes(item.id)}
            time={`${item.start} ~ ${item.end}`}
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
