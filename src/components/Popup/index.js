import "./style.css";
import backarrow from "../../assets/icons/backarrow.svg";
import useWindowsSize from "../../hooks/useWindowSize";

function Popup({ info, removeHover }) {
  const { ismobileSmallScreen } = useWindowsSize();
  return (
    <div className="popup" style={info.position}>
      {ismobileSmallScreen && (
        <div className="popup_backarrow" onClick={removeHover}>
          <img src={backarrow} alt="backarrow" width={25} />
        </div>
      )}
      <div className="inside-popup">
        <h2>{info.State}</h2>
        <div className="popup_list">
          <p>
            White Population{" "}
            <span className="popup_list_numbers">
              {info.whitePopulation?.toLocaleString("en-US")}
            </span>
          </p>
          <p>
            Free black Population{" "}
            <span className="popup_list_numbers">
              {info.freePersonOfColor?.toLocaleString("en-US")}
            </span>
          </p>
          <p>
            Enslaved black Population{" "}
            <span className="popup_list_numbers">
              {info.enslavedPerson?.toLocaleString("en-US")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
