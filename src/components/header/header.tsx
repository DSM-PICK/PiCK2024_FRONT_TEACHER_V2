import TextLogo from "@/assets/svg/PiCKtextLogo.svg";
import MenuBar from "@/assets/svg/menubar.svg";
import { styled } from "styled-components";
import Sidebar from "@/components/sidebar/sidebar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeacherinfo } from "@/apis/admin";
import useHomeRoomInformation from "@/stores/hoomroom";
import { theme } from "@/styles/theme";

const Header = () => {
  const [menuModalOpen, setMenuModalOpen] = useState<boolean>(false);

  const router = useNavigate();
  const { teacherInfo } = useHomeRoomInformation();

  const menuModalRef = useRef<HTMLDivElement>(null);

  const MenuOnClick = () => {
    setMenuModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuModalRef.current &&
      !menuModalRef.current.contains(event.target as Node)
    ) {
      setMenuModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuModalOpen]);

  return (
    <HeaderWrap>
      <LeftContent>
        <img
          onClick={() => {
            router("/main");
          }}
          src={TextLogo}
          alt=""
        />
        <TeacherText>{teacherInfo?.name} 선생님</TeacherText>
      </LeftContent>
      <img
        src={MenuBar}
        alt=""
        onClick={() => {
          setMenuModalOpen(true);
        }}
      />
      {menuModalOpen && (
        <div ref={menuModalRef}>
          <Sidebar onClick={MenuOnClick} />
        </div>
      )}
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 6%;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TeacherText = styled.p`
  font-size: ${theme.font.label[2].size};
  font-weight: ${theme.font.label[2].fontweight};
`;
