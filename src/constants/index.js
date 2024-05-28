import { mapData } from "../assets/json/data";
import {
  USA1790,
  USA1800,
  USA1810,
  USA1820,
  USA1830,
  USA1840,
  USA1850,
  USA1860,
} from "../components";

export const mapComponents = {
  1790: USA1790,
  1800: USA1800,
  1810: USA1810,
  1820: USA1820,
  1830: USA1830,
  1840: USA1840,
  1850: USA1850,
  1860: USA1860,
};

export const TIMELINE_YEARS = [
  { title: "1790" },
  { title: "1800" },
  { title: "1810" },
  { title: "1820" },
  { title: "1830" },
  { title: "1840" },
  { title: "1850" },
  { title: "1860" },
];

export const INITIAL_REDUCER_STATE = {
  selectedYear: "1790",
  currentData: null,
  mapData: null,
};
