import styled from "@emotion/styled";

export const List = styled.div`
  height: 100%;
  background: #464650;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: auto;
  margin-bottom: 8px;
  position: relative;

  & > * {
    border-bottom: 1px solid gray;
  }
  & :last-child {
    border-bottom: 0;
  }
`;
