import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const mapboxStyle = 'mapbox://styles/eong001/ck3ca2yvh1far1coadjxnz7a7';
export const BASE_URL = 'http://127.0.0.1:5000';
export const MAP_OFFSET = 0.165;
export const MAP_ZOOM = 10;
export const SAN_FRANCISCO_COORDS = [37.7577, -122.4376];
export const initialMapData = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  }
};