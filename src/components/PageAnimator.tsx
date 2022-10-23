import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
  hidden: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const MotionDiv = styled(motion.div)`
  height: 100%;
`;

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <MotionDiv variants={variants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.3 }}>
      {children}
    </MotionDiv>
  );
}
