import { useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import running from "../css/images/running.gif";
import cycling from "../css/images/cycling.gif";
import soccer from "../css/images/soccer.gif";
import hiking from "../css/images/hiking.png";
import defaultSport from "../css/images/default.gif";
import "../css/legend.css";

export const Legend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const legendRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleLegend = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="legend-container">
      {!isOpen && (
        <Button
          ref={buttonRef}
          onClick={toggleLegend}
          sx={{
            background: "white",
            border: "2px solid black",
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 1000,
          }}
          color="success"
        >
          Legend
        </Button>
      )}
      {isOpen && (
        <div ref={legendRef} className="legend-overlay">
          <IconButton
            onClick={toggleLegend}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
          <ul>
            <li>
              <img src={running} width={30} alt="running" />
              <span>Running</span>
            </li>
            <li>
              <img src={cycling} width={30} alt="cycling" />
              <span>Cycling</span>
            </li>
            <li>
              <img src={soccer} width={30} alt="soccer" />
              <span>Soccer</span>
            </li>
            <li>
              <img src={hiking} width={30} alt="hiking" />
              <span>Hiking</span>
            </li>
            <li>
              <img src={defaultSport} width={30} alt="default sport" />
              <span>Other</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
