import React, { Component } from 'react';
import './Panel.css';
import Form from './Form/Form';
import Results from './Results/Results';

class Panel extends Component {
  state = {
    data: null
  }

  handleSubmit = data => {
    this.setState({ data });
    this.props.setData(data);
  }

  clearData = () => {
    this.setState({ data: null });
    this.props.clearMapData();
  }

  handleTweetHover = coordinates => {
    this.props.setHoveredTweetCoordinates(coordinates);
  }

  render() {
    const { data } = this.state;
    const { latitude, longitude } = this.props;

    return (
      <div className="panel__container">
        <div className="container-fluid">
          {!data ? (
            <Form handleSubmit={this.handleSubmit} latitude={latitude} longitude={longitude} />
          ) : (
            <Results data={data} clearData={this.clearData} handleTweetHover={this.handleTweetHover} />
          )}
        </div>
      </div>
    )
  }
}

export default Panel;