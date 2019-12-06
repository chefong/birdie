import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import Panel from './components/Panel/Panel';
import { geolocated } from "react-geolocated";
import { Spin, Icon } from 'antd';
import birdie from './assets/birdie.svg';

class App extends Component {
  state = {
    userViewport: null,
    maxDistance: null,
    mapData: [],
    hoveredTweetCoordinates: [],
    draggableMarkerCoordinates: []
  }

  componentDidMount = () => {
    const { coords } = this.props;
    if (coords) {
      this.setState({ draggableMarkerCoordinates: [coords.latitude, coords.longitude] })
    }
  }

  setData = data => {
    const mapData = data.map(({ _source: { coordinates }, _score }) => ({ coordinates, score: _score }));
    this.setState({ mapData });
  }

  setMaxDistance = maxDistance => this.setState({ maxDistance });

  clearMapData = () => this.setState({ mapData: null });

  setHoveredTweetCoordinates = coordinates => this.setState({ hoveredTweetCoordinates: coordinates });

  setDraggableMarkerCoordinates = coordinates => this.setState({ draggableMarkerCoordinates: coordinates });

  render() {
    const { hoveredTweetCoordinates, draggableMarkerCoordinates, mapData, maxDistance } = this.state;
    const { coords, isGeolocationEnabled } = this.props;

    return !isGeolocationEnabled ? (
      <div className="App__geoUnavailable">
        <div className="App__birdie--container">
          <img className="App__birdie" src={birdie} alt=""/>
        </div>
        <div className="App__birdie--message">
          Sorry, <strong>birdie</strong> had trouble getting your location...
        </div>
      </div>
    ) : coords && coords.latitude && coords.longitude ? (
      <div className="App">
        <Map
          initialLatitude={coords.latitude}
          initialLongitude={coords.longitude}
          mapData={mapData}
          hoveredTweetCoordinates={hoveredTweetCoordinates}
          setDraggableMarkerCoordinates={this.setDraggableMarkerCoordinates}
          maxDistance={maxDistance}
        />
        <Panel
          draggableMarkerCoordinates={draggableMarkerCoordinates}
          setData={this.setData}
          clearMapData={this.clearMapData}
          setHoveredTweetCoordinates={this.setHoveredTweetCoordinates}
          setMaxDistance={this.setMaxDistance}
        />
      </div>
    ) : (
      <div className="App__loading--container">
        <div className="App__birdie--container">
          <img className="App__birdie" src={birdie} alt=""/>
        </div>
        <Spin
          spin
          className="App__loading"
          indicator={<Icon type="loading" style={{ fontSize: 48 }} />}
        />
        <div className="App__birdie--message">
          <strong>birdie</strong> is trying to fetch your current location...
        </div>
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  }
})(App);