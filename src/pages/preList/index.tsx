import { StoryAll } from "@/apis/story";
import SearchInput from "@/components/input/search";
import Layout from "@/components/layout/layout";
import Prelist from "@/components/preList/preList";
import { getStudentString } from "@/utils/util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const PreviousList = () => {
  const { data: AllData } = StoryAll();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useNavigate();

  const handleInputChange = (text: string) => {
    setSearchTerm(text);
  };

  const filteredStudents = AllData?.filter((item) => {
    const studentString = getStudentString(item).toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      studentString.includes(searchLower) ||
      getStudentString(item).toString().includes(searchLower)
    );
  });

  return (
    <Layout title="이전 외출 기록">
      <Container>
        <SearchInput
          placeholder="외출 기록을 볼 학생의 이름 또는 학번"
          name=""
          value={searchTerm}
          onChange={handleInputChange}
        />
        {filteredStudents?.map((item) => (
          <Prelist
            onClick={() => {
              router(`${item.id}`);
            }}
            userInfo={getStudentString(item)}
            application={item.application_cnt}
            earlyreturn={item.early_return_cnt}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default PreviousList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
