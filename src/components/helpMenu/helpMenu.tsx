import { styled } from "styled-components";
import { theme } from "@/styles/theme";
import React, { useState } from "react";
import HelpContent from "../helpContent/helpcontent";
import Alarm from "@/assets/svg/alram.svg";
import Face from "@/assets/svg/face.svg";
import Bug from "@/assets/svg/bug.svg";
import Out from "@/assets/svg/out.svg";
import { useNavigate } from "react-router-dom";
import { cookie } from "@/utils/auth";

const HelfMenu = () => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  const Logout = () => {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    localStorage.clear();
    navigate("/");
  };

  return (
    <AlarmWrap>
      {/* <TestTitle>알림</TestTitle>
      <HelpContent
        onClick={() => {
          navigate("/alarm");
        }}
        content="알림"
        icon={<img src={Alarm} alt="" />}
      /> */}
      <TestTitle>도움말</TestTitle>
      <HelpContent
        onClick={() => {
          navigate("/calendar");
        }}
        content="자습감독 선생님 확인"
        icon={<img src={Face} />}
      />
      <HelpContent
        onClick={() => {
          navigate("/bugReport");
        }}
        content="버그 제보"
        icon={<img src={Bug} alt="" />}
      />
      <TestTitle>계정</TestTitle>
      <HelpContent
        onClick={() => {
          Logout();
        }}
        content="로그아웃"
        icon={<img src={Out} alt="" />}
      />
    </AlarmWrap>
  );
};

export default HelfMenu;

export const TestTitle = styled.div`
  width: max-content;
  padding: 12px 24px;
  display: flex;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.gray[400]};
`;

export const AlarmWrap = styled.div`
  background-color: ${theme.color.normal.white};
`;
