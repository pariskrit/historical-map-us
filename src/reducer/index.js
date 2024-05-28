import { mapData } from "../assets/json/data";

// Action Types
export const SET_SELECTED_YEAR = "SetSelectedYear";
export const SET_MAP_DATA = "SetMapData";

const calculateTotalFreePersonOfColor = (obj) =>
  obj.mapdata.reduce((init, acc) => init + acc.freePersonOfColor, 0);
const calculateTotalEnslavedPeople = (obj) =>
  obj.mapdata.reduce((init, acc) => init + acc.enslavedPerson, 0);

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_YEAR: {
      const details = state.mapData?.[action.payload] ?? {};

      return {
        ...state,
        selectedYear: action.payload,
        currentData: {
          ...details,
        },
      };
    }
    case SET_MAP_DATA: {
      let mapData = { ...action.payload };
      for (let key in mapData) {
        mapData = {
          ...mapData,
          [key]: {
            ...mapData[key],
            totalPersonOfColor: function () {
              return calculateTotalFreePersonOfColor(this).toLocaleString(
                "en-US"
              );
            },
            totalEnslavedPeople: function () {
              return calculateTotalEnslavedPeople(this).toLocaleString("en-US");
            },
          },
        };
      }
      return {
        ...state,
        selectedYear: "1790",
        currentData: {
          ...mapData["1790"],
        },
        mapData,
      };
    }

    default:
      return state;
  }
};
