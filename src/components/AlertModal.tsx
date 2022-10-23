import styled from "@emotion/styled";
import closeIcon from "../assets/close.svg";
import { IconButton } from "./IconButton";

import { ReactNode, useCallback } from "react";
import { AlertModalState } from "../interfaces/AlertModalState";

const ModalBG = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.7);

  display: flex;
  align-items: start;
  justify-content: center;
`;

const ModalInner = styled.div`
  background: white;
  color: black;
  width: calc(100% - 16px);
  max-width: 620px;
  padding: 16px;
  box-sizing: border-box;

  margin: 32px;
  margin-top: 30vh;

  border-radius: 8px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled.div`
  margin-top: 16px;
`;

export function AlertModal({ state, setModalState }: { state: AlertModalState; setModalState: (state: AlertModalState) => void }) {
  const close = useCallback(() => {
    setModalState({ show: false, alertMsg: "" });
  }, []);
  return state.show ? (
    <ModalBG onClick={close}>
      <ModalInner onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <span>알림</span>

          <IconButton src={closeIcon} onClick={close}></IconButton>
        </ModalHeader>

        <ModalBody>
          <span>{state.alertMsg}</span>
        </ModalBody>
      </ModalInner>
    </ModalBG>
  ) : null;
}
