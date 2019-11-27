import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import Panel from './components/Panel/Panel';
import { geolocated } from "react-geolocated";
import { sampleData } from './sampleData';
import { Spin, Icon } from 'antd';
import birdie from './assets/birdie.svg';
import { tweets } from './tweet';

class App extends Component {
  state = {
    data: null
  }

  setData = data => {
    this.setState({ data: sampleData });
  }

  clearMapData = () => {
    this.setState({ data: null });
  }

  render() {
    const { data } = this.state;

    return !this.props.isGeolocationEnabled ? (
      <div className="App__geoUnavailable">
        <div className="App__birdie--container">
          <img className="App__birdie" src={birdie} alt=""/>
        </div>
        <div className="App__birdie--message">
          Sorry, <strong>birdie</strong> had trouble getting your location...
        </div>
      </div>
    ) : this.props.coords ? (
      <div className="App">
        <Map data={data} userCoordinates={[this.props.coords.latitude, this.props.coords.longitude]} />
        <Panel setData={this.setData} clearMapData={this.clearMapData} />
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
  },
})(App);