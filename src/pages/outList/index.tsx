import {
  ApplicationList,
  ReturnSchool,
  useGetEarlyReturnList,
} from "@/apis/application";
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import Layout from "@/components/layout/layout";
import OutRequest from "@/components/outRequest/outRequest";
import Tab from "@/components/tab/tab";
import useAcceptListSelection from "@/hooks/userSelect";
import { theme } from "@/styles/theme";
import { floorOptions } from "@/types/dropdown";
import { getToday } from "@/utils/date";
import { getStudentString } from "@/utils/util";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const OutList = () => {
  const [selectedfloor, setSelectedfloor] = useState<number>(5);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { data: Application, refetch: ReApplication } = ApplicationList(
    selectedfloor,
    "OK"
  );
  const { data: EarlyreturnList } = useGetEarlyReturnList();

  const { mutate: Return } = ReturnSchool();

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

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
          selectedTab === 0 && (
            <Dropdown
              options={floorOptions}
              value={selectedfloor}
              changeHandler={handleFloorChange}
            />
          )
        }
      >
        <TopContainer>
          <Title>외출자 목록</Title>
        </TopContainer>
        <Tab
          content={["외출", "조기귀가"]}
          onClick={handleTabClick}
          selectedIndex={selectedTab}
          two
        />
        <OutListWrap>
          {selectedTab === 0
            ? Application?.map((item) => (
                <OutRequest
                  selected={selectedStudents.includes(item.id)}
                  time={`${item.start.slice(0, 5)} ~ ${item.end.slice(0, 5)}`}
                  userInfo={getStudentString(item)}
                  reason={item.reason}
                  onClick={() =>
                    handleAcceptListClick(item.id, getStudentString(item))
                  }
                />
              ))
            : EarlyreturnList?.map((item) => (
                <OutRequest
                  selected={selectedStudents.includes(item.id)}
                  time={item.start.slice(0, 5) + " ~"}
                  userInfo={getStudentString(item)}
                  reason={item.reason}
                  onClick={() =>
                    handleAcceptListClick(item.id, getStudentString(item))
                  }
                />
              ))}
        </OutListWrap>
        <BottomButton>
          {selectedTab === 0 && (
            <Button
              width="100%"
              disabled={disabled}
              onClick={StudentReturnSchool}
            >
              복귀시키기
            </Button>
          )}
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
