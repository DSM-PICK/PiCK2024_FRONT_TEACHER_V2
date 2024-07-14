import { theme } from "@/styles/theme";
import styled from "styled-components";
import SearchIcon from "@/assets/svg/search.svg";

interface SearchInputProps {
  placeholder: string;
  onChange: (text: string) => void;
  name: string;
  value: string;
}

const SearchInput = ({
  placeholder,
  onChange,
  name,
  value,
}: SearchInputProps) => {
  return (
    <InputContainer>
      <img src={SearchIcon} alt="search" />
      <InputContent
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};

export default SearchInput;

const InputContent = styled.input`
  display: flex;
  border: none;
  width: 100%;
  background-color: ${theme.color.main[50]};
  outline: none;
  border: 1px solid ${theme.color.main[50]};
  caret-color: ${theme.color.main[500]};

  &::placeholder {
    font-size: ${theme.font.caption[2].size};
    font-weight: ${theme.font.caption[2].fontweight};
  }
`;

const InputContainer = styled.div`
  position: sticky;
  top: 3%;
  display: flex;
  width: 100%;
  border-radius: 8px;
  padding: 11px 16px;
  background-color: ${theme.color.main[50]};
  border: 1px solid ${theme.color.main[50]};
  gap: 12px;

  &:hover {
    border: 1px solid ${theme.color.main[500]};
  }

  &:focus-within {
    border: 1px solid ${theme.color.main[500]};
  }
`;
