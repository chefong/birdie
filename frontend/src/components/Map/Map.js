import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import { mapboxStyle, MAP_OFFSET, MAP_ZOOM, SAN_FRANCISCO_COORDS } from '../../constants';
import Pin from './Pin';
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
    }
  };

  componentDidMount = () => {
    const { initialLatitude, initialLongitude } = this.props;
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        latitude: initialLatitude,
        longitude: initialLongitude - MAP_OFFSET
      }
    }));
  }

  handleViewportChange = viewport => {
    this.setState({ viewport });
    const { latitude, longitude } = viewport;
    this.props.setLatLong(latitude, longitude);
  }

  render() {
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
                <Pin size={coordinatesMatch ? 45 : 30} fill={coordinatesMatch ? "#000" : "#d00"} />
              </Marker>
            )
          })}
          <Marker longitude={initialLongitude} latitude={initialLatitude}>
            <img className="map__userLocation" src={dot} alt=""/>
          </Marker>
        </ReactMapGL>
      </div>
    )
  }
}

export default Map;