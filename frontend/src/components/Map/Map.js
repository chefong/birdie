import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, { Layer, Source, Marker } from 'react-map-gl';
import { heatMapLayer } from '../../heatMapLayer';
import { mapboxStyle, MAP_OFFSET, MAP_ZOOM, SAN_FRANCISCO_COORDS } from '../../constants';
import Pin from './Pin';

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
    userLatitude: SAN_FRANCISCO_LAT,
    userLongitude: SAN_FRANCISCO_LONG - MAP_OFFSET
  };

  componentDidMount = () => {
    const [userLatitude, userLongitude] = this.props.userCoordinates;
    this.setState(prevState => ({
      userLatitude,
      userLongitude,
      viewport: {
        ...prevState.viewport,
        latitude: userLatitude,
        longitude: userLongitude - MAP_OFFSET
      }
    }));
  }

  render() {
    const { data } = this.props;
    const { userLatitude, userLongitude } = this.state;

    return (
      <div className="map__container">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapStyle={mapboxStyle}
        >
          {data && (
            <Source type="geojson" data={data}>
              <Layer {...heatMapLayer} />
            </Source>
          )}
          <Marker longitude={userLongitude} latitude={userLatitude}>
            <Pin size={30}/>
          </Marker>
        </ReactMapGL>
      </div>
    )
  }
}

export default Map;