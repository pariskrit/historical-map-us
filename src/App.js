import { useReducer } from "react";
import {
  MapContainer,
  Legend,
  ChronoTimeline,
  TimelineDataContainer,
} from "./components";
import { reducer, SET_MAP_DATA, SET_SELECTED_YEAR } from "./reducer";
import { INITIAL_REDUCER_STATE, mapComponents } from "./constants";
import "./App.css";
import { useEffect } from "react";
import useWindowsSize from "./hooks/useWindowSize";
import { mapData } from "./assets/json/data";

function App() {
  const [{ selectedYear, currentData }, dispatch] = useReducer(
    reducer,
    INITIAL_REDUCER_STATE
  );
  const { isMobileScreen } = useWindowsSize();
  const SelectedMapComponent = mapComponents[selectedYear];
  const mapDetails = currentData?.mapdata;

  const getMapData = async () => {
    try {
      const res = await fetch(
        "https://tmn.live.americanancestors.org/api/population-stats",
        {
          method: "GET",
        }
      );
      const data = await res.json();

      dispatch({ type: SET_MAP_DATA, payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMapData();
  }, []);
  return (
    <div className="app">
      <ChronoTimeline dispatch={dispatch} />

      <div style={{ position: "relative", overflow: "hidden" }}>
        <MapContainer
          MapSvg={SelectedMapComponent}
          mapDetails={mapDetails}
          year={selectedYear}
        />
        <TimelineDataContainer data={currentData} year={selectedYear} />
      </div>
    </div>
  );
}

export default App;
