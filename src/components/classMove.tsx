import { theme } from "@/styles/theme";
import { styled } from "styled-components";
import NextIcon from "@/assets/svg/arrow-narrow-right.svg";

interface ClassMoveProps {
  userInfo: string;
  time: string;
  pre: string;
  next: string;
  selected: boolean;
  onClick: () => void;
}

const ClassMove = ({
  userInfo,
  time,
  pre,
  next,
  selected,
  onClick,
}: ClassMoveProps) => {
  return (
    <ClassMoveContainer selected={selected} onClick={onClick}>
      <TopWrap>
        <UserText>{userInfo}</UserText>
        <Time>{time}</Time>
      </TopWrap>
      <BottomWrap>
        <PreTitle>{pre}</PreTitle>
        <img src={NextIcon} alt="" />
        <NextBedge>{next}</NextBedge>
      </BottomWrap>
    </ClassMoveContainer>
  );
};

export default ClassMove;

const ClassMoveContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  background-color: ${theme.color.gray[50]};
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid
    ${({ selected }) =>
      selected ? theme.color.main[500] : theme.color.gray[50]};
  cursor: pointer; // Add cursor to indicate clickable element
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BottomWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UserText = styled.p`
  font-size: ${theme.font.subTitle[3].size};
  font-weight: ${theme.font.subTitle[3].fontweight};
`;

const Time = styled.p`
  font-size: ${theme.font.body[4].size};
  font-weight: ${theme.font.body[4].fontweight};
  color: ${theme.color.gray[900]};
`;

const NextBedge = styled.div`
  padding: 6px 12px;
  background-color: ${theme.color.main[300]};
  border-radius: 14px;
  color: ${theme.color.normal.white};
  font-size: ${theme.font.body[3].size};
  font-weight: ${theme.font.body[3].fontweight};
`;

const PreTitle = styled.p`
  font-size: ${theme.font.body[3].size};
  font-weight: ${theme.font.body[3].fontweight};
  color: #1d2939;
`;
