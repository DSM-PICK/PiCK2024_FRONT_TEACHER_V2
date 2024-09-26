import { theme } from "@/styles/theme";
import { styled } from "styled-components";

interface ButtonProps {
  width: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  error?: boolean;
}

const Button = ({
  width,
  children,
  disabled = false,
  onClick,
  error,
}: ButtonProps) => {
  return (
    <ButtonContainer
      error={error}
      width={width}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{ width: string; error?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: 14px;
  color: ${theme.color.normal.white};
  background-color: ${({ error }) =>
    error ? theme.color.error[500] : theme.color.main[500]};
  border-radius: 8px;

  font-size: ${theme.font.button[1].size};
  font-weight: ${theme.font.button[1].fontweight};

  &:hover {
    background-color: ${({ error }) =>
      error ? theme.color.error[800] : theme.color.main[300]};
  }

  &:active {
    background-color: ${({ error }) =>
      error ? theme.color.error[300] : theme.color.main[700]};
  }

  &:disabled {
    background-color: ${({ error }) =>
      error ? theme.color.error[50] : theme.color.main[100]};
  }
`;
