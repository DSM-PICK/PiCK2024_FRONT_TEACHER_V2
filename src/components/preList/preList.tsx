import { theme } from "@/styles/theme";
import { styled } from "styled-components";

interface PreListProps {
  userInfo: string;
  application: number;
  earlyreturn: number;
  onClick: () => void;
}

const Prelist = ({
  userInfo,
  application,
  earlyreturn,
  onClick,
}: PreListProps) => {
  return (
    <Container onClick={onClick}>
      <div>{userInfo}</div>
      <CountWrap>
        <Wrap>
          <ApplicationBedge>외출</ApplicationBedge>
          {application}회
        </Wrap>
        <Wrap>
          <EarlyBedge>조기귀가</EarlyBedge>
          {earlyreturn}회
        </Wrap>
      </CountWrap>
    </Container>
  );
};

export default Prelist;

const Container = styled.div`
  background-color: ${theme.color.gray[50]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CountWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const EarlyBedge = styled.div`
  display: flex;
  padding: 2px 8px;
  background-color: ${theme.color.main[500]};
  color: ${theme.color.normal.white};
  border-radius: 8px;
`;

const ApplicationBedge = styled.div`
  display: flex;
  padding: 2px 8px;
  background-color: ${theme.color.main[300]};
  color: ${theme.color.normal.white};
  border-radius: 8px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
