import { useState } from "react";
import { useEffect } from "react";
import "./style.css";

function Legend() {
  return (
    <div className="legend">
      <div className="common_item item1">
        <div className="legend_color " style={{ background: "#cdc3b5" }} />
        <p className="legend_name">Non U.S. Territory</p>
      </div>
      <div className="common_item item2">
        <div className="legend_color" style={{ background: "#201611" }} />

        <p className="legend_name">U.S. State</p>
      </div>
      <div className="common_item item3">
        <div className="legend_color" style={{ background: "#6d5d53" }} />

        <p className="legend_name">Slavery Abolished</p>
      </div>
      <div className="common_item item2">
        <div className="legend_color" style={{ background: "#ffad41" }} />

        <p className="legend_name">U.S. Territory</p>
      </div>
      <div className="common_item item3">
        <div className="legend_color" style={{ background: "#ffd88b" }} />

        <p className="legend_name">Slavery Abolished</p>
      </div>
    </div>
  );
}

export default Legend;
