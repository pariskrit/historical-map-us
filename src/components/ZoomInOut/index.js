import React from "react";
import zoomin from "../../assets/icons/zoomin.svg";
import zoomout from "../../assets/icons/zoomout.svg";
import "./style.css";

function ZoomInOut({ onZoomIn, onZoomOut }) {
  return (
    <div className="tools">
      <button onClick={() => onZoomIn()} className="tools_zoomin">
        <img src={zoomin} alt="zoomin" width={20} />
      </button>
      <button onClick={() => onZoomOut()} className="tools_zoomout">
        <img src={zoomout} alt="zoomout" width={20} />
      </button>
    </div>
  );
}

export default ZoomInOut;
