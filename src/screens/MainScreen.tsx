import { useContext } from "react";

import { ButtonGroup } from "../components/ButtonGroup";
import { NoButton, OkButton } from "../components/Buttons";
import { List } from "../components/List";
import { Item as FileItem } from "../components/Item";
import styled from "@emotion/styled";
import { PageTransition } from "../components/PageAnimator";
import { Container } from "../components/Container";
import { FileListContext } from "../contexts/FileListContext";
import { useNavigate } from "react-router-dom";
import { extractFileExtension } from "../utils/fileUtils";
import { allowFileExts } from "../constants";
import { translatePapago } from "../papago";

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: row;
`;

const DropArea = styled.div`
  background: #747bff;

  flex: 1;
  height: 100%;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const RightPanel = styled.div`
  flex: 2;
  height: 100%;

  margin-left: 8px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const NoFile = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(163, 163, 163);
  user-select: none;
  cursor: default;
`;

const DropText = styled.div`
  display: flex;
  flex-direction: column;

  font-weight: 500;

  word-spacing: -1px;
  line-height: 16px;

  user-select: none;

  text-align: center;
`;

export function MainScreen() {
  const { fileList, setFileList } = useContext(FileListContext);

  const navigate = useNavigate();

  return (
    <PageTransition>
      <MainContainer
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
        }}
      >
        <DropArea
          onDrop={(e) => {
            e.preventDefault();
            setFileList((current) => [...current, ...Array.from<File>(e.dataTransfer?.files).filter((file) => allowFileExts.includes(extractFileExtension(file.name)))]);

            // console.log(translatePapago("", "ko", e.dataTransfer?.files[0], true).then((res) => console.log(res)));
          }}
        >
          <DropText>파일을 여기에 드롭해주세요</DropText>
        </DropArea>

        <RightPanel>
          <List>
            {fileList.map((file, idx) => (
              <FileItem
                key={idx}
                onClick={() => {
                  setFileList(fileList.filter((_, i) => i !== idx));
                }}
              >
                {file.name}
              </FileItem>
            ))}

            {fileList.length <= 0 && <NoFile>파일이 없습니다</NoFile>}
          </List>
          <ButtonGroup>
            <NoButton
              disabled={fileList.length <= 0}
              onClick={() => {
                setFileList([]);
              }}
            >
              모두 지우기
            </NoButton>

            <OkButton
              disabled={fileList.length <= 0}
              onClick={() => {
                navigate("/settings");
              }}
            >
              확인
            </OkButton>
          </ButtonGroup>
        </RightPanel>
      </MainContainer>
    </PageTransition>
  );
}
