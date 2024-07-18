import { theme } from "@/styles/theme";
import { styled } from "styled-components";
import StatusDrop from "../dropdown/state/stateDrop";
import { useState } from "react";

interface AttendanceListProps {
  userInfo: string;
  status: string;
}

const AttendanceList = ({ userInfo, status }: AttendanceListProps) => {
  const [state, setState] = useState<string>("ATTENDANCE");

  const handleStatusChange = (option: string) => {
    setState(option);
  };
  return (
    <Wrap>
      <UserInfoText>{userInfo}</UserInfoText>
      <StatusDrop status={status} onChange={handleStatusChange} />
    </Wrap>
  );
};

export default AttendanceList;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${theme.color.gray[50]};
  border-radius: 12px;
`;

const UserInfoText = styled.p`
  font-size: ${theme.font.subTitle[3].size};
  font-weight: ${theme.font.subTitle[3].fontweight};
`;
