import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Chrono } from "react-chrono";
import imag from "../../assets/icons/zoomin.svg";
import { TIMELINE_YEARS } from "../../constants";
import useWindowsSize from "../../hooks/useWindowSize";
import { SET_SELECTED_YEAR } from "../../reducer";
import "./style.css";
import rowLeft from "../../assets/icons/left.svg";
import rowRight from "../../assets/icons/right.svg";

const items = ["1790", "1800", "1810", "1820", "1830", "1840", "1850", "1860"];
function ChronoTimeline({ dispatch }) {
  const { isMobileScreen, isIpadScreen, isIpadProScreen, windowWidth } =
    useWindowsSize();
  const isBigMobileScreen = window.innerWidth > 400 && window.innerWidth < 480;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTimelineChange = (data) => {
    dispatch({ type: SET_SELECTED_YEAR, payload: data.title });
    const index = TIMELINE_YEARS.findIndex((d) => d.title === data.title);
    setActiveIndex(index);
  };

  const selectEvent = (prev) => {
    const prevIndex = activeIndex + (prev ? -1 : 1);
    const prevTitle = items[prevIndex];
    if (prevTitle) {
      const el = document.querySelectorAll(`[aria-label="${prevTitle}"]`);

      if (el.length > 0) {
        el[0].click();
        el[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      setActiveIndex(prevIndex);
    }
  };

  const handleTimelineDateClick = (e, arr) => {
    const el = document.querySelector(`[aria-label="${e.target.innerText}"]`);
    if (el) {
      el.click();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
    const index = arr.findIndex((item) => item === e.target);
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      let elements = document.getElementsByClassName("timeline-item-title");
      const arr = Array.from(elements);
      arr.forEach((element) => {
        element.addEventListener("click", (e) =>
          handleTimelineDateClick(e, arr)
        );
      });
    }, 500);

    return () => {
      clearTimeout(timer1);
      document.removeEventListener("click", handleTimelineDateClick);
    };
  }, []);
  return (
    <div className="chrono-timeline">
      {isMobileScreen && (
        <>
          <span
            className="arrow-style"
            onClick={() => {
              selectEvent(true);
            }}
          >
            <img
              src={rowLeft}
              alt="rowleft"
              width={42}
              className="arrow-color"
            />
          </span>
          <span className="fading-timeline-left"></span>
          <span className="fading-timeline"></span>
        </>
      )}
      <Chrono
        activeItemIndex={activeIndex}
        className="my-timeline"
        mode="HORIZONTAL"
        items={TIMELINE_YEARS}
        hideControls={true}
        cardLess={true}
        lineWidth={8}
        itemWidth={isBigMobileScreen ? 100 : isMobileScreen ? 115 : 0}
        theme={{
          primary: "white",
          secondary: "black",
          titleColorActive: "white",
        }}
        onItemSelected={handleTimelineChange}
      >
        <div className="chrono-icons">
          <div className="downward_pointer" />
          <div className="downward_pointer" />
          <div className="downward_pointer" />
          <div className="downward_pointer" />
          <div className="downward_pointer" />
          <div className="downward_pointer" />
          <div className="downward_pointer" />
          <div className="downward_pointer" />
        </div>
      </Chrono>
      {isMobileScreen && (
        <>
          <span className="fading-timeline"></span>

          <span className="fading-timeline-right"></span>
          <span
            className="arrow-style"
            onClick={() => {
              selectEvent(false);
            }}
          >
            <img
              src={rowRight}
              alt="rowRight"
              width={42}
              className="arrow-color"
            />
          </span>
        </>
      )}
    </div>
  );
}

export default ChronoTimeline;
