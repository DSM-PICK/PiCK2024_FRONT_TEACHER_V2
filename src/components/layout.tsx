import { styled } from "styled-components";
import Header from "./header";
import React from "react";
import { theme } from "@/styles/theme";

interface layoutProp {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

const Layout = ({ children, title, subtitle, right }: layoutProp) => {
  return (
    <LayoutStyle>
      <Header />
      <ContentWrap>
        <Top>
          <TopLeft>
            <Title> {title}</Title>
            <SubTitle> {subtitle}</SubTitle>
          </TopLeft>
          <TopRight>{right}</TopRight>
        </Top>
        <Line />
        {children}
      </ContentWrap>
    </LayoutStyle>
  );
};

export default Layout;

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: ${theme.font.label[1].size};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const TopRight = styled.div`
  display: flex;
  gap: 10px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.gray[200]};
`;

const SubTitle = styled.p`
  font-size: ${theme.font.body[1].size};
  color: ${theme.color.gray[700]};
`;

const ContentWrap = styled.div`
  padding: 0px 6%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
