import { useNavigate } from "react-router-dom";
// import Button from "./components/button";
import Button from "../../components/button";
import styled from "styled-components";

const NotFound = () => {
  const router = useNavigate();
  return (
    <Container>
      <h1>404 Not Found</h1>
      <Button width="100" onClick={() => router("/main")}>
        메인으로 가기
      </Button>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
`;
