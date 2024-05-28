import React from "react";
import "./style.css";
import parse from "html-react-parser";

function TimelineDataContainer({ data, year }) {
  return (
    <div className="timelinedata_container">
      <h2 className="timelinecontainer_heading1">USA</h2>
      <h2 className="timelinecontainer_heading2">{year}</h2>
      <div className="timelinecontainer_counts">
        <p class="timelinedata_goldenbox">
          <span class="timelinecontainer_numbers">
            {data && data?.totalPersonOfColor ? data?.totalPersonOfColor() : ""}
          </span>{" "}
          free people of color
        </p>
        <p class="timelinedata_goldenbox">
          <span class="timelinecontainer_numbers">
            {data && data?.totalEnslavedPeople
              ? data?.totalEnslavedPeople()
              : ""}
          </span>{" "}
          enslaved people
        </p>
      </div>
      <div className="timelinecontainer_description">
        {/* <h2>Subtitle lorem ipsum</h2> */}
        <h2>{data?.summary?.title}</h2>
        {data?.summary?.content && parse(data?.summary?.content) ? (
          parse(data?.summary?.content)
        ) : (
          <p>
            {data?.summary?.content && parse(data?.summary?.content)
              ? parse(data?.summary?.content)
              : data?.summary?.content}
            {/* {year === "1800"
              ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
         `
              : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.`} */}
          </p>
        )}
      </div>
    </div>
  );
}

export default TimelineDataContainer;
