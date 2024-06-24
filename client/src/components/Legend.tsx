import running from "../css/running.gif";
import cycling from "../css/cycling.gif";
import soccer from "../css/soccer.gif";
import defaultSport from "../css/default.gif";
import "../css/legend.css";
export const Legend: React.FC<{}> = () => {
  return (
    <div className="legend-overlay">
      <ul>
        <li>
          <img src={running} width={30} />
          <span>Running</span>
        </li>
        <li>
          {" "}
          <img src={cycling} width={30} />
          <span>Cycling</span>
        </li>
        <li>
          {" "}
          <img src={soccer} width={30} />
          <span>Soccer</span>
        </li>
        <li>
          {" "}
          <img src={defaultSport} width={30} />
          <span>Other</span>
        </li>
      </ul>
    </div>
  );
};
