import { theme } from "@/styles/theme";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

interface StatusProps {
  status: string;
  onChange?: (option: string) => void;
}

const StatusDrop = ({ status, onChange }: StatusProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(status);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const attendanceOptions = [
    { value: "ATTENDANCE", label: "출석" },
    { value: "GO_OUT", label: "외출" },
    { value: "MOVEMENT", label: "이동" },
    { value: "DISALLOWE", label: "무단" },
  ];

  const handleOptionClick = (option: any) => {
    if (onChange) {
      onChange(option.value);
    }
    setSelectedOption(option.value);
    setIsDropdownVisible(false);
  };

  const generateOptions = (options: any[]) => {
    return options.map((option) => (
      <Content key={option.value} onClick={() => handleOptionClick(option)}>
        {option.label}
      </Content>
    ));
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const getSelectedLabel = () => {
    const selected = attendanceOptions.find(
      (option) => option.value === selectedOption
    );
    return selected ? selected.label : status;
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownContent state={status} onClick={toggleDropdown}>
        {getSelectedLabel()}
      </DropdownContent>
      {isDropdownVisible && (
        <DropList>{generateOptions(attendanceOptions)}</DropList>
      )}
    </DropdownContainer>
  );
};

export default StatusDrop;

const DropdownContainer = styled.div`
  position: relative;
  width: auto;
`;

const DropdownContent = styled.div<{ state: string }>`
  white-space: nowrap;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 12px;
  color: ${theme.color.normal.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ state }) =>
    state === "ATTENDANCE"
      ? theme.color.main[500]
      : state === "GO_OUT"
        ? theme.color.main[500]
        : state === "MOVEMENT"
          ? theme.color.gray[800]
          : state === "DISALLOWE"
            ? theme.color.error[300]
            : theme.color.normal.white};
`;

const DropList = styled.div`
  position: absolute;
  width: 100%;
  max-height: 120px;
  background-color: ${theme.color.normal.white};
  font-size: 12px;
  border: 1px solid ${theme.color.gray[200]};
  border-radius: 8px;
  text-align: center;
  z-index: 1;
`;

const Content = styled.div`
  padding: 4px 12px;
  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;
