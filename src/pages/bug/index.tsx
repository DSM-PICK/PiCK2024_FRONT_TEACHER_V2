import { BugImg } from "@/apis/bug";
import { BugProp } from "@/apis/bug/type";
import Input from "@/components/input";
import Layout from "@/components/layout/layout";
import ImgModal from "@/components/modal/imgModal";
import { theme } from "@/styles/theme";
import React, { useState, ChangeEvent } from "react";
import { styled } from "styled-components";

const Bug = () => {
  const [data, setData] = useState<BugProp>({
    title: "",
    content: "",
    file_name: [],
  });

  const [modal, setModal] = useState<boolean>(false);
  const { mutate: BugImgMutate } = BugImg();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImgUpload = async (images: File[]) => {
    try {
      const response = await BugImgMutate(
        { file: images },
        {
          onSuccess: (data) => {
            setData((prevData) => ({
              ...prevData,
              file_name: data,
            }));
          },
        }
      );

      console.log("Uploaded:", response);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Layout title="" line={false}>
      <div>어디서 버그가 발생했나요?</div>
      <Input
        onChange={handleChange}
        type="text"
        name="title"
        value={data.title}
      />
      <div>버그에 대해 설명해주세요</div>
      <Explane onChange={handleChange} name="content" value={data.content} />
      <div>버그 사진을 첨부해주세요</div>
      <ImgInput type="file" />
      <ImgModal
        onClick={handleImgUpload}
        isOpen={modal}
        onClose={() => {
          setModal(!modal);
        }}
      />
    </Layout>
  );
};

export default Bug;

const Explane = styled.textarea`
  width: 100%;
  height: 120px;
  border: none;
  background-color: ${theme.color.gray[50]};
  padding: 16px;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${theme.color.main[500]};
    outline: ${theme.color.main[100]};
  }
`;

const ImgInput = styled.input``;
