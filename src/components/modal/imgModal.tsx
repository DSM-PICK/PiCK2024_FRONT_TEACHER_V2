import React, { useState, useRef } from "react";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";
import Button from "../button/button";

interface ImgModalProp {
  isOpen: boolean;
  onClose: () => void;
  onClick: (images: File[]) => void;
}

export const ImgModal = ({ isOpen, onClick, onClose }: ImgModalProp) => {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const pasteDivRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = Array.from(e.clipboardData.items);
    const pastedFiles = items
      .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (pastedFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...pastedFiles]);
    }

    if (pasteDivRef.current) {
      pasteDivRef.current.innerHTML = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onCancle = () => {
    onClose();
    setImages([]);
  };

  const AddImg = () => {
    onClick(images);
    setImages([]);
    onClose();
  };

  return (
    <ImgModalContainer>
      <ImgModalContent>
        <CloseButton onClick={onCancle}> &times;</CloseButton>
        <ImgDragContent
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          htmlFor="imgDrag"
        >
          <CameraIcon>&#128247;</CameraIcon>
          이미지를 끌어오거나 업로드 할 파일을 선택해주세요
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
            id="imgDrag"
            multiple
          />
        </ImgDragContent>
        <OtherContent>
          <Line />
          <OtherText>또는</OtherText>
        </OtherContent>
        <ImgInput
          contentEditable="true"
          ref={pasteDivRef}
          onPaste={handlePaste}
        >
          이미지를 복사붙여넣기 해주세요
        </ImgInput>
        <Imgcontent>
          {images.map((image, index) => (
            <ImgContainer key={index} className="relative">
              <Img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
              <ImgDeleteButton onClick={() => handleRemoveImage(index)}>
                &times;
              </ImgDeleteButton>
            </ImgContainer>
          ))}
        </Imgcontent>
        <Button onClick={AddImg} width="max">
          추가
        </Button>
      </ImgModalContent>
    </ImgModalContainer>
  );
};

export default ImgModal;

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100px;
`;

const Imgcontent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 16px 0px;
  gap: 8px;
  width: 100%;
`;

const ImgDeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  color: ${theme.color.normal.white};
  background-color: ${theme.color.normal.black};
  border-radius: 50%;
  padding: 4px 8px;
`;

const Img = styled.img`
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const ImgModalContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0px;
  backdrop-filter: blur(1px);
`;

const ImgModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  background-color: ${theme.color.normal.white};
  border-radius: 12px;
  padding: 16px;
`;

const CloseButton = styled.button`
  background-color: #00000000;
  color: ${theme.color.gray[300]};
  font-size: ${theme.font.heading[2].size};
`;

const ImgDragContent = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.gray[50]};
  border: 2px dashed ${theme.color.gray[200]};
  border-radius: 12px;
  padding: 24px 16px;
`;

const CameraIcon = styled.div`
  font-size: 24px;
`;

const OtherContent = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0px;
  background-color: aliceblue;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  border: 1px solid ${theme.color.gray[200]};
`;

const OtherText = styled.p`
  position: absolute;
  background-color: ${theme.color.normal.white};
  left: 44%;
  top: -14px;
  padding: 4px;
  color: ${theme.color.gray[200]};
`;

const ImgInput = styled.div`
  width: 100%;
  border: 1px solid ${theme.color.gray[100]};
  padding: 8px;
  border-radius: 8px;
`;
