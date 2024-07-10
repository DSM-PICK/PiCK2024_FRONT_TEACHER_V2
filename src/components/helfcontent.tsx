import { theme } from "@/styles/theme";
import React from "react";
import { styled } from "styled-components";

interface HelpContentProp {
  icon: React.ReactNode;
  content: string;
  onClick: () => void;
}

export const HelpContent = ({ icon, content, onClick }: HelpContentProp) => {
  return (
    <HelpMenuContent onClick={onClick}>
      {icon}
      {content}
    </HelpMenuContent>
  );
};

export default HelpContent;

const HelpMenuContent = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 24px;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.normal.black};
  cursor: pointer;
  &:hover {
    background-color: ${theme.color.main[50]};
  }
  &:active {
    background-color: ${theme.color.main[100]};
  }
`;
