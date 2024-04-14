import React from "react";
import { ReactNode } from "react";
interface CenteredContentProps {
  children: ReactNode;
}

const CenteredContent: React.FC<CenteredContentProps> = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  );
};

export default CenteredContent;
