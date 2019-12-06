import React, { Component } from 'react';
import './Panel.css';
import Form from './Form/Form';
import Results from './Results/Results';

class Panel extends Component {
  state = {
    data: null
  }

  handleSubmit = (data, maxDistance) => {
    this.setState({ data });
    this.props.setData(data);
    this.props.setMaxDistance(maxDistance);
  }

  clearMapData = () => {
    this.setState({ data: null });
    this.props.clearMapData();
  }

  handleTweetHover = coordinates => {
    this.props.setHoveredTweetCoordinates(coordinates);
  }

  render() {
    const { data } = this.state;
    const { draggableMarkerCoordinates } = this.props;

    return (
      <div className="panel__container">
        <div className="container-fluid">
          {!data ? (
            <Form
              handleSubmit={this.handleSubmit}
              draggableMarkerCoordinates={draggableMarkerCoordinates}
            />
          ) : (
            <Results data={data} clearMapData={this.clearMapData} handleTweetHover={this.handleTweetHover} />
          )}
        </div>
      </div>
    )
  }
}

export default Panel;