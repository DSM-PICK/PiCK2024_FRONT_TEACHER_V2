import moveIcon from "@/assets/svg/moveClass.svg";
import outAccept from "@/assets/svg/outAccept.svg";
import outList from "@/assets/svg/outList.svg";
import pre from "@/assets/svg/previousList.svg";
import after from "@/assets/svg/afterSchool.svg";
import major from "@/assets/svg/majorClub.svg";
import self from "@/assets/svg/selfStudy.svg";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";

interface RouterButtonType {
  router: string;
  icon: string;
  title: string;
}

const RouterButton = () => {
  const router: RouterButtonType[] = [
    {
      router: "/moveClassRoom",
      icon: moveIcon,
      title: "교실 이동",
    },
    {
      router: "/outAccept",
      icon: outAccept,
      title: "외출 수락",
    },
    {
      router: "/outList",
      icon: outList,
      title: "외출자 목록",
    },
    {
      router: "/previousList",
      icon: pre,
      title: "이전 외출 기록",
    },
    // {
    //   router: "/afterSchool",
    //   icon: after,
    //   title: "방과후 관리",
    // },
    // {
    //   router: "/majorClub",
    //   icon: major,
    //   title: "전공동아리 관리",
    // },
    {
      router: "/attendance",
      icon: self,
      title: "자습 출결",
    },
  ];

  return (
    <>
      {router.map((item) => (
        <Router to={item.router}>
          <Title>{item.title}</Title>
          <Icon src={item.icon} alt="" width={48} height={48} />
        </Router>
      ))}
    </>
  );
};

export default RouterButton;

const Router = styled(Link)`
  width: 46%;
  height: 112px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: ${theme.color.normal.black};
  background-color: ${theme.color.gray[50]};
  align-content: space-between;
  padding: 12px;
  border-radius: 12px;
  justify-content: space-between;
  @media (max-width: 312px) {
    width: 100%;
  }
`;

const Title = styled.p`
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};
  text-decoration: none;
`;

const Icon = styled.img`
  display: flex;
  align-self: flex-end;
`;
