import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import {
  mapboxStyle,
  MAP_OFFSET,
  MAP_ZOOM,
  ADJUSTED_MAP_ZOOM,
  SAN_FRANCISCO_COORDS,
  PIN_SIZE_ORIGINAL,
  PIN_SIZE_SCALED,
  PIN_COLOR_ORIGINAL,
  PIN_COLOR_NEW
} from '../../constants';
import { setPinStyle } from '../../helpers';
import Pin from './Pin';
import DraggablePin from './DraggablePin';
import Dot from './Dot';

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
    draggableMarkerLongitude: null,
    popupInfo: null
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

  UNSAFE_componentWillReceiveProps = nextProps => {
    const { maxDistance: nextMaxDistance } = nextProps;
    const { maxDistance } = this.props;

    if (maxDistance !== nextMaxDistance) {
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          zoom: ADJUSTED_MAP_ZOOM
        }
      }));
    };
  }

  handleViewportChange = viewport => this.setState({ viewport });

  handlePopupClose = () => this.setState({ popupInfo: null });

  handleMarkerDragEnd = event => {
    const { lngLat } = event;
    const [draggableMarkerLongitude, draggableMarkerLatitude] = lngLat;

    this.setState({
      draggableMarkerLatitude,
      draggableMarkerLongitude
    });

    this.props.setDraggableMarkerCoordinates([draggableMarkerLatitude, draggableMarkerLongitude]);
  };

  handlePinClick = (e, coordinates, score) => {
    e.preventDefault();
    this.setState({
      popupInfo: {
        score,
        coordinates
      }
    });
  }

  render() {
    const { draggableMarkerLatitude, draggableMarkerLongitude, popupInfo } = this.state;
    const { initialLatitude, initialLongitude, mapData, hoveredTweetCoordinates } = this.props;
    const [hoveredTweetLatitude, hoveredTweetLongitude] = hoveredTweetCoordinates;

    return (
      <div className="map__container">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewport) => this.handleViewportChange(viewport)}
          mapStyle={mapboxStyle}
        >
          {mapData && mapData.map(({ coordinates, score }) => {
            const [latitude, longitude] = coordinates;
            const coordinatesMatch = latitude === hoveredTweetLatitude && longitude === hoveredTweetLongitude;
            return (
              <Marker longitude={longitude} latitude={latitude}>
                <Pin
                  size={setPinStyle(coordinatesMatch, PIN_SIZE_ORIGINAL, PIN_SIZE_SCALED)}
                  fill={setPinStyle(coordinatesMatch, PIN_COLOR_ORIGINAL, PIN_COLOR_NEW)}
                  onClick={e => this.handlePinClick(e, coordinates, score)}
                />
              </Marker>
            )
          })}
          {popupInfo && (
            <Popup
              latitude={popupInfo.coordinates[0]}
              longitude={popupInfo.coordinates[1]}
              onClose={this.handlePopupClose}
              closeOnClick={false}
              anchor="top"
            >
              <div className="map__popupScore">{popupInfo.score}</div>
            </Popup>
          )}
          {initialLongitude && initialLatitude && (
            <Marker longitude={initialLongitude} latitude={initialLatitude}>
              <Dot />
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