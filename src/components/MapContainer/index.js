import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useWindowsSize from "../../hooks/useWindowSize";
import { Legend, Popup, ZoomInOut } from "../index";
import "./style.css";

function MapContainer({ MapSvg, mapDetails, year }) {
  const {
    isMobileScreen,
    isIpadScreen,
    isIpadProScreen,
    isIpadProLandscapeScreen,
    isIpadAirLandscape,
    isDesktop,
    isSmallerMobileScreen,
    isBiggerScreen,
    isSurfaceDuo,
    ismobileSmallScreen,
  } = useWindowsSize();
  const [popup, setPopup] = useState({});
  const [timelineContainerHeight, setTimelineContainerHeight] = useState(0);

  const initialScale = isSmallerMobileScreen
    ? 0.6
    : isMobileScreen
    ? 0.8
    : isSurfaceDuo
    ? 1
    : ismobileSmallScreen
    ? 1.2
    : isIpadScreen
    ? 0.9
    : isIpadProScreen
    ? 0.9
    : isIpadAirLandscape
    ? 1.4
    : isDesktop
    ? 1.8
    : 2.7;
  const handleMapHover = (e, state) => {
    removeHover();

    const hoveringStateName = state?.split("_").join(" ");
    const hoveringStateDetails = mapDetails.find(
      (detail) => detail.State?.trim() === hoveringStateName?.trim()
    );

    if (hoveringStateDetails) {
      if (e.target.id) {
        // For states with multiple paths in the map
        const getMultipleStates = document.querySelectorAll(`#${e.target.id}`);

        for (let i = 0; i < getMultipleStates.length; i++)
          getMultipleStates[i].classList.add("hover");
      } else {
        // for states with single path in the map
        e.target.classList.add("hover");
      }

      const position = e.target.getBoundingClientRect();
      const position2 = e.target.getBBox();
      const numberOfScrolledPixels = window.scrollY;
      const isPopupOutsideScreen =
        window.innerWidth < position.left + position2.width - 180 + 363;
      const popupLeft = isPopupOutsideScreen
        ? window.innerWidth - (position.left + position2.width - 180 + 343)
        : 0;
      setPopup({
        position: ismobileSmallScreen
          ? { display: "block" }
          : {
              display: "block",
              top:
                position.top +
                position.height / 2 -
                70 +
                numberOfScrolledPixels,
              left: position.left + position2.width - 180 + popupLeft,
            },
        popupLeft,
        ...hoveringStateDetails,
        hidePointer: { right: isPopupOutsideScreen ? "40px" : "156px" },
      });
    }
  };

  const handleMouseHover = (e) => {
    const mapContainer = document.querySelector(".svg");
    const popupContainer = document.querySelector(".popup");
    const pointerContainer = document.querySelector(".popup_pointer");
    const isHoverInsideMap =
      mapContainer.contains(e.target) ||
      popupContainer?.contains(e.target) ||
      pointerContainer?.contains(e.target);
    if (!isHoverInsideMap || mapContainer === e.target) {
      removeHover();
    }
  };

  const removeHover = () => {
    const hoveringElement = document.querySelectorAll(".hover");
    setPopup({
      position: {
        display: "none",
        top: 0,
        left: 0,
      },
    });
    if (hoveringElement.length > 0) {
      for (let i = 0; i < hoveringElement.length; i++)
        hoveringElement[i].classList.remove("hover");
    }
  };

  const calculateTimelineContainerHeight = () => {
    const container = document.getElementsByClassName("timelinedata_container");
    setTimelineContainerHeight(container[0].getBoundingClientRect().height);
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      window.location.reload();
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("mouseover", handleMouseHover);
    window.addEventListener("resize", calculateTimelineContainerHeight);
    const time = setTimeout(calculateTimelineContainerHeight, 800);

    return () => {
      clearTimeout(time);

      window.removeEventListener("orientationchange", handleOrientationChange);

      window.removeEventListener("mouseover", handleMouseHover);
    };
  }, []);

  useEffect(() => {
    calculateTimelineContainerHeight();
  }, [year]);

  return (
    <div className="mapcontainer">
      <TransformWrapper
        initialScale={initialScale}
        minScale={initialScale}
        wheel={{ disabled: true }}
        initialPositionX={
          isSmallerMobileScreen
            ? 30
            : isMobileScreen
            ? 10
            : ismobileSmallScreen
            ? 10
            : isIpadScreen
            ? 160
            : isIpadProScreen
            ? 190
            : isIpadAirLandscape
            ? 80
            : isIpadProLandscapeScreen
            ? 0
            : isSmallerMobileScreen
            ? 10
            : isMobileScreen
            ? 20
            : 0
        }
        initialPositionY={
          isSmallerMobileScreen
            ? 80
            : isMobileScreen
            ? 50
            : ismobileSmallScreen
            ? 10
            : isIpadScreen
            ? 130
            : isIpadProScreen
            ? 220
            : isIpadAirLandscape
            ? 30
            : isIpadProLandscapeScreen
            ? 140
            : isMobileScreen
            ? 60
            : isDesktop
            ? 30
            : 0
        }
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <TransformComponent
              wrapperStyle={{
                width: "100%",

                height: isSmallerMobileScreen
                  ? "450px"
                  : isSurfaceDuo
                  ? "636px"
                  : ismobileSmallScreen
                  ? "536px"
                  : isIpadScreen
                  ? "100%"
                  : isIpadProScreen
                  ? "100%"
                  : isIpadAirLandscape
                  ? "100%"
                  : isIpadProLandscapeScreen
                  ? "100%"
                  : "100%",
                // marginLeft: "auto",
                paddingLeft: ismobileSmallScreen ? "unset" : "25%",
                // marginTop: isMobileScreen ? "20px" : 0,
              }}
              contentStyle={{
                width: isSmallerMobileScreen
                  ? "140%"
                  : isMobileScreen
                  ? "122%"
                  : ismobileSmallScreen
                  ? "97%"
                  : isIpadScreen
                  ? "92%"
                  : isIpadProScreen
                  ? "90%"
                  : isIpadAirLandscape
                  ? "81%"
                  : isIpadProLandscapeScreen
                  ? "83.5%"
                  : isDesktop
                  ? "75%"
                  : "96%",
                height: isSmallerMobileScreen
                  ? "100%"
                  : isMobileScreen
                  ? "100%"
                  : isSurfaceDuo
                  ? "70%"
                  : ismobileSmallScreen
                  ? "83%"
                  : isIpadScreen
                  ? "70%"
                  : isIpadProScreen
                  ? "40%"
                  : isIpadAirLandscape
                  ? "65%"
                  : isIpadProLandscapeScreen
                  ? "40%"
                  : isDesktop
                  ? "50%"
                  : "100%",
                marginLeft: isMobileScreen ? "20px" : "auto",
                marginTop: isSmallerMobileScreen
                  ? "-60px"
                  : isMobileScreen
                  ? "-25px"
                  : isIpadScreen || isMobileScreen || isIpadProScreen
                  ? 0
                  : isIpadAirLandscape
                  ? "60px"
                  : "-30px",
                mixBlendMode: "multiply",
              }}
            >
              <MapSvg onHover={handleMapHover} />
            </TransformComponent>
            <div
              className="legend_zoominout_wrapper"
              style={{ height: timelineContainerHeight }}
            >
              <Legend />
              <ZoomInOut onZoomIn={zoomIn} onZoomOut={zoomOut} />
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
      <div
        className="popup_pointer"
        style={{
          top: popup.position?.top - 15,
          left:
            popup.popupLeft < -113.7
              ? popup.position?.left + 180 + 113
              : popup.position?.left + 180 - popup.popupLeft,
          display: popup.position?.display,
        }}
      />

      <Popup
        info={popup}
        removeHover={removeHover}
        hidePointer={popup.hidePointer}
      />
    </div>
  );
}

export default MapContainer;
