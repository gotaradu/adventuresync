import running from "../css/images/running.gif";
import cycling from "../css/images/cycling.gif";
import soccer from "../css/images/soccer.gif";
import hiking from "../css/images/hiking.png";
import defaultSport from "../css/images/default.gif";
import "../css/legend.css";
export const Legend: React.FC = () => {
  return (
    <div className="legend-overlay">
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
  );
};
