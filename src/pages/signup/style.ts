import { styled } from "styled-components";
import { theme } from "@/styles/theme";

export const SignupWrap = styled.div`
  padding: 60px 24px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 40px;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SignupText = styled.p`
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
`;

export const PiCKText = styled.span`
  color: ${theme.color.main[500]};
`;

export const SignupSubTitle = styled.p`
  font-size: ${theme.font.body[1].size};
  font-weight: ${theme.font.body[1].fontweight};
  color: ${theme.color.gray[600]};
`;

export const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AlignStart = styled.div`
  align-self: flex-start;
  width: 100%;
`;

export const Column10 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxRow = styled.label`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${theme.color.main[500]};
  cursor: pointer;
`;

export const DropdownRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const Error = styled.div`
  color: ${theme.color.error[500]};
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};
`;

export const FixedButtonWrap = styled.div`
  position: fixed;
  bottom: 24px;
  left: 0;
  width: 100%;
  padding: 0 24px;
  background-color: ${theme.color.normal.white};
`;
