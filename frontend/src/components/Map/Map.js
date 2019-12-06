import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import {
  mapboxStyle,
  MAP_OFFSET,
  MAP_ZOOM,
  SAN_FRANCISCO_COORDS,
  PIN_SIZE_ORIGINAL,
  PIN_SIZE_SCALED,
  PIN_COLOR_ORIGINAL,
  PIN_COLOR_NEW
} from '../../constants';
import { setPinStyle } from '../../helpers';
import Pin from './Pin';
import DraggablePin from './DraggablePin';
import dot from './dot.svg';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_PUBLIC;
const [SAN_FRANCISCO_LAT, SAN_FRANCISCO_LONG] = SAN_FRANCISCO_COORDS;

class Map extends Component {
  state = { 
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: SAN_FRANCISCO_LAT,
      longitude: SAN_FRANCISCO_LONG - MAP_OFFSET,
      zoom: MAP_ZOOM
    },
    initialLatitude: null,
    initialLongitude: null,
    draggableMarkerLatitude: null,
    draggableMarkerLongitude: null
  };

  componentDidMount = () => {
    const { initialLatitude, initialLongitude } = this.props;

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        latitude: initialLatitude,
        longitude: initialLongitude - MAP_OFFSET
      },
      draggableMarkerLatitude: initialLatitude,
      draggableMarkerLongitude: initialLongitude,
      initialLongitude: initialLongitude - MAP_OFFSET,
      initialLatitude
    }));

    this.props.setDraggableMarkerCoordinates([initialLatitude, initialLongitude]);
  }

  handleViewportChange = viewport => this.setState({ viewport });

  handleMarkerDragEnd = event => {
    const { lngLat } = event;
    const [draggableMarkerLongitude, draggableMarkerLatitude] = lngLat;

    this.setState({
      draggableMarkerLatitude,
      draggableMarkerLongitude
    });

    this.props.setDraggableMarkerCoordinates([draggableMarkerLatitude, draggableMarkerLongitude]);
  };

  render() {
    const { draggableMarkerLatitude, draggableMarkerLongitude, } = this.state;
    const { initialLatitude, initialLongitude, coordinates, hoveredTweetCoordinates } = this.props;
    const [hoveredTweetLatitude, hoveredTweetLongitude] = hoveredTweetCoordinates;

    return (
      <div className="map__container">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewport) => this.handleViewportChange(viewport)}
          mapStyle={mapboxStyle}
        >
          {coordinates && coordinates.map(([latitude, longitude]) => {
            const coordinatesMatch = latitude === hoveredTweetLatitude && longitude === hoveredTweetLongitude;
            return (
              <Marker longitude={longitude} latitude={latitude}>
                <Pin
                  size={setPinStyle(coordinatesMatch, PIN_SIZE_ORIGINAL, PIN_SIZE_SCALED)}
                  fill={setPinStyle(coordinatesMatch, PIN_COLOR_ORIGINAL, PIN_COLOR_NEW)}
                />
              </Marker>
            )
          })}
          {initialLongitude && initialLatitude && (
            <Marker longitude={initialLongitude} latitude={initialLatitude}>
              <img className="map__userLocation" src={dot} alt=""/>
            </Marker>
          )}
          {draggableMarkerLongitude && draggableMarkerLatitude && (
            <Marker
              longitude={draggableMarkerLongitude}
              latitude={draggableMarkerLatitude}
              onDragEnd={this.handleMarkerDragEnd}
              draggable
            >
              <DraggablePin />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    )
  }
}

export default Map;