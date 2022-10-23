import { open } from "@tauri-apps/api/dialog";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { StylesConfig } from "react-select";
import { AlertModal } from "../components/AlertModal";
import { ButtonGroup } from "../components/ButtonGroup";
import { NoButton, OkButton } from "../components/Buttons";
import { Container } from "../components/Container";
import { PageTransition } from "../components/PageAnimator";
import { SelectLanguage } from "../components/SelectLanguage";
import { languages } from "../constants";
import { useAlertModalState } from "../hooks/useAlertModalState";

export function SettingScreen() {
  const [modalState, setModalState] = useAlertModalState();

  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const navigate = useNavigate();
  const canTranslate = source.length !== 0 && target.length !== 0 && source !== target;

  const onTrBtnClick = useCallback(() => {
    open({
      directory: true,
      title: "저장할 경로를 입력해주세요.",
    }).then((val) => {
      if (!val) return;
      const savePath = val as string;

      navigate("/processing", {
        state: {
          source,
          target,
          savePath,
        },
      });
    });
  }, [source, target]);

  const onCancelBtnClick = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <PageTransition>
        <Container style={{ display: "flex", flexDirection: "column" }}>
          <label>원본 언어</label>
          <SelectLanguage
            value={source}
            onChange={(val) => setSource(val.value)}
            languages={[
              {
                label: "자동감지",
                value: "auto",
              },
              ...languages,
            ]}
          />

          <div style={{ margin: "8px 0" }}></div>

          <label>목표 언어</label>
          <SelectLanguage value={target} onChange={(val) => setTarget(val.value)} languages={languages} />

          <ButtonGroup style={{ marginTop: "auto" }}>
            <NoButton onClick={onCancelBtnClick}>취소</NoButton>
            <OkButton onClick={onTrBtnClick} disabled={!canTranslate}>
              번역하기
            </OkButton>
          </ButtonGroup>
        </Container>
      </PageTransition>
    </>
  );
}
