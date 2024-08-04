"use client";
import React, { useEffect, useRef, useState } from "react";
import arrow from "@/assets/svg/leftarrow.svg";
import downarrow from "@/assets/svg/downarrow.svg";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";
import { Option } from "@/types/dropdown";

interface DropdownProp {
  options: Option[];
  value: string | number;
  changeHandler: (value: string | number) => void;
}

const Dropdown = ({ options, value, changeHandler }: DropdownProp) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option, event: React.MouseEvent) => {
    event.stopPropagation();
    changeHandler(option.value);
    setIsDropdownVisible(false);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      <DropdownContent onClick={toggleDropdown}>
        {selectedLabel}
        <img
          src={isDropdownVisible ? `${downarrow}` : `${arrow}`}
          alt="arrow"
          width={12}
          height={12}
        />
      </DropdownContent>
      {isDropdownVisible && (
        <DropList>
          {options.map((option) => (
            <Content
              key={option.value}
              onClick={(event) => handleOptionClick(option, event)}
            >
              {option.label}
            </Content>
          ))}
        </DropList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  width: auto;
`;

const DropdownContent = styled.div`
  white-space: nowrap;
  border: 1px solid ${theme.color.gray[200]};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #475467;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropList = styled.div`
  position: absolute;
  width: 100%;
  max-height: 120px;
  background-color: ${theme.color.normal.white};
  font-size: 12px;
  border: 1px solid ${theme.color.gray[200]};
  border-radius: 8px;
  overflow-y: scroll;
  z-index: 5;
`;

const Content = styled.div`
  padding: 4px 12px;
  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;
