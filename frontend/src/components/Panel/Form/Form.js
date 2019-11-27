import React, { Component } from 'react';
import './Form.css';
import logo from '../../../assets/logo.svg';
import { Input, DatePicker, Slider, Button, Spin, Icon, Select, Alert } from 'antd';
import { BASE_URL } from '../../../constants';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

class Form extends Component {
  state = {
    date: '',
    query: '',
    isLoading: false,
    distance: 100,
    hashTags: []
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDistanceChange = distance => this.setState({ distance });

  handleDateChange = (date, dateString) => this.setState({ date });

  handleSelectChange = hashTags => this.setState({ hashTags });

  handleClick = e => {
    e.preventDefault();
    
    this.setState({ isLoading: true });

    const { query, date, distance, hashTags } = this.state;
    const data = { query, date, distance, hashTags };

    // setTimeout(() => {
    //   this.props.handleSubmit(data);
    //   this.setState({ isLoading: false });
    // }, 1000);

    // Here I'm just getting tweets from my home page for now
    axios.get(`${BASE_URL}/getTweets`)
      .then(response => {
        const { data } = response;
        this.props.handleSubmit(data);
      })
      .catch(error => console.error(error));

    // axios.post(`${BASE_URL}/search`, { ...data })
    //   .then(response => {
    //     console.log("Got response after submitting form", response);
    //     const { data, status, message } = response;
    //     if (status !== 200) {
    //       throw new Error(message);
    //     } else {
    //       this.props.handleSubmit(data);
    //       this.setState({ isLoading: false });
    //     }
    //   })
    //   .catch(error => {
    //     console.log("Error after submitting form", error);
    //     this.setState({ isLoading: false });
    //   });
  }

  render() {
    const { query, distance, isLoading, message } = this.state;
    
    return (
      <div className="form__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <img className="form__logo" src={logo} alt=""/>
          </div>
          <Fade>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">Search Tweets</div>
                <Input
                  placeholder="Search for a tweet..."
                  name="query"
                  onChange={this.handleInputChange}
                  value={query}
                  className="form__query"
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">Date</div>
                <DatePicker
                  onChange={this.handleDateChange}
                  className="form__date"
                  format="MM/DD/YYYY"
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">Hash Tags</div>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Tags Mode"
                  onChange={this.handleSelectChange}
                  className="form__select"
                >
                </Select>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">Distance: {distance} miles</div>
                <Slider
                  onChange={this.handleDistanceChange}
                  tooltipPlacement="bottom"
                  defaultValue={distance}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="form__submit--wrapper">
                <Button
                  className="form__submit"
                  onClick={this.handleClick}
                  type="primary"
                >
                  Submit
                </Button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                {!isLoading && message && (
                  <Alert
                    message={message}
                    type="warning"
                    className="form__alert"
                  />
                )}
              </div>
              <div className="col-10">
                <div className="form__loading--wrapper">
                  {isLoading && (
                    <Spin
                      spin
                      className="form__loading"
                      indicator={<Icon type="loading" style={{ fontSize: 32 }} />}
                    />
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    )
  }
}

export default Form;