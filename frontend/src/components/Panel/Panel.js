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
  };

  render() {
    const { data } = this.state;

    return (
      <div className="panel__container">
        <div className="container-fluid">
          {!data ? (
            <Form handleSubmit={this.handleSubmit} />
          ) : (
            <Results data={data} clearData={this.clearData} />
          )}
        </div>
      </div>
    )
  }
}

export default Panel;