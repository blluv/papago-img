import styled from "@emotion/styled";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonGroup } from "../components/ButtonGroup";
import { OkButton } from "../components/Buttons";
import { Container } from "../components/Container";
import { PageTransition } from "../components/PageAnimator";
import { LogLine } from "../constants";
import { FileListContext } from "../contexts/FileListContext";
import asyncPool from "tiny-async-pool";
import { translatePapago } from "../papago";
import { writeBinaryFile } from "@tauri-apps/api/fs";
import forge from "node-forge";
const MainContainer = styled(Container)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogScreen = styled.div`
  background: black;
  width: 100%;
  flex: 1;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  padding: 8px;
  font-size: 14px;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  overflow-y: auto;
  scrollbar-width: 0;
`;

const LogItem = styled.code`
  word-wrap: break-word;
`;

export function ProcessingScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const [end, setEnd] = useState(false);

  const { fileList } = useContext(FileListContext);

  const logScreenRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const printLog = useCallback((msg: string) => {
    setLogs((current) => [...current, msg]);
  }, []);

  useEffect(() => {
    setLogs([]);
    const { source, target, savePath } = location.state;
    if (!source || !target || !savePath) {
      navigate("/", { replace: true });

      return;
    }

    printLog(LogLine);
    printLog(`date: ${new Date().toLocaleString()}`);
    printLog(`source: ${source}`);
    printLog(`target: ${target}`);
    printLog(`savePath: ${savePath}`);
    printLog(`files: ${fileList.length}`);
    printLog(LogLine);

    (async () => {
      for await (const res of asyncPool(2, fileList, async (file) => {
        printLog(`START ${file.name}`);
        try {
          return {
            file,
            resp: await translatePapago(source, target, file, source === "auto"),
          };
        } catch (e: any) {
          printLog(`ERROR ${file.name} ${e.message}`);
          return null;
        }
      })) {
        if (!res) continue;
        if (typeof res.resp.errorCode === "string") {
          printLog(`WARNING ${res.file.name} ${res.resp.errorMessage}`);
          writeBinaryFile((savePath as string) + "/" + res.file.name, await res.file.arrayBuffer());
          continue;
        }

        if (res.resp.renderedImage) {
          printLog(`SAVE ${res.file.name}`);

          writeBinaryFile((savePath as string) + "/" + res.file.name, forge.util.binary.base64.decode(res.resp.renderedImage));
        }
      }

      setEnd(true);
    })();
  }, []);

  useEffect(() => {
    const elem = logScreenRef.current;
    if (!elem) return;

    elem.scrollTop = elem.scrollHeight;
  }, [logs]);

  return (
    <PageTransition>
      <MainContainer>
        <LogScreen ref={logScreenRef}>
          {logs.map((e, idx) => (
            <LogItem key={idx}>{e}</LogItem>
          ))}
        </LogScreen>

        <ButtonGroup style={{ marginTop: "auto", width: "100%" }}>
          <OkButton disabled={!end} onClick={() => navigate("/", { replace: true })}>
            확인
          </OkButton>
        </ButtonGroup>
      </MainContainer>
    </PageTransition>
  );
}
