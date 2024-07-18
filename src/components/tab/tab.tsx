import { theme } from "@/styles/theme";
import { styled } from "styled-components";
import { useState } from "react";

interface TabProp {
  content: string[];
  onClick: (index: number) => void;
  selectedIndex: number;
}

const Tab = ({ content, onClick, selectedIndex }: TabProp) => {
  return (
    <TabContainer>
      {content.map((item, index) => (
        <EachTab
          key={index}
          selected={index === selectedIndex}
          onClick={() => onClick(index)}
        >
          {item}
        </EachTab>
      ))}
    </TabContainer>
  );
};

export default Tab;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const EachTab = styled.div<{ selected: boolean }>`
  width: 30%;
  text-align: center;
  font-size: ${theme.font.subTitle[3].size};
  font-weight: ${theme.font.subTitle[3].fontweight};
  color: ${({ selected }) =>
    selected ? theme.color.main[500] : theme.color.gray[500]};
  cursor: pointer;
  border-bottom: 1px solid
    ${({ selected }) =>
      selected ? theme.color.main[500] : theme.color.normal.white};
  padding-bottom: 8px;
`;
