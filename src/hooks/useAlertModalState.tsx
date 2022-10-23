import { useState } from "react";
import { AlertModalState } from "../interfaces/AlertModalState";

export function useAlertModalState(
  inital: AlertModalState = {
    alertMsg: "",
    show: false,
  }
) {
  return useState<AlertModalState>(inital);
}
