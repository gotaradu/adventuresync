import React from "react";

import Buttons from "./Buttons";

const NavigationBar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 20px",
        background: "linear-gradient(135deg, #607274, #BAB86C)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Buttons />
    </div>
  );
};

export default NavigationBar;
