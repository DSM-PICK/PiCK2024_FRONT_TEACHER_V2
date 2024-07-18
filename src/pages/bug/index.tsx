import Header from "@/components/header/header";
import Input from "@/components/input";
import Layout from "@/components/layout/layout";
import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { styled } from "styled-components";

const Bug = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [img, setImg] = useState<string[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Layout title="" line={false}>
      <div>어디서 버그가 발생했나요?</div>
      <Input onChange={handleTitleChange} type="text" name="" value={title} />
      <div>버그에 대해 설명해주세요</div>
      <Explane />
      <div>버그 사진을 첨부해주세요</div>
      <ImgInput type="file" />
    </Layout>
  );
};

export default Bug;

const Explane = styled.textarea`
  width: 100%;
  height: 120px;
  border: none;
  background-color: ${theme.color.gray[50]};
  &:focus {
    border: none;
  }
`;

const ImgInput = styled.input``;
