import { theme } from "@/styles/theme";
import { useState } from "react";
import { styled } from "styled-components";
import EyeOff from "@/assets/svg/eye-off.svg";
import EyeOpen from "@/assets/svg/eye.svg";
interface InputProp {
  label?: string;
  type: "text" | "password" | "textarea";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const Input = ({
  label,
  type,
  placeholder,
  onChange,
  name,
  value,
  onKeyDown,
  error,
}: InputProp) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <InputContainer error={error}>
        <InputContent
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          name={name}
          value={value}
          autoComplete="off"
        />
        {type === "password" && (
          <EyesContainer onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <img src={EyeOpen} alt="" />
            ) : (
              <img src={EyeOff} alt="" />
            )}
          </EyesContainer>
        )}
      </InputContainer>
    </Container>
  );
};

export default Input;

const InputContainer = styled.div<{ error?: boolean }>`
  display: flex;
  width: 100%;
  border-radius: 8px;
  padding: 11px 16px;
  background-color: ${theme.color.gray[50]};
  border: 1px solid
    ${({ error }) => (error ? theme.color.error[500] : theme.color.gray[50])};

  &:hover {
    border: 1px solid ${theme.color.main[500]};
  }

  &:focus-within {
    border: 1px solid ${theme.color.main[500]};
  }
`;

const InputContent = styled.input`
  display: flex;
  border: none;
  width: 100%;

  background-color: ${theme.color.gray[50]};
  outline: none;

  border: 1px solid ${theme.color.gray[50]};
  caret-color: ${theme.color.main[500]};

  &::placeholder {
    font-size: ${theme.font.caption[2].size};
    font-weight: ${theme.font.caption[2].fontweight};
  }
`;

const InputLabel = styled.label`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

const EyesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
