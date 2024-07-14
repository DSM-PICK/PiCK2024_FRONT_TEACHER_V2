import { theme } from "@/styles/theme";
import { styled } from "styled-components";

interface OutRequestProps {
  userInfo: string;
  time: string;
  reason: string;
  selected: boolean;
  onClick: () => void;
}

const OutRequest = ({
  userInfo,
  time,
  reason,
  selected,
  onClick,
}: OutRequestProps) => {
  return (
    <Container selected={selected} onClick={onClick}>
      <Title>
        <UserInfoStyle>{userInfo}</UserInfoStyle>
        <TimeStyle>{time}</TimeStyle>
      </Title>
      <Reason>{reason}</Reason>
    </Container>
  );
};

export default OutRequest;

const Container = styled.div<{ selected: boolean }>`
  width: 100%;
  border: 2px solid
    ${({ selected }) =>
      selected ? theme.color.main[500] : theme.color.gray[50]};
  background-color: ${theme.color.gray[50]};
  border-radius: 12px;
  padding: 12px 16px;
`;

const Title = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

const UserInfoStyle = styled.p`
  font-size: ${theme.font.subTitle[3].size};
  font-weight: ${theme.font.subTitle[3].fontweight};
`;

const TimeStyle = styled.p`
  font-size: ${theme.font.body[4].size};
  color: ${theme.color.gray[900]};
`;

const Reason = styled.p`
  font-size: ${theme.font.body[4].size};
  font-weight: ${theme.font.body[4].fontweight};
  color: #1d2939;
`;
