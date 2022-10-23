import { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Portal({ containerId, children }: { containerId: string; children: ReactNode }) {
  const container = document.getElementById(containerId)!;
  return createPortal(children, container);
}
