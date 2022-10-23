import styled from "@emotion/styled";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 0px;
  min-width: 80px;
  min-height: 48px;

  box-sizing: border-box;
  border-radius: 8px;

  transition: all 0.2s;

  user-select: none;

  cursor: pointer;

  color: white;

  border: 0;

  font-size: 14px;

  background-color: #6b6b7a;

  &:disabled {
    opacity: 0.5;

    &:hover {
      cursor: default;
      background-color: #6b6b7a !important;
    }
  }
`;

export const NoButton = styled(Button)`
  flex: 1;
  &:hover {
    background-color: #d13838;
  }
`;

export const OkButton = styled(Button)`
  flex: 2;
  &:hover {
    background-color: #747bff;
  }
`;
