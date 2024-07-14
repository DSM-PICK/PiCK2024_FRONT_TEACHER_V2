"use client";
import React, { useEffect, useRef, useState } from "react";
import arrow from "@/assets/svg/leftarrow.svg";
import downarrow from "@/assets/svg/downarrow.svg";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";

interface DropdownProp {
  type: "grade" | "class" | "floor" | "classTime" | "club" | "all";
  homeRoom?: boolean;
  onChange?: (option: number) => void;
}

const Dropdown: React.FC<DropdownProp> = ({ type, onChange, homeRoom }) => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<number>(1);
  const [selectedClassOption, setSelectedClassOption] = useState<number>(1);
  const [selectedFloorOption, setSelectedFloorOption] = useState<number>(5);
  const [selectedClubOption, setSelectedClubOption] =
    useState<string>("세미나실 2-1(대동여지도)");
  const [selectedAllOption, setSelectedAllOption] = useState<number>(5);
  const [selectedClassTime, setSelectedClassTime] = useState<number>(8);
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

  const handleOptionClick = (option: any) => {
    if (onChange) {
      onChange(option.value);

      switch (type) {
        case "grade":
          setSelectedGradeOption(option.value);
          break;
        case "all":
          setSelectedAllOption(option.value);
          break;
        case "class":
          setSelectedClassOption(option.value);
          break;
        case "classTime":
          setSelectedClassTime(option.value);
          break;
        case "club":
          setSelectedClubOption(option.label);
          break;
        case "floor":
          setSelectedFloorOption(option.value);
          break;
        default:
          break;
      }
    }
    setIsDropdownVisible(false);
  };

  const generateOptions = (options: any[]) => {
    return options.map((option) => (
      <Content key={option} onClick={() => handleOptionClick(option)}>
        {option.label}
      </Content>
    ));
  };

  useEffect(() => {
    if (homeRoom) {
      const grade = parseInt(localStorage.getItem("grade") || "1", 10);
      const class_num = parseInt(localStorage.getItem("class_num") || "1", 10);
      const setgrade = grade === 0 ? 5 : grade;
      const setclass_num = class_num === 0 ? 1 : class_num;
      if (type === "all") {
        setSelectedAllOption(setgrade);
      }
      setSelectedGradeOption(setgrade);
      setSelectedClassOption(setclass_num);
    }
  }, []);

  const floorOptions = [
    { value: 2, label: "2층" },
    { value: 3, label: "3층" },
    { value: 4, label: "4층" },
    { value: 5, label: "전체" },
  ];

  const AllOption = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
    { value: 5, label: "전체" },
  ];

  const gradeOptions = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
  ];

  const classOptions = [
    { value: 1, label: "1반" },
    { value: 2, label: "2반" },
    { value: 3, label: "3반" },
    { value: 4, label: "4반" },
  ];

  const clubOptions = [
    { value: "자습", label: "3-1교실(자습)" },
    { value: "대동여지도", label: "세미나실 2-1(대동여지도)" },
    { value: "DMS", label: "세미나실 2-2(DMS)" },
    { value: "gram", label: "세미나실 2-3(gram)" },
    { value: "Liear", label: "세미나실 2-4(Liear)" },
    { value: "gram1", label: "3-2교실(gram)" },
    { value: "EXIT", label: "소개1실(EXIT)" },
    { value: "Lift", label: "소개2실(Lift)" },
    { value: "DMS3학년", label: "소개 3실(DMS 3학년)" },
    { value: "자습", label: "2-1교실(자습)" },
    { value: "Log", label: "세미나실 3-1(Log)" },
    { value: "은하", label: "세미나실 3-2(은하)" },
    { value: "PiCK", label: "세미나실 3-3(PiCK)" },
    { value: "어게인", label: "보안 1실(어게인)" },
    { value: "info", label: "보안 2실(info)" },
    { value: "TeamQSS", label: "세미나실 4-1(TeamQSS)" },
    { value: "NoNamed", label: "세미나실 4-2(NoNamed)" },
    { value: "Modeep", label: "세미나실 4-3(Modeep)" },
    { value: "자습", label: "1-1교실(자습)" },
  ];

  const classTimeOption = [
    { value: 6, label: "6교시" },
    { value: 7, label: "7교시" },
    { value: 8, label: "8교시" },
    { value: 9, label: "9교시" },
    { value: 10, label: "10교시" },
  ];

  const options = () => {
    switch (type) {
      case "all":
        return AllOption;
      case "class":
        return classOptions;
      case "classTime":
        return classTimeOption;
      case "club":
        return clubOptions;
      case "floor":
        return floorOptions;
      case "grade":
        return gradeOptions;
      default:
        return [];
    }
  };

  const getDisplayText = () => {
    switch (type) {
      case "grade":
        return `${selectedGradeOption}학년`;
      case "class":
        return `${selectedClassOption}반`;
      case "floor":
        return selectedFloorOption === 5 ? `전체` : `${selectedFloorOption}층`;
      case "all":
        return selectedAllOption === 5 ? `전체` : `${selectedAllOption}학년`;
      case "classTime":
        return `${selectedClassTime}교시`;
      case "club":
        return selectedClubOption;
      default:
        return "";
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownContent onClick={toggleDropdown}>
        {getDisplayText()}
        <img
          src={isDropdownVisible ? `${downarrow}` : `${arrow}`}
          alt="arrow"
          width={12}
          height={12}
        />
      </DropdownContent>
      {isDropdownVisible && <DropList>{generateOptions(options())}</DropList>}
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
`;

const Content = styled.div`
  padding: 4px 12px;
  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;
