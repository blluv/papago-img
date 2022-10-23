import styled from "@emotion/styled";

export const Item = styled.div`
  width: 100%;

  padding: 16px;
  box-sizing: border-box;

  transition: background-color 0.1s;

  user-select: none;

  cursor: pointer;

  &:hover {
    background: #6b6b7a;
  }
`;
