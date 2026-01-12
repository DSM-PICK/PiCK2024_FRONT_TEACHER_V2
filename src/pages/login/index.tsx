import { useLogin } from "@/apis/admin";
import Button from "@/components/button/button";
import Input from "@/components/input";
import { requestPermission } from "@/firebase";
import { theme } from "@/styles/theme";
import { cookie, saveToken } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";

const Login = () => {
  const [adminId, setAdminId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate: login, isPending: isLoggingIn } = useLogin();

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
      submitLogin();
    }
  };

  const router = useNavigate();

  useEffect(() => {
    const refreshToken = cookie.get("refresh_token");
    if (refreshToken) {
      router("/main");
    }
  }, [router]);

  const submitLogin = async () => {
    if (isLoggingIn) return;
    const token = await requestPermission();
    if (!token) {
      toast.error("알림 수신에 거부하셨습니다");
    }
    if (!token) {
      return;
    }
    login(
      { admin_id: adminId, password: password, device_token: token ?? "" },
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

  const disabled = adminId === "" || password === "" || isLoggingIn;

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
        <p>
          계정이 없으신가요?
          <LinkText onClick={() => router("/signup")}>회원가입</LinkText>
        </p>
      </ContentWrap>
      <Button width="100%" disabled={disabled} onClick={submitLogin}>
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

export const LinkText = styled.span`
  margin-left: 2px;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.main[500]};
  &:active {
    color: ${theme.color.main[900]};
    text-decoration: underline;
  }
`;
