import { ApplicationList, ReturnSchool } from "@/apis/application";
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import OutRequest from "@/components/outRequest/outRequest";
import useAcceptListSelection from "@/hooks/userSelect";
import { theme } from "@/styles/theme";
import { floorOptions } from "@/types/dropdown";
import { getToday } from "@/utils/date";
import { getStudentString } from "@/utils/util";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const OutList = () => {
  const [selectedfloor, setSelectedfloor] = useState<number>(5);

  const { data: Application, refetch: ReApplication } = ApplicationList(
    selectedfloor,
    "OK"
  );
  const { mutate: Return } = ReturnSchool();

  const StudentReturnSchool = () => {
    Return(selectedStudents, {
      onSuccess: () => {
        alert("성공");
        window.location.reload();
      },
    });
  };

  const { selectedStudents, handleAcceptListClick } = useAcceptListSelection();
  const disabled = !selectedStudents.length;

  useEffect(() => {
    ReApplication();
  }, [selectedfloor]);

  const handleFloorChange = (option: number | string) => {
    setSelectedfloor(Number(option));
  };

  return (
    <>
      <Layout
        title="외출자 목록"
        subtitle={getToday()}
        right={
          <Dropdown
            options={floorOptions}
            value={selectedfloor}
            changeHandler={handleFloorChange}
          />
        }
      >
        <TopContainer>
          <Title>외출자 목록</Title>
        </TopContainer>
        <div>
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
        </div>
        <BottomButton>
          <Button
            width="100%"
            disabled={disabled}
            onClick={StudentReturnSchool}
          >
            복귀시키기
          </Button>
        </BottomButton>
      </Layout>
    </>
  );
};

export default OutList;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.gray[500]};
`;

const BottomButton = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;
  padding: 0px 6%;
`;
