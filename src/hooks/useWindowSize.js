import { useEffect, useState } from "react";

function useWindowsSize() {
  const getWindowsSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  const [windowSize, setWindowSize] = useState(getWindowsSize());
  const isSmallerMobileScreen = windowSize.innerWidth <= 374;
  const isMobileScreen = windowSize.innerWidth <= 499;

  const isSurfaceDuo = windowSize.innerWidth <= 550;
  const ismobileSmallScreen = windowSize.innerWidth <= 767;
  const isIpadScreen = windowSize.innerWidth <= 991;

  // const isIpadAir =
  //   windowSize.innerWidth >= 800 && windowSize.innerWidth <= 911;
  // const isSurfacePro7 =
  //   windowSize.innerWidth >= 910 && windowSize.innerWidth <= 992;
  const isIpadProScreen = windowSize.innerWidth <= 1024;

  const isIpadAirLandscape = windowSize.innerWidth <= 1180;
  const isIpadProLandscapeScreen = windowSize.innerWidth <= 1366;
  const isDesktop = windowSize.innerWidth <= 1699;
  const isBiggerScreen = windowSize.innerWidth >= 1700;

  const windowWidth = windowSize.innerWidth;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowsSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return {
    isMobileScreen,
    isIpadScreen,
    isIpadProScreen,
    isIpadProLandscapeScreen,
    isIpadAirLandscape,
    windowWidth,
    isSurfaceDuo,
    isDesktop,
    isSmallerMobileScreen,
    isBiggerScreen,
    ismobileSmallScreen,
  };
}

export default useWindowsSize;
