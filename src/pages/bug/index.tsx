import { BugImg, BugPost } from "@/apis/bug";
import { BugProp } from "@/apis/bug/type";
import Button from "@/components/button/button";
import Input from "@/components/input";
import Layout from "@/components/layout/layout";
import ImgModal from "@/components/modal/imgModal";
import { theme } from "@/styles/theme";
import React, { useState, ChangeEvent } from "react";
import { styled } from "styled-components";
import BugReportImg from "@/assets/svg/bugreport.svg";
import { useNavigate } from "react-router-dom";

const Bug = () => {
  const [data, setData] = useState<BugProp>({
    title: "",
    content: "",
    file_name: [],
  });

  const [modal, setModal] = useState<boolean>(false);
  const { mutate: BugImgMutate } = BugImg();
  const { mutate: BugReportMutate } = BugPost();

  const router = useNavigate();

  const bugReport = () => {
    BugReportMutate(data, {
      onSuccess: () => {
        router("/main");
      },
    });
  };

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

  const handleRemoveImage = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      file_name: prevData.file_name.filter((_, i) => i !== index),
    }));
  };

  return (
    <Layout title="" line={false}>
      <ContentWrap>
        <InputContent>
          <div>어디서 버그가 발생했나요?</div>
          <Input
            onChange={handleChange}
            type="text"
            name="title"
            value={data.title}
          />
        </InputContent>
        <InputContent>
          <div>버그에 대해 설명해주세요</div>
          <Explane
            onChange={handleChange}
            name="content"
            value={data.content}
          />
        </InputContent>
        <InputContent>
          <p>버그 사진을 첨부해주세요</p>
          {data.file_name.length === 0 ? (
            <>
              <ImgLabel
                htmlFor="file-input"
                onClick={() => {
                  setModal(true);
                }}
              >
                <img src={BugReportImg} alt="bug report icon" />
                <AddImgText>사진을 첨부해주세요</AddImgText>
              </ImgLabel>
            </>
          ) : (
            <>
              <AddImgWrap>
                <ImgLabel
                  htmlFor="file-input"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <img src={BugReportImg} alt="bug report icon" />
                </ImgLabel>
                <ImgContent>
                  {data.file_name.map((item, index) => (
                    <ImgWrap key={index}>
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_FILE_APP}${item}`}
                        key={index}
                      />
                      <DeleteImgButton onClick={() => handleRemoveImage(index)}>
                        삭제
                      </DeleteImgButton>
                    </ImgWrap>
                  ))}
                </ImgContent>
              </AddImgWrap>
            </>
          )}
          <ImgModal
            onClick={handleImgUpload}
            isOpen={modal}
            onClose={() => {
              setModal(!modal);
            }}
          />
        </InputContent>
      </ContentWrap>
      <ButtonContent>
        <Button width="100%" onClick={bugReport}>
          제보하기
        </Button>
      </ButtonContent>
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

const ImgContent = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 4px;
  width: 100%;
`;

const AddImgWrap = styled.div`
  display: flex;
  gap: 4px;
`;

const AddImgText = styled.p`
  font-size: ${theme.font.label[2].size};
  font-weight: ${theme.font.label[2].fontweight};
`;

const ImgLabel = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 32px;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 110px;
  border-radius: 6px;
  background-color: ${theme.color.gray[50]};
  border: 1px dashed ${theme.color.gray[500]};
  margin-bottom: 36px;
  min-width: 110px;
`;
const DeleteImgButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  white-space: nowrap;
  background-color: ${theme.color.normal.white};
  color: ${theme.color.error[800]};
  border-radius: 12px;
  padding: 4px 8px;
`;

const ImgWrap = styled.div`
  position: relative;
  min-width: 110px;
  height: 110px;
  overflow: hidden;
  border: 1px solid ${theme.color.gray[200]};
`;

const ButtonContent = styled.div`
  position: absolute;
  width: 87%;
  bottom: 30px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
