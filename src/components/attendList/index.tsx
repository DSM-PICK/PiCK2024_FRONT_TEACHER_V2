import { theme } from "@/styles/theme";
import { styled } from "styled-components";
import StatusDrop from "../dropdown/state/stateDrop";
import { useState } from "react";
import { FixStatus } from "@/apis/attendance";

interface AttendanceListProps {
  userInfo: string;
  status: string;
  id: string;
  period: number;
}

const AttendanceList = ({
  userInfo,
  status,
  id,
  period,
}: AttendanceListProps) => {
  const [state, setState] = useState<string>(status);
  const { mutate: attendanceSave } = FixStatus();

  const AttandenceSaveFn = async (newStatus: string) => {
    attendanceSave({
      period: period,
      data: [
        {
          user_id: id,
          status: newStatus,
        },
      ],
    });
  };

  const handleStatusChange = async (option: string) => {
    try {
      setState(option);
      await AttandenceSaveFn(option);
    } catch (error) {
      setState(state);
    }
  };

  return (
    <Wrap>
      <UserInfoText>{userInfo}</UserInfoText>
      <StatusDrop status={state} onChange={handleStatusChange} />
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
