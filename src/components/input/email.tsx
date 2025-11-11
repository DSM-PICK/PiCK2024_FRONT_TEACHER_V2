import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";

interface EmailInputProps {
  label: string;
  resendLabel?: string;
  onChange?: (value: string) => void;
  onButtonClick: () => void;
  disabled: boolean;
  mainText: string;
  subText: string;
  domain: string;
  placeholder: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.color.gray[50]};
  border: 1px solid
    ${({ disabled }) => (disabled ? theme.color.main[900] : "none")};
  border-radius: 8px;
  padding: 11px 16px;
  height: 48px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    border-color: ${({ disabled }) =>
      disabled ? "none" : theme.color.main[500]};
  }
`;

const Input = styled.input`
  display: flex;
  border: none;
  width: 100%;
  &::placeholder {
    font-size: ${theme.font.caption[2].size};
    font-weight: ${theme.font.caption[2].fontweight};
  }
  background-color: transparent;
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};
  &:hover {
    outline: none;
  }
  outline: none;
  caret-color: ${theme.color.main[500]};

  &:disabled {
    color: ${theme.color.gray[500]};
    cursor: not-allowed;
  }
`;

const Domain = styled.span`
  font-size: ${theme.font.caption[2].size};
  font-weight: ${theme.font.caption[2].fontweight};
  color: ${theme.color.gray[300]};
`;

const ResendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 20px;
  background: ${theme.color.main[50]};
  color: ${theme.color.main[900]};
  border: none;
  border-radius: 5px;
  font-size: ${theme.font.caption[2].size};
  font-weight: ${theme.font.caption[2].fontweight};
  cursor: pointer;
  margin-left: 32px;

  &:hover {
    background: ${theme.color.main[100]};
  }

  &:disabled {
    background: ${theme.color.gray[100]};
    color: ${theme.color.gray[400]};
    cursor: not-allowed;
  }
`;

export const EmailInput = ({
  label = "이메일",
  onChange,
  onButtonClick,
  disabled = false,
  mainText,
  subText,
  domain,
  placeholder,
}: EmailInputProps) => {
  const [changeText, setChangeText] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange?.(val);
    setValue(val);
  };

  const handleButtonClick = () => {
    if (onButtonClick && value) {
      onButtonClick();
      setChangeText(true);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper disabled={disabled}>
        <Input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
        <Domain>{domain}</Domain>
        <ResendButton onClick={handleButtonClick}>
          {changeText ? subText : mainText}
        </ResendButton>
      </Wrapper>
    </Container>
  );
};
