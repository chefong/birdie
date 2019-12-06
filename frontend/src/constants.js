// Mapbox style URL
export const mapboxStyle = 'mapbox://styles/eong001/ck3ca2yvh1far1coadjxnz7a7';

// Stuff for backend
export const BASE_URL = 'http://127.0.0.1:5000';
export const NUM_SEARCH_RESULTS = 250;

// Map settings
export const MAP_OFFSET = 0.165;
export const MAP_ZOOM = 10;
export const ADJUSTED_MAP_ZOOM = 4;
export const initialMapData = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  }
};

// Pin styling
export const PIN_SIZE_ORIGINAL = 30;
export const PIN_SIZE_SCALED = 45;
export const PIN_COLOR_ORIGINAL = "#d00";
export const PIN_COLOR_NEW = "#000";

// Default coordinates
export const SAN_FRANCISCO_COORDS = [37.7577, -122.4376];

// Alert messages
export const NO_RESULT_MESSAGE = "Sorry, there were no results for that query.";