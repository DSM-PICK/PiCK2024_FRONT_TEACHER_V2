import { useLogin } from "@/apis/admin";
import Button from "@/components/button/button";
import Input from "@/components/input";
import { theme } from "@/styles/theme";
import { saveToken } from "@/utils/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Login = () => {
  const [adminId, setAdminId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate: login } = useLogin();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAdminIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminId(e.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      SubmitLogin();
    }
  };

  const router = useNavigate();

  const SubmitLogin = () => {
    login(
      { admin_id: adminId, password: password },
      {
        onSuccess: (res) => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;
          router("/main");
          saveToken(accessToken, refreshToken);
        },
      }
    );
  };

  const disabled = adminId === "" || password === "";

  return (
    <Container>
      <ContentWrap>
        <TextWrap>
          <LoginTitle>
            <HilightText>PiCK</HilightText>에 로그인하기
          </LoginTitle>
          <LoginSubTitle>스퀘어 계정으로 로그인 해주세요.</LoginSubTitle>
        </TextWrap>
        <InputWrap>
          <Input
            type="text"
            label="아이디"
            placeholder="아이디를 입력해주세요"
            onChange={handleAdminIdChange}
            name="admin_id"
            value={adminId}
          />
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
            name="password"
            value={password}
            onKeyDown={handleKeyDown}
          />
        </InputWrap>
      </ContentWrap>
      <Button width="100%" disabled={disabled} onClick={SubmitLogin}>
        로그인하기
      </Button>
    </Container>
  );
};

export default Login;

const LoginTitle = styled.p`
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
`;

const HilightText = styled.span`
  color: ${theme.color.main[500]};
`;

const LoginSubTitle = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
  color: ${theme.color.gray[600]};
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Container = styled.div`
  padding: 60px 24px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
